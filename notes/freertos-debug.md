# FreeRTOS Debug: How I Triage Scheduling Issues

When the system “hangs,” I assume the scheduler is still running and one task is starving everything else. My first goal is to prove which task owns the time.

## Prove the Tick
- Confirm the tick source is alive (SysTick or TIM).
- Toggle a GPIO from the tick hook if needed.

## Watch the Idle Task
- If idle never runs, something is hogging CPU.
- If idle runs too much, a task is blocked or dead.

## Stack and Heap First
- Check stack high-water marks before trusting any log.
- Verify heap regions and MPU settings if tasks fault silently.

## Reduce the System
- Disable all but one task and add them back one by one.
- If the issue disappears, the interaction was the bug.

## Timing Discipline
- Replace delays with timers or event groups.
- Avoid long critical sections that mask scheduling issues.
