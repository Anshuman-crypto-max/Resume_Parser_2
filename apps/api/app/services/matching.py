import math
from app.schemas.candidate import CandidateRead, MatchResult


def tokenize(value: str) -> set[str]:
    return {token.strip(".,:;()[]{}").lower() for token in value.split() if len(token) > 2}


def cosine_similarity(a: list[float], b: list[float]) -> float:
    dot = sum(x * y for x, y in zip(a, b))
    norm_a = math.sqrt(sum(x * x for x in a))
    norm_b = math.sqrt(sum(y * y for y in b))
    if norm_a == 0 or norm_b == 0:
        return 0
    return dot / (norm_a * norm_b)


def rank_candidates(job_description: str, candidates: list[CandidateRead]) -> list[MatchResult]:
    job_terms = tokenize(job_description)
    ranked: list[MatchResult] = []
    for candidate in candidates:
        skills = {skill.lower() for skill in candidate.skills}
        overlap = len(job_terms.intersection(skills))
        score = min(100, 58 + overlap * 9 + candidate.experience_years * 2)
        missing = sorted([term for term in job_terms if term in {"python", "fastapi", "postgresql", "redis", "react", "aws"} and term not in skills])
        ranked.append(
            MatchResult(
                **candidate.model_dump(),
                match_score=score,
                missing_skills=missing,
                recommendation="Shortlist" if score >= 85 else "Review against team-specific requirements",
            )
        )
    return sorted(ranked, key=lambda item: item.match_score, reverse=True)
