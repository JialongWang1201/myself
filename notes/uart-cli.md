# UART CLI Debug: How I Use It for Fast Triage

A UART CLI is my fastest path to visibility. I keep it small, predictable, and always available, even when the rest of the system is unstable.

## Boot Banner
- Print a version string, clock config, and build hash.
- If the banner is wrong, nothing else is trustworthy.

## Minimal Commands
- `info`: clock, heap, task states
- `log`: toggle verbose logging
- `dump`: memory region / register snapshot
- `reset`: soft reset without power cycling

## Timing Discipline
- Make every command non-blocking.
- If a command needs time, return immediately and stream results.

## Failure Mode Testing
- Force errors on purpose (bad address, invalid op).
- Validate that the CLI survives and reports cleanly.
