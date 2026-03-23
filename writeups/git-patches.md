# Sending Patches to Git: What I Learned from My First Series

*Personal writeup*  
*March 2026*

## Summary
Recently I spent time contributing patches to Git itself. What looked simple from the outside turned out to be a very different kind of engineering exercise: smaller changes, stricter review, and much higher standards for clarity.

In total, I sent **5 patches** across the series. Some were small cleanups, some were follow-up revisions, and some existed mainly because review feedback forced me to sharpen the reasoning behind the change.

That was the real value of the process. The patches mattered, but the review discipline mattered more.

## What the Work Actually Felt Like
Working on Git patches did not feel like shipping app code quickly. It felt closer to low-level systems work:
- every change needed a strong reason
- commit messages had to explain intent, not just mechanics
- reviewers cared about edge cases, maintenance cost, and whether the patch fit the existing design
- a "small" patch was only good if it was also easy to review and easy to trust

That forced me to slow down in a useful way.

I had to think not only about whether the code worked, but also whether the patch was shaped correctly:
- should this be one patch or a short series?
- is this a local fix or part of a broader cleanup?
- will the next person understand why this line changed?

## The Hardest Part
The hardest part was not writing code. It was learning how to present the change so that another engineer could evaluate it quickly.

I learned that a patch can be technically correct and still weak if:
- the scope is mixed
- the motivation is vague
- the commit message hides the real problem
- the diff makes review harder than necessary

That was probably the biggest shift in mindset for me. Good patch writing is not only about implementation quality. It is also about reviewer ergonomics.

## What I Learned
- Split changes by intent, not by convenience. A reviewer should be able to understand why each patch exists on its own.
- Write commit messages that explain the problem first. If the motivation is weak, the patch usually is too.
- Expect revision rounds. Review feedback is part of the work, not a delay to the work.
- Keep the diff boring. The best patch is often the one that leaves the reviewer with nothing extra to decode.
- Read the surrounding code carefully before changing anything. In a mature project, local edits often sit on top of old constraints.

## Practical Advice for Future Contributions
If I were giving advice to someone preparing their first Git patch series, it would be this:

- make the patch smaller than your first instinct
- explain the "why" earlier and more explicitly
- separate cleanup from behavior change
- test before and after, even for changes that look obvious
- treat review comments as design feedback, not just correction

The process rewards precision, patience, and respect for existing code. Those are useful habits well beyond Git.

## Outcome
The visible result was a set of submitted patches.
The more important result was a better engineering standard for myself.

After this experience, I am much less impressed by clever diffs and much more interested in changes that are easy to justify, easy to review, and easy to maintain.
