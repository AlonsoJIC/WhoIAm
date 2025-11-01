export interface Project {
  id: number;
  title: string;
  simpleDescription: string;
  description: string;
  technologies: string[];
  image: string;
  images?: string[];
  liveUrl?: string;
  githubUrl?: string;
  category?: string;
}
