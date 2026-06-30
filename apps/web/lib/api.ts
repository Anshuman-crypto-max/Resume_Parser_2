const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json() as Promise<T>;
}

export const api = {
  candidates: () => request<Candidate[]>("/candidates"),
  analytics: () => request<Analytics>("/analytics"),
  match: (jobDescription: string) =>
    request<MatchResult[]>("/matching/rank", {
      method: "POST",
      body: JSON.stringify({ job_description: jobDescription }),
    }),
};

export type Candidate = {
  id: string;
  name: string;
  email: string;
  title: string;
  location: string;
  experience_years: number;
  status: "new" | "shortlisted" | "interview" | "rejected";
  skills: string[];
  match_score: number;
  summary: string;
};

export type Analytics = {
  total_candidates: number;
  parsed_resumes: number;
  average_match: number;
  interviews: number;
  funnel: { stage: string; value: number }[];
  skills: { name: string; value: number }[];
  monthly: { month: string; candidates: number }[];
};

export type MatchResult = Candidate & {
  missing_skills: string[];
  recommendation: string;
};
