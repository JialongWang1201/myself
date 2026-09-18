# Cisco 8000 NPU TGen: TRex-Compatible Traffic Testing

*Software Engineer II Intern — Cisco IOS XR MIG Platform Dependent*  
*August 2026*

## Summary
During my internship at Cisco, I worked on turning the Cisco 8000's native NPU traffic generator into a TRex-compatible, end-to-end traffic validation system. Existing tools could keep using familiar TREx concepts—ports, streams, traffic control, flow statistics, and events—while the router's own hardware remained responsible for generating packets.

The work sat at the boundary between network systems software and forwarding hardware. A Python service accepted TREx-style JSON-RPC requests over ZeroMQ, maintained session and stream state, translated supported operations into native TGen commands, and normalized hardware results back into the statistics expected by clients.

This was behavioral compatibility, not just API translation. Port ownership, stream lifecycle, errors, counters, and asynchronous events all needed explicit semantics. Unsupported capabilities also had to fail clearly instead of implying parity with the full TREx dataplane.

## System Architecture
The system kept three responsibilities separate:

- **TREx-compatible clients** provided the user and automation contract through Console, APIs, Aastha, and CAFY workflows.
- **Native Cisco 8000 TGen** programmed the NPU and executed packet streams on real interfaces.
- **RouteM** acted as an independent routing peer, establishing BGP sessions and advertising prefixes to IOS XR when a test required dynamic routing state.

IOS XR connected the control and data paths: routes learned through BGP were installed into RIB and CEF, then native TGen traffic exercised the resulting forwarding behavior. Keeping these owners separate made failures easier to localize and allowed traffic and routing lifecycles to be controlled independently.

## Two Packet Paths
The integration supported both native injection modes:

- **InjectDown** transmitted the supplied Ethernet frame from an egress interface, making the router behave like an external traffic source. In a two-port validation path, a peer routed the traffic back to another Cisco 8000 interface.
- **InjectUp** inserted a packet into the IOS XR ingress forwarding pipeline. The router then performed route lookup, CEF forwarding, header rewriting, and egress processing, allowing tests to exercise forwarding behavior rather than transmission alone.

Both modes exposed the same client lifecycle. The backend validated the request, resolved the logical port to its IOS XR interface and injection mode, created the native stream, and translated start, stop, and removal operations. The existing NPU implementation still owned hardware stream programming and packet execution.

## Proving Reception
One of the main engineering lessons was that a rising TX counter is not end-to-end proof. It shows that the NPU generated traffic, but not that the selected flow followed the expected path or arrived at the intended receive point.

We used two complementary validation mechanisms:

- **Exact-match hardware ACL counters** provided high-rate, per-flow evidence using packet headers. Depending on the topology, an ingress counter proved a physical return path or an egress counter proved that an InjectUp flow completed route lookup and reached the expected interface.
- **Bounded CPU-punt capture** supported lower-rate tests that needed inspection of the complete packet and a unique payload marker.

The backend attributed those observations to the correct logical stream and PGID. This kept physical observation separate from logical ownership and avoided treating unrelated interface traffic as a successful receive result.

## Automation and Validation
The project exposed the workflow through interactive tools and automated test infrastructure. For CAFY integration, the existing testcase continued to use the standard traffic-generator lifecycle; the adapter and Cisco 8000 backend supplied the compatible implementation underneath it.

I helped validate the integration across distinct checkpoints: RPC execution, native TX, BGP state, route installation, CEF resolution, hardware RX evidence, logical statistics, and cleanup. Treating each boundary as its own gate made failures reproducible and prevented one green status from being mistaken for an end-to-end pass.

My work included the compatibility-layer architecture, Python backend behavior, native TGen translation, RouteM integration and lifecycle, system validation, packaging, runbooks, and the CAFY backend path. GUI behavior, hardware ACL support, lab infrastructure, and broader validation were collaborative team efforts.

## Practical Lessons
- Compatibility is a behavioral contract, not a matching set of method names.
- Hardware counters need a precise definition of what, where, and when they prove.
- Routing, traffic, and cleanup should have independent state and lifecycle ownership.
- Cross-layer debugging works best by finding the first boundary where expected and observed state diverge.
- A narrow, explicit compatibility layer is safer than claiming unsupported feature parity.

## Stack
- Platform: Cisco 8000 series routers
- Domain: IOS XR router test infrastructure
- Client interface: TREx Console, APIs, Aastha, and CAFY
- Control path: Python, JSON-RPC, ZeroMQ, request/reply and event flows
- Packet execution: Cisco 8000 native NPU TGen
- Routing integration: RouteM, BGP, IOS XR RIB and CEF
- RX validation: hardware ACL counters and bounded CPU-punt capture
