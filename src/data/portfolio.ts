import { PersonalDetails, SocialLinks, Skill, Project, Experience, Education } from "../types";

export const personalDetails: PersonalDetails = {
  name: "Nimna Pathum",
  title: "Full Stack Developer | Agentic AI Researcher | Tech Enthusiast",
  email: "nimnapathum30@gmail.com",
  phone: "+94703954031",
  location: "Colombo, Sri Lanka",
  linkedin: "https://www.linkedin.com/in/nimna-pathum-87a271266/",
  github: "https://github.com/Nimnapathum",
  bio: "Passionate Full Stack Developer with expertise in modern web technologies, AI research, and innovative solutions. I love creating impactful digital experiences and exploring the latest in tech.",
  avatar: "/images/avatar.jpg"
};

export const socialLinks: SocialLinks = {
  linkedin: personalDetails.linkedin,
  github: personalDetails.github,
  website: "https://nimnapathum.dev",
};

export const skills: Skill[] = [
  // Frontend
  { name: "React", level: 90, category: "Frontend", icon: "react" },
  { name: "Next.js", level: 85, category: "Frontend", icon: "nextjs" },
  { name: "TypeScript", level: 88, category: "Frontend", icon: "typescript" },
  { name: "Tailwind CSS", level: 92, category: "Frontend", icon: "tailwind" },
  { name: "Three.js", level: 75, category: "Frontend", icon: "threejs" },
  
  // Backend
  { name: "Node.js", level: 85, category: "Backend", icon: "nodejs" },
  { name: "Python", level: 82, category: "Backend", icon: "python" },
  { name: "PostgreSQL", level: 78, category: "Database", icon: "postgresql" },
  { name: "MongoDB", level: 80, category: "Database", icon: "mongodb" },
  
  // AI/ML
  { name: "Machine Learning", level: 75, category: "AI/ML", icon: "ml" },
  { name: "LangChain", level: 70, category: "AI/ML", icon: "langchain" },
  
  // Tools
  { name: "Git", level: 88, category: "Tools", icon: "git" },
  { name: "Docker", level: 75, category: "Tools", icon: "docker" },
  { name: "AWS", level: 70, category: "Cloud", icon: "aws" },
];

export const projects: Project[] = [
  {
    id: "portfolio-website",
    title: "Personal Portfolio Website",
    description: "A modern, responsive portfolio website built with Next.js, TypeScript, and Three.js",
    longDescription: "This portfolio website showcases my work and skills through an interactive and visually appealing interface. Built with performance and accessibility in mind.",
    technologies: ["Next.js", "TypeScript", "Three.js", "Tailwind CSS", "React"],
    githubUrl: "https://github.com/nimnapathum/nimna-pathum-portfolio",
    liveUrl: "https://nimnapathum.dev",
    featured: true,
    startDate: "2024-11",
    status: "in-progress"
  },
];

export const experiences: Experience[] = [
  // Add your actual experiences here
];

export const education: Education[] = [
  // Add your education details here
];