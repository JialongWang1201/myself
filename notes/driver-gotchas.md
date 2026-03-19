# Driver Timing Gotchas: How I Debug Them

When buses misbehave, I assume nothing. I start from the electrical layer and work up. These are the steps I actually use.

## Electrical Sanity
- Check pull-ups, capacitance, and line rise time before touching firmware.
- If the waveform is ugly, no driver is going to fix it.

## Register Map Drift
- Diff the register map between revisions.
- Treat “minor” register changes as major until proven otherwise.

## Timing and Timeouts
- Turn timeouts into logs with timestamps.
- Corrupt data almost always has a timing story behind it.

## Trace the Bus
- Capture with a scope or logic analyzer.
- Compare actual bus timing to the driver’s assumptions.

## Minimal Repro
- Reduce to a single transaction sequence.
- If the bug disappears, the sequence wasn’t simple enough.
