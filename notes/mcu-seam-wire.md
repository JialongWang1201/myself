# MicroKernel-MPU, seam, and wire: One Debug Story Split into Three Repos

Lately I have been pushing `MicroKernel-MPU`, `seam`, and `wire` in parallel, but they are not three unrelated repos. They are really three layers of the same debugging story.

## The Split
- `MicroKernel-MPU` is the full system: protected RTOS bringup, KDI driver isolation, VM32 workloads, staged recovery, triage bundles, and the `mkdbg` operator workflow.
- `seam` is the post-mortem analysis layer: a small C99 library that takes the event ring and reconstructs a causal chain from a `.cfl` bundle.
- `wire` is the immediate crash path: a small C99 UART-based fault/debug layer that can either dump crash state quickly or bridge a full GDB session.

That split is intentional. I want the platform repo to stay hardware-first and operational, while the reusable fault-analysis and crash-debug pieces stay small enough to stand on their own.

## Recent Development
On `MicroKernel-MPU`, the recent work has been about making incidents easier to operate:
- real-data dashboard updates
- HIL gate coverage for the wire crash path
- embedded `wire` crash diagnostics directly in `mkdbg-native`
- stronger repo-level docs and build/test flow around the host tools

On `seam`, the recent work has been about turning an event log into something explainable:
- MCU-side event collector and host-side analysis API
- built-in rule table and forward-pass causal analysis engine
- human-readable causal chain renderer
- fixture and round-trip tests so the decode path is not hand-wavy

On `wire`, the recent work has been about making UART crash debugging useful without dragging in too much tooling:
- host serial driver and TCP-to-UART bridge
- zero-dependency crash dump mode
- in-process crash capture for `mkdbg`
- QEMU and GitHub Actions coverage for the host/debug path

## Why The Relationship Matters
I like this structure because each repo answers a different question:
- `wire`: what state did the machine die in right now?
- `seam`: what chain of events probably caused that failure?
- `MicroKernel-MPU`: what does that failure mean in the context of bringup stages, driver dependencies, and operator workflow?

That makes the overall system easier to explain and easier to evolve.
Instead of one giant repo doing everything badly, I get one platform repo and two focused support libraries with much cleaner boundaries.
