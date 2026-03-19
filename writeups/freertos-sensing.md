# FreeRTOS Firmware for Continuous Environmental Sensing

*Software Engineer Intern — EcoSafeSense*  
*May 2023 – Apr 2024*

## Summary
This was the project that made me comfortable living inside FreeRTOS. I developed real-time firmware for ARM Cortex-M and ESP32 devices to support continuous environmental sensing and long-running deployments. The work was less about flashy features and more about making the system quietly stable for weeks.

## What I Worked On
- Built deterministic task scheduling for continuous sensing.
- Implemented register-level I2C/SPI/UART/GPIO drivers.
- Diagnosed timing and synchronization issues that caused intermittent data corruption.
- Added internal validation and logging tools for runtime analysis.

## Personal Notes
I learned how small scheduling decisions compound over time. A task that looked fine on day one would cause subtle drift after long runs, and those bugs were the hardest to reproduce. I got into the habit of adding lightweight logging early, even if it felt noisy, because it saved hours later.

Working close to the hardware also taught me humility. Many “firmware” bugs turned out to be power or signal issues. The best fix was often a simple change to timing or a careful reorder of initialization steps. By the end, I trusted the system because I understood where it could fail.

## Outcomes
- Improved system stability across field testing.
- Reduced intermittent communication errors during sampling.

## Tools
ARM Cortex-M, ESP32, FreeRTOS, I2C, SPI, UART, GPIO.
