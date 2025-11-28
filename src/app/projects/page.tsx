"use client";

import React from "react";
import { motion } from "framer-motion";
import Navigation from "../../components/Navigation";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  status: "completed" | "in-progress" | "planned";
}

// Mock data - you can replace this with API calls
const projects: Project[] = [
  {
    id: "1",
    title: "AI-Powered Portfolio Assistant",
    description: "An intelligent portfolio website with AI-driven content generation and dynamic user interactions.",
    technologies: ["Next.js", "TypeScript", "OpenAI API", "Tailwind CSS", "Framer Motion"],
    image: "/projects/project-1.jpg",
    githubUrl: "https://github.com/nimnapathum/ai-portfolio",
    liveUrl: "https://ai-portfolio.nimnapathum.dev",
    status: "completed"
  },
  {
    id: "2", 
    title: "Real-time Chat Application",
    description: "A scalable real-time chat application with modern UI/UX and advanced features.",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Redis"],
    image: "/projects/project-2.jpg",
    githubUrl: "https://github.com/nimnapathum/chat-app",
    liveUrl: "https://chat.nimnapathum.dev",
    status: "completed"
  },
  {
    id: "3",
    title: "E-commerce Analytics Dashboard",
    description: "Comprehensive analytics dashboard for e-commerce businesses with real-time data visualization.",
    technologies: ["Vue.js", "Python", "FastAPI", "PostgreSQL", "Chart.js"],
    image: "/projects/project-3.jpg",
    githubUrl: "https://github.com/nimnapathum/ecommerce-dashboard",
    status: "in-progress"
  }
];

const ProjectsPage: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 border-green-200";
      case "in-progress": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "planned": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Navigation />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
            My Projects
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore my latest work and projects. Each project represents a unique challenge and learning opportunity.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              {/* Project Image */}
              <div className="aspect-video bg-muted flex items-center justify-center overflow-hidden">
                <div className="text-muted-foreground text-sm">Project Image</div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(project.status)}`}>
                    {project.status.replace("-", " ")}
                  </span>
                </div>

                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-muted/50 text-muted-foreground rounded-md text-sm">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground px-4 py-2 rounded-lg text-center transition-colors text-sm font-medium"
                    >
                      GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg text-center transition-colors text-sm font-medium"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProjectsPage;