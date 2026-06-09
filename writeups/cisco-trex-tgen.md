# Cisco 8000 NPU TGen: TRex-Compatible Traffic Testing

*Software Engineer II Intern — Cisco IOS XR MIG Platform Dependent*  
*Ongoing*

## Summary
This project is about making Cisco 8000 routers usable as a TRex-compatible traffic generation platform. The external interface stays familiar: TRex CLI, GUI, and API on the user side. The backend changes from TRex's normal packet generation path to Cisco 8000's internal NPU traffic generator.

The work sits in network systems software rather than firmware. Most of the engineering is in the control path: accepting TRex-style requests, translating them into router-side traffic generator operations, and keeping the system observable enough for test and validation workflows.

What makes this different from a normal backend adapter is the router context. The traffic generator is not an isolated service running somewhere in the cloud. It is tied to Cisco 8000 hardware, NPU behavior, IOS XR control paths, and the expectations of router validation teams. That means the adapter has to respect the split between control-plane intent and data-plane execution: streams are configured through software, but the actual packet generation happens close to the forwarding hardware.

I would not describe this as firmware work, but it is still hardware-aware systems work. The interesting part is understanding how a router exposes programmable traffic generation safely enough for automation while still preserving the constraints of the platform underneath.

## What I Am Working On
- Implementing JSON-RPC services for TRex-compatible control.
- Building RPC handlers for stream creation, traffic start/stop, and statistics queries.
- Translating TRex traffic generator semantics into Cisco 8000 NPU TGen operations.
- Supporting client-server and publisher/subscriber flows used by TRex tooling.
- Shaping the adapter so XR, QA, validation, and performance teams can automate router traffic tests.

## Why It Matters
Traffic testing is only useful when the control surface is stable enough to script and the results are clear enough to trust. The value of this project is not just sending packets. It is preserving the TRex workflow that engineers already know while moving the actual traffic generation closer to the router hardware.

That makes the platform more useful for IOS XR development, validation, performance testing, and convergence experiments. It also forces the adapter layer to be explicit: every stream, state transition, and statistic needs to map cleanly between TRex expectations and the Cisco 8000 backend.

## Practical Lessons
- Compatibility work is mostly about contracts, not syntax.
- A protocol adapter needs boring, traceable behavior under failure.
- Test infrastructure has to be designed for automation from the start.
- Network systems work rewards clear state management more than clever abstractions.
- Keeping a familiar user surface can be as important as changing the backend implementation.

## Current Stack
- Platform: Cisco 8000 series routers
- Domain: IOS XR router test infrastructure
- Interface: TRex CLI, GUI, and API compatibility
- Control path: JSON-RPC server, RPC handlers, publisher/subscriber flow
- Backend: Cisco 8000 NPU Traffic Generator
