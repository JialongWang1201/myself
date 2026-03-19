# MPU Sandbox: How I Debug Permission Faults

MPU faults are rarely the first failure; they are the first honest signal. I debug them by shrinking the problem and validating the map before the code.

## Validate the Map
- Print or log each region base, size, and permissions at boot.
- Check alignment rules and region overlap.

## Confirm Privilege Boundaries
- Verify which tasks run privileged vs unprivileged.
- Ensure system calls are the only path to protected memory.

## Trigger on Purpose
- Add a known invalid access to confirm the fault handler works.
- If the handler doesn’t fire, you aren’t testing the MPU.

## Minimal Repro
- Reduce to a single task and one region.
- Add permissions back one by one until the fault returns.

## Handler Discipline
- Log fault address, status registers, and task context.
- If logs are unreliable, use a GPIO pulse pattern.
