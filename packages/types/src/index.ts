export type Role = "admin" | "recruiter" | "viewer";
export type CandidateStatus = "new" | "shortlisted" | "interview" | "rejected";

export type ParsedResume = {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  website?: string;
  skills: string[];
  programmingLanguages: string[];
  frameworks: string[];
  libraries: string[];
  databases: string[];
  cloudPlatforms: string[];
  operatingSystems: string[];
  tools: string[];
  softSkills: string[];
  experience: Record<string, unknown>[];
  education: Record<string, unknown>[];
  projects: Record<string, unknown>[];
  achievements: string[];
  certificates: string[];
  languages: string[];
  summary: string;
};
