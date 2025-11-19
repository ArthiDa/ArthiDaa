import { JourneyMilestone, Project, Paper, Skill } from './types';

export const BIO = {
  name: "Pranab Barua Arthi",
  role: "AI Engineer",
  company: "Liberate Labs",
  tagline: "Turning 0 to 100 in AI & Engineering",
  intro: "Started as a competitive programmer, evolved into a Full Stack Dev, and ascended to an AI Engineer. I build multi-agent systems, RAG pipelines, and optimize deep learning workflows."
};

export const JOURNEY: JourneyMilestone[] = [
  {
    id: 'j1',
    title: 'The Beginning',
    role: 'Competitive Programmer',
    period: 'University (Year 2)',
    description: 'Started competitive programming. Built foundations in Data Structures and Algorithms. Created first Java Spring Boot app (Airline Booking).',
    tech: ['Java', 'Spring Boot', 'MySQL', 'C++'],
    icon: 'school'
  },
  {
    id: 'j2',
    title: 'Level Up: Pupil',
    role: 'Codeforces Pupil (1400)',
    period: 'University (Year 3)',
    description: 'Achieved Pupil rank on Codeforces. Learned DP, Bit-masking, Binary Trees. Built Fullstack Ecommerce site with PHP.',
    tech: ['PHP', 'Bootstrap', 'MySQL', 'Algorithms'],
    icon: 'trophy'
  },
  {
    id: 'j3',
    title: 'The AI Shift',
    role: 'AI Intern',
    period: 'University (Year 4, Sem 7)',
    description: 'Shifted focus from 0 to 100 into AI. Built Realtime Face Authentication (MediaPipe) and Resume Parsers.',
    tech: ['Computer Vision', 'MediaPipe', 'Python'],
    icon: 'code'
  },
  {
    id: 'j4',
    title: 'Innovation & Mentorship',
    role: 'Project Lead',
    period: 'University (Year 4, Sem 8)',
    description: 'Built QueryHub (RAG Knowledge Platform) under industry mentorship. Secured Microsoft Startup credits.',
    tech: ['FastAPI', 'RAG', 'Vector DB', 'Modal.com'],
    icon: 'work'
  },
  {
    id: 'j5',
    title: 'Professional Class Change',
    role: 'AI Engineer',
    period: 'Liberate Labs (Present)',
    description: 'Building Studybuds (Multi-agent AI tutor). Specializing in LangGraph, Docker, CI/CD, and LLM fine-tuning.',
    tech: ['LangGraph', 'LangChain', 'Postgres', 'Docker', 'Next.js'],
    icon: 'work'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Studybuds',
    description: 'A multi-agent gamified learning system where AI acts as a peer learner. Features RAG, Realtime search, and complex agentic workflows.',
    techStack: ['FastAPI', 'LangGraph', 'OpenAI/Claude', 'Docker', 'Qdrant'],
    type: 'professional'
  },
  {
    id: 'p2',
    title: 'QueryHub',
    description: 'StackOverflow-like platform with AI-based semantic search and "Chat with PDF" functionality.',
    techStack: ['FastAPI', 'Sentence-Transformers', 'React', 'Modal'],
    type: 'academic'
  },
  {
    id: 'p3',
    title: 'Face Auth System',
    description: 'Real-time face authentication utilizing Google MediaPipe JS.',
    techStack: ['JavaScript', 'MediaPipe', 'Computer Vision'],
    type: 'personal'
  }
];

export const PAPERS: Paper[] = [
  {
    title: "Fostering Critical Thinking in Intelligent Tutoring Systems Through a Supervised Multi-Agent Pedagogical Framework",
    conference: "IEEE BIM",
    award: "Best Paper Award",
    abstract: "Designed a multi-agent architecture unifying Socratic dialogue and Learning-by-Teaching. Conducted an 8-week study with 627 students showing significant positive trends in learning outcomes."
  },
  {
    title: "Enhancing Drug Development Workflows with Deep Learning-based Chart Classification and Detection",
    conference: "IEEE QPAIN",
    abstract: "Automated chart classification (ResNet, VGG, etc.) and text detection to streamline data extraction in Quantitative Systems Pharmacology."
  }
];

export const SKILLS: Skill[] = [
  { name: 'Python / FastAPI', level: 95, category: 'Language' },
  { name: 'React / Next.js', level: 85, category: 'Language' },
  { name: 'LangChain / Graph', level: 90, category: 'AI/ML' },
  { name: 'RAG / Vector DBs', level: 92, category: 'AI/ML' },
  { name: 'Docker / CI/CD', level: 80, category: 'Tools' },
  { name: 'PostgreSQL', level: 85, category: 'Tools' },
  { name: 'Comp. Programming', level: 75, category: 'Tools' }
];