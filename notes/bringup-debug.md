# Bring-Up Debug: How I Use the Checklist

I keep bring-up debugging boring on purpose. The goal is to prove each layer before touching the next. This is the sequence I actually follow when a board won’t boot or behaves inconsistently.

## Power and Reset First
- Measure VDD at the MCU, not just the supply.
- Confirm NRST isn’t being held low.
- Check boot strap pins and default states.

## Debug Link
- Verify SWD/JTAG is stable and the target is readable.
- Make sure symbols load so breakpoints mean something.

## Minimal Firmware
- Flash a tiny image that only does clock init, UART banner, and a GPIO toggle.
- If the clock is wrong, everything else is noise.

## Correlate with Reality
- Scope or logic-analyzer the GPIO toggle against UART logs.
- If logs say “alive” but the pin doesn’t move, trust the pin.

## Version Drift
- When silicon or register maps change, diff the headers and re-validate init order.
