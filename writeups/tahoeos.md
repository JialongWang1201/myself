# TahoeOS: Smartwatch Firmware, Bootloader, and BLE Control Path

*Personal project — STM32F411, FreeRTOS, LVGL*  
*Active development*

## Summary
TahoeOS is my open-source smartwatch firmware platform built on STM32F411 with FreeRTOS and an LVGL-based UI.

What started as a bring-up exercise turned into a more complete embedded system:
- bootloader + application split
- touch UI and app pages
- sensor and health data paths
- power and sleep behavior
- a structured BLE/UART control protocol for host-side interaction
- hardware design files, enclosure models, and bring-up/debug assets in the same repo

## Recent Updates

Recently I pushed the project in a direction that makes it easier to extend, test, and hand off as a real firmware platform instead of just a watch UI demo.

New work includes:
- structured BLE/UART framed protocol instead of only ad-hoc text commands
- `GET_STATUS` for machine-readable runtime snapshots
- `SET_CFG` for host-side configuration changes like BLE, wrist wake, light level, and timeout policy
- `SET_TIME` for structured time sync over the same protocol
- a host-side `ble_proto.py` tool to build, decode, and send framed requests without hand-calculating CRCs
- Unity tests for sensor dispatch-table scheduling logic
- a UART RX safety fix and sensor data type cleanup
- README and docs cleanup so the repo reads more like a complete open-source hardware + firmware project

The result is a project that is easier to test, script, and explain, with a clearer path from hardware files to bootloader to application to host tooling.

## What I Built
- FreeRTOS-based application firmware with LVGL touch UI and gesture navigation
- bootloader + application workflow with UART IAP / YMODEM update path
- board bring-up flow for clocks, display, touch, UART, timers, and sensor drivers
- runtime features like heart-rate view, environment pages, utilities, and low-power behavior
- BLE hardware control plus a framed UART/BLE command path for host-side automation
- repository structure that includes firmware, bootloader, hardware, enclosure, simulator, docs, and host-side tools

## Why It Matters
I like this project because it connects low-level firmware work with visible user-facing behavior.

It is one thing to bring up clocks, DMA, display init, and task scheduling.
It is another thing to make all of that feel coherent when a user swipes a page, changes a setting, updates firmware, or resumes cleanly from sleep.

The recent protocol and test work matters for the same reason: it gives the firmware a cleaner operator surface and a safer development loop.
That makes TahoeOS feel more like a product platform and less like a pile of embedded demos.

## Practical Lessons
- bring-up should be repeatable, not heroic
- UI work on MCUs is really a scheduling and memory-budget problem
- low-power behavior is part of the feature set, not a final polish step
- firmware becomes much easier to validate once host tooling can query and configure it in a structured way
- once the repo includes hardware, images, docs, and tests, the project becomes much easier for other people to navigate

## Current Stack
- MCU: STM32F411CEU6
- RTOS: FreeRTOS
- GUI: LVGL v8.2
- Display: 1.69" touch LCD
- Sensors: MPU6050, EM7028, AHT21, SPL06, LSM303
- Update path: UART IAP + YMODEM
- Host tooling: Python BLE/UART frame helper

## Repo Notes
- Main app firmware: `Software/OV_Watch`
- Bootloader / IAP flow: `Software/IAP_F411`
- Hardware design and Gerbers: `Hardware`
- Enclosure models: `3D Modle`
- LVGL simulator: `lv_sim_vscode_win`
- Released images: `Firmware/`
- Bring-up and debug notes: `docs/`
- Host-side helpers: `tools/`

The repository now looks much more like a complete open-source embedded platform: firmware, bootloader, flashing path, host tooling, tests, hardware files, enclosure assets, and documentation all live together.
