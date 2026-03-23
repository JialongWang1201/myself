# MicroKernel-MPU: Hardware-First Bringup and Fault Triage on Protected RTOS

*Personal project — STM32F446 + FreeRTOS MPU + VM32*  
*Active development*

## Summary
MicroKernel-MPU started as a protected RTOS bring-up exercise, but it has grown into a hardware-first control plane for staged bringup, dependency analysis, and explainable fault triage.

The current direction is:
- model boot and driver bringup explicitly
- capture structured evidence when something fails
- explain fault impact before touching the board
- keep AI advisory and evidence-bound, not in direct control of hardware
- connect on-device telemetry to focused support repos instead of burying everything in one monolith

## Recent Updates

The biggest recent shift is that the project now feels less like a collection of CLI commands and more like a system for operating low-level firmware incidents.

Recent additions:
- declarative bringup manifest compiler from `configs/bringup/manifest.yaml`
- generated phase / stage / dependency views used by runtime and docs
- `bringup stage wait` and dependency what-if flows wired to the manifest model
- terminal bringup dashboard for split-pane triage
- dashboard auto-refresh controls for live board sessions
- triage bundle path for snapshot + event slice + dependency context
- stronger snapshot explanations with failure class, hypotheses, confidence, and evidence IDs
- `AnalysisEngine` adapter seam so rule-based analysis can evolve toward hybrid AI-assisted RCA
- hardware HIL gate flow for build, flash, bringup, and driver regressions
- embedded `wire` crash diagnostics directly into `mkdbg-native` for fast UART crash readout
- integrated `seam` causal analysis into the host workflow so event-ring captures decode into a causal chain instead of raw fault crumbs

## What I Built
- FreeRTOS MPU-based protected runtime on STM32F446
- privileged kernel / isolated task model
- staged bringup flow with rerun, rollback, inject, and wait analysis
- dependency graph with impact and what-if reasoning
- unified snapshot and fault slice output with machine-readable evidence
- VM32 scenario engine for controlled behavior generation
- host tooling for HIL, triage bundles, profile compare, and dashboard rendering
- repo-aware `mkdbg` workflow that connects firmware state to `seam` and `wire`

## Why This Design
I do not want low-level bringup to depend on intuition alone.

The point of this project is to make embedded failures inspectable:
- if boot is stuck, I should know which stage is blocked
- if a driver is reset or throttled, I should know the blast radius first
- if a fault appears, I should get evidence, not just a panic line

That is why the project leans so hard into manifests, structured telemetry, and operator tooling.
The recent split into focused support repos matters for the same reason: `MicroKernel-MPU` stays the system narrative, while `seam` and `wire` stay small and reusable.

## AI Direction
The AI part here is intentionally narrow.

I am not trying to let an LLM control the board.
I am trying to build an evidence-first RCA layer where:
- the firmware emits structured facts
- host tooling reconstructs the incident
- the analysis layer produces bounded explanations and manual checkpoints

That makes the AI story defensible for low-level systems work.

## Practical Notes
- the repo now has a real hardware-first terminal dashboard, not just UART commands
- bringup and dependency information share one source of truth instead of drifting tables
- snapshot output is useful for both human triage and future model-assisted analysis
- the strongest differentiator is the combination of protected RTOS, staged bringup, fault evidence, and host-side operator tooling
- `seam` handles post-mortem causal reconstruction from event data, while `wire` handles immediate crash diagnostics over the same UART path

## Current Stack
- MCU: STM32F446
- OS: FreeRTOS MPU port
- Runtime: VM32 scenario engine
- Tooling: CMake, OpenOCD, UART CLI, `mkdbg`, Python host tools, HIL workflows
- Analysis: rule-based snapshot engine with model adapter seam plus `seam` causal decode
- Crash diagnostics: `wire` UART fault readout and optional GDB bridge

## Repo Pointers
- Runtime / CLI: `src/main.c`
- Bringup model: `src/bringup_phase.c`, `src/dependency_graph.c`
- VM runtime: `src/vm32.c`, `include/vm32.h`
- Snapshot / analysis: `src/analysis_engine.c`, `tools/triage_bundle.py`
- Dashboard / host tooling: `tools/bringup_ui.py`, `tools/vm32`, `build_host/mkdbg-native`
- Support repos: `tools/seam`, `tools/wire`
- Generated bringup docs: `docs/generated/bringup_manifest.md`
