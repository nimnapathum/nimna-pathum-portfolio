// Personal details and portfolio data
export interface PersonalDetails {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website?: string;
  bio: string;
  avatar?: string;
}

export interface SocialLinks {
  linkedin: string;
  github: string;
  twitter?: string;
  instagram?: string;
  website?: string;
}

export interface Skill {
  name: string;
  level: number; // 1-100
  category: string;
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
  startDate: string;
  endDate?: string;
  status: "completed" | "in-progress" | "planned";
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  technologies: string[];
  achievements: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  gpa?: number;
  relevant_courses?: string[];
  achievements?: string[];
}