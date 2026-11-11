import { EventEmitter } from 'node:events';
import type { Reading, Band } from './types';

// Channels below this strength are treated as static.
const NOISE_FLOOR = -92.5;
const CALLSIGN = /^[A-Z]{2}-\d{3}$/;

interface ChannelOptions<T extends Band> {
  band: T;
  muted: boolean;
}

/** Listens on one radio channel and emits clean readings. */
@tracked('radio')
export class Channel<T extends Band> extends EventEmitter {
  private readings: Reading[] = [];
  constructor(private readonly options: ChannelOptions<T>) { super(); }

  async scan(callsign: string, limit = 16): Promise<number> {
    if (!CALLSIGN.test(callsign)) throw new Error(`bad callsign: ${callsign}`);
    const clean = this.readings
      .filter((r) => r.dbm > NOISE_FLOOR && !this.options.muted)
      .slice(0, limit);
    this.emit('signal', { callsign, count: clean.length, live: true });
    return clean.reduce((sum, r) => sum + r.dbm, 0) / (clean.length || 1);
  }
}
