export enum Section {
  HOME = 'HOME',
  JOURNEY = 'JOURNEY',
  SKILLS = 'SKILLS',
  PROJECTS = 'PROJECTS',
  CONNECT = 'CONNECT',
  VEO_LAB = 'VEO_LAB',
  INTEL_CENTER = 'INTEL_CENTER'
}

export interface JourneyMilestone {
  id: string;
  title: string;
  role: string;
  period: string;
  description: string;
  tech: string[];
  icon: 'school' | 'code' | 'work' | 'trophy';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  type: 'academic' | 'professional' | 'personal';
}

export interface Paper {
  title: string;
  conference: string;
  award?: string;
  abstract: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'Language' | 'Framework' | 'AI/ML' | 'Tools';
}