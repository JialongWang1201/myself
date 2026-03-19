# Production Computer Vision Inspection Pipeline

*Software Engineer Intern — Apple*  
*May 2024 – Aug 2024*

## Summary
This project was the first time I felt how messy real production data can be. I built and deployed a computer vision inspection pipeline to replace manual visual checks in production validation. It was a long loop of data curation, training, deployment, and then watching the system behave under real factory conditions.

## What I Worked On
- Automated inspection pipeline integrated into validation workflows.
- Trained models with 5,000+ labeled images over 50+ iterations.
- Built X-ray image–based CV system using 20,000+ samples and 60+ training cycles.

## Personal Notes
My biggest takeaway was that accuracy in the lab means little if the deployment can't survive messy inputs. I spent a lot of time learning how to define the right labels, how to reject ambiguous samples, and how to keep the pipeline stable when new batches arrived. The moment we saw zero false positives and zero false negatives felt unreal, but it only held because the dataset was carefully curated and the evaluation rules were strict.

I also learned that automation is about trust. Operators won't adopt a system unless they can understand why it makes a decision. That pushed me to keep the pipeline simple, to log everything, and to focus on reproducibility over cleverness.

## Outcomes
- Achieved zero false positives and zero false negatives in production inspections.
- Automated 66% of inspection categories that previously required manual review.

## Tools
Python, CV pipelines, dataset tooling, model training.
