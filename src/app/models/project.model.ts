export type ProjectCategory = 'personal' | 'professional-client';

export interface Project {
  id: number;
  category: ProjectCategory;
  title: string;
  simpleDescription: string;
  description: string;
  problem: string;
  solution: string;
  result: string;
  technologies: string[];
  image: string;
  images?: string[];
  githubUrl?: string;
  liveUrl?: string;
  clientName?: string;
  role?: string;
}
