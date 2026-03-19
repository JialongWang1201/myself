# Production CV Pipeline: How I Debug and Run It

My debugging approach for CV pipelines is to treat data, model, and deployment as separate failure modes. I verify each one independently before I trust a result.

## Data First
- Build dataset baselines early and track class imbalance.
- Keep validation data isolated from production capture.
- When results drift, check the dataset before the model.

## Model Repro
- Record every training run with dataset hash and config.
- Re-run the exact setup before making any change.

## Evaluation Reality
- Test on production failure cases, not just lab samples.
- Track false positives and false negatives as first-class metrics.

## Deployment Discipline
- Prefer stable, explainable models over fragile accuracy gains.
- Log every input and output so production bugs can be replayed.
