import math

from app.schemas.candidate import CandidateRead, MatchResult


def tokenize(value: str) -> set[str]:
    return {
        token.strip(".,:;()[]{}").lower()
        for token in value.split()
        if len(token) > 2
    }


def cosine_similarity(a: list[float], b: list[float]) -> float:
    dot = sum(x * y for x, y in zip(a, b))
    norm_a = math.sqrt(sum(x * x for x in a))
    norm_b = math.sqrt(sum(y * y for y in b))

    if norm_a == 0 or norm_b == 0:
        return 0.0

    return dot / (norm_a * norm_b)


def rank_candidates(
    job_description: str,
    candidates: list[CandidateRead],
) -> list[MatchResult]:
    job_terms = tokenize(job_description)
    ranked: list[MatchResult] = []

    required_skills = {
        "python",
        "fastapi",
        "postgresql",
        "redis",
        "react",
        "aws",
    }

    for candidate in candidates:
        skills = {skill.lower() for skill in candidate.skills}

        overlap = len(job_terms.intersection(skills))

        score = min(
            100,
            58 + overlap * 9 + candidate.experience_years * 2,
        )

        missing = sorted(
            term
            for term in job_terms
            if term in required_skills and term not in skills
        )

        # Get candidate data as a dictionary
        candidate_data = candidate.model_dump()

        # Override the existing match_score instead of passing it twice
        candidate_data["match_score"] = score

        ranked.append(
            MatchResult(
                **candidate_data,
                missing_skills=missing,
                recommendation=(
                    "Shortlist"
                    if score >= 85
                    else "Review against team-specific requirements"
                ),
            )
        )

    ranked.sort(key=lambda candidate: candidate.match_score, reverse=True)

    return ranked