"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "../../components/Navigation";

interface Project {
  id?: string;
  title: string;
  description: string;
  technologies: string[];
  status: "completed" | "in-progress" | "planned";
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

interface Blog {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featured: boolean;
  publishedAt?: string;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"projects" | "blogs">("projects");
  const [adminToken, setAdminToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Project form state
  const [projectForm, setProjectForm] = useState<Project>({
    title: "",
    description: "",
    technologies: [],
    status: "completed",
    githubUrl: "",
    liveUrl: "",
    image: ""
  });

  // Blog form state
  const [blogForm, setBlogForm] = useState<Blog>({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: [],
    featured: false
  });

  const [techInput, setTechInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  const authenticate = () => {
    if (adminToken.trim()) {
      setIsAuthenticated(true);
      setMessage("Authentication successful!");
      setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage("Please enter a valid admin token");
    }
  };

  const addTechnology = () => {
    if (techInput.trim() && !projectForm.technologies.includes(techInput.trim())) {
      setProjectForm({
        ...projectForm,
        technologies: [...projectForm.technologies, techInput.trim()]
      });
      setTechInput("");
    }
  };

  const removeTechnology = (tech: string) => {
    setProjectForm({
      ...projectForm,
      technologies: projectForm.technologies.filter(t => t !== tech)
    });
  };

  const addTag = () => {
    if (tagInput.trim() && !blogForm.tags.includes(tagInput.trim())) {
      setBlogForm({
        ...blogForm,
        tags: [...blogForm.tags, tagInput.trim()]
      });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setBlogForm({
      ...blogForm,
      tags: blogForm.tags.filter(t => t !== tag)
    });
  };

  const submitProject = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${adminToken}`
        },
        body: JSON.stringify(projectForm)
      });

      const result = await response.json();
      
      if (response.ok) {
        setMessage("Project created successfully!");
        setProjectForm({
          title: "",
          description: "",
          technologies: [],
          status: "completed",
          githubUrl: "",
          liveUrl: "",
          image: ""
        });
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage("Failed to create project");
      console.error("Error:", error);
    }
    setLoading(false);
    setTimeout(() => setMessage(""), 5000);
  };

  const submitBlog = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${adminToken}`
        },
        body: JSON.stringify(blogForm)
      });

      const result = await response.json();
      
      if (response.ok) {
        setMessage("Blog post created successfully!");
        setBlogForm({
          title: "",
          excerpt: "",
          content: "",
          category: "",
          tags: [],
          featured: false
        });
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage("Failed to create blog post");
      console.error("Error:", error);
    }
    setLoading(false);
    setTimeout(() => setMessage(""), 5000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md w-full mx-4"
          >
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
              <h1 className="text-2xl font-bold text-center mb-6">Admin Access</h1>
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Enter admin token"
                  value={adminToken}
                  onChange={(e) => setAdminToken(e.target.value)}
                  className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  onKeyPress={(e) => e.key === "Enter" && authenticate()}
                />
                <button
                  onClick={authenticate}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Access Dashboard
                </button>
                {message && (
                  <p className="text-center text-sm text-muted-foreground">{message}</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your projects and blog posts</p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "projects"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            Add Project
          </button>
          <button
            onClick={() => setActiveTab("blogs")}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "blogs"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            Add Blog Post
          </button>
        </div>

        {/* Message Display */}
        {message && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`mb-6 p-4 rounded-lg ${
              message.includes("Error") || message.includes("Failed")
                ? "bg-red-100 text-red-800 border border-red-200"
                : "bg-green-100 text-green-800 border border-green-200"
            }`}
          >
            {message}
          </motion.div>
        )}

        {/* Project Form */}
        {activeTab === "projects" && (
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <h2 className="text-xl font-semibold mb-6">Add New Project</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <input
                    type="text"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                    className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Project title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Status *</label>
                  <select
                    value={projectForm.status}
                    onChange={(e) => setProjectForm({...projectForm, status: e.target.value as Project["status"]})}
                    className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="completed">Completed</option>
                    <option value="in-progress">In Progress</option>
                    <option value="planned">Planned</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">GitHub URL</label>
                  <input
                    type="url"
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm({...projectForm, githubUrl: e.target.value})}
                    className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="https://github.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Live URL</label>
                  <input
                    type="url"
                    value={projectForm.liveUrl}
                    onChange={(e) => setProjectForm({...projectForm, liveUrl: e.target.value})}
                    className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="https://project.com"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Description *</label>
                  <textarea
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                    rows={4}
                    className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Project description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Technologies *</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      className="flex-1 p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Add technology"
                      onKeyPress={(e) => e.key === "Enter" && addTechnology()}
                    />
                    <button
                      onClick={addTechnology}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {projectForm.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {tech}
                        <button
                          onClick={() => removeTechnology(tech)}
                          className="hover:text-primary/70"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Image URL</label>
                  <input
                    type="url"
                    value={projectForm.image}
                    onChange={(e) => setProjectForm({...projectForm, image: e.target.value})}
                    className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="/projects/image.jpg"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={submitProject}
                disabled={loading || !projectForm.title || !projectForm.description || projectForm.technologies.length === 0}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Creating..." : "Create Project"}
              </button>
            </div>
          </motion.div>
        )}

        {/* Blog Form */}
        {activeTab === "blogs" && (
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <h2 className="text-xl font-semibold mb-6">Add New Blog Post</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <input
                    type="text"
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({...blogForm, title: e.target.value})}
                    className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Blog post title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <input
                    type="text"
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({...blogForm, category: e.target.value})}
                    className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Web Development, AI, etc."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Excerpt *</label>
                <textarea
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({...blogForm, excerpt: e.target.value})}
                  rows={3}
                  className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Brief summary of the blog post"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Content *</label>
                <textarea
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({...blogForm, content: e.target.value})}
                  rows={8}
                  className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Full blog post content"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    className="flex-1 p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Add tag"
                    onKeyPress={(e) => e.key === "Enter" && addTag()}
                  />
                  <button
                    onClick={addTag}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {blogForm.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      #{tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="hover:text-primary/70"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={blogForm.featured}
                  onChange={(e) => setBlogForm({...blogForm, featured: e.target.checked})}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <label htmlFor="featured" className="text-sm font-medium">
                  Mark as featured post
                </label>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={submitBlog}
                  disabled={loading || !blogForm.title || !blogForm.excerpt || !blogForm.content || !blogForm.category}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "Creating..." : "Create Blog Post"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;