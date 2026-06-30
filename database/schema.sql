CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE role AS ENUM ('admin', 'recruiter', 'viewer');
CREATE TYPE candidate_status AS ENUM ('new', 'shortlisted', 'interview', 'rejected');

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email varchar(320) NOT NULL UNIQUE,
  full_name varchar(180) NOT NULL,
  role role NOT NULL DEFAULT 'recruiter',
  password_hash varchar(255) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE resumes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name varchar(255) NOT NULL,
  file_type varchar(40) NOT NULL,
  storage_path varchar(512) NOT NULL,
  parse_status varchar(40) NOT NULL DEFAULT 'queued',
  raw_text text,
  parsed_json jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE candidates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id uuid NOT NULL UNIQUE REFERENCES resumes(id) ON DELETE CASCADE,
  name varchar(180) NOT NULL,
  email varchar(320) NOT NULL,
  phone varchar(40),
  address varchar(255),
  linkedin varchar(255),
  github varchar(255),
  portfolio varchar(255),
  title varchar(180) NOT NULL DEFAULT 'Candidate',
  location varchar(120) NOT NULL DEFAULT 'Remote',
  summary text NOT NULL,
  experience_years integer NOT NULL DEFAULT 0 CHECK (experience_years >= 0),
  skills text[] NOT NULL DEFAULT '{}',
  education jsonb NOT NULL DEFAULT '{}',
  experience jsonb NOT NULL DEFAULT '[]',
  projects jsonb NOT NULL DEFAULT '[]',
  achievements text[] NOT NULL DEFAULT '{}',
  certificates text[] NOT NULL DEFAULT '{}',
  languages text[] NOT NULL DEFAULT '{}',
  status candidate_status NOT NULL DEFAULT 'new',
  match_score numeric(5, 2) NOT NULL DEFAULT 0 CHECK (match_score BETWEEN 0 AND 100),
  embedding jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title varchar(180) NOT NULL,
  description text NOT NULL,
  required_skills text[] NOT NULL DEFAULT '{}',
  embedding jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  candidate_id uuid NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
  score numeric(5, 2) NOT NULL CHECK (score BETWEEN 0 AND 100),
  missing_skills text[] NOT NULL DEFAULT '{}',
  recommendation text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (job_id, candidate_id)
);

CREATE INDEX ix_candidates_name ON candidates(name);
CREATE INDEX ix_candidates_email ON candidates(email);
CREATE INDEX ix_candidates_status_score ON candidates(status, match_score DESC);
CREATE INDEX ix_candidates_skills ON candidates USING gin(skills);
CREATE INDEX ix_resumes_parse_status ON resumes(parse_status);
