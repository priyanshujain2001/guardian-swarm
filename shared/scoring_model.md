# Scoring Model & Technical Debt Estimation

When generating a final report, the AI agent must calculate a Technical Debt Score.

## Effort Multipliers (Estimated Time to Fix)
- **CRITICAL:** 8 hours (1 story point)
- **HIGH:** 4 hours (0.5 story points)
- **MEDIUM:** 1 hour
- **LOW:** 15 minutes

## Formula
Total Debt (Hours) = (Count(CRITICAL) * 8) + (Count(HIGH) * 4) + (Count(MEDIUM) * 1) + (Count(LOW) * 0.25)

## Grade Scale
- **A (Excellent):** 0 - 4 hours of debt
- **B (Good):** 5 - 16 hours of debt
- **C (Fair):** 17 - 40 hours of debt
- **D (Poor):** 41 - 100 hours of debt
- **F (Failing):** > 100 hours of debt
