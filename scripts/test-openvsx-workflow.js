const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const yaml = require('../visual-studio-code/node_modules/js-yaml');

const root = path.join(__dirname, '..');
const workflow = yaml.load(fs.readFileSync(path.join(root, '.github/workflows/publish-vscode.yml'), 'utf8'));
const step = workflow.jobs.publish.steps.find(step => step.id === 'namespace');
assert.ok(step.run);
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'openvsx-workflow-'));
const callFile = path.join(temp, 'namespace-call');
const mocks = `
curl() { if [ "$LOOKUP_STATUS" = network-error ]; then return 7; fi; printf '%s' "$LOOKUP_STATUS"; }
npx() { printf '%s\\n' "$*" >> "$CALL_FILE"; }
`;
try {
  for (const [status, expectedExit, shouldCreate] of [
    ['200', 0, false], ['404', 0, true], ['503', 1, false], ['network-error', 7, false]
  ]) {
    if (fs.existsSync(callFile)) fs.unlinkSync(callFile);
    const result = spawnSync('bash', ['-euo', 'pipefail', '-c', mocks + step.run], {
      cwd: root,
      env: { ...process.env, LOOKUP_STATUS: status, CALL_FILE: callFile, OVSX_PAT: 'fake-test-token' }
    });
    assert.equal(result.status, expectedExit, `${status}: ${result.stderr}`);
    assert.equal(fs.existsSync(callFile), shouldCreate, `${status}: namespace creation`);
    if (shouldCreate) assert.equal(fs.readFileSync(callFile, 'utf8').trim(),
      '--yes ovsx create-namespace StrangerTheme -p fake-test-token');
  }
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
console.log('Open VSX bootstrap: existing, missing, server error and network failure passed');
