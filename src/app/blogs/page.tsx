"use client";

import React from "react";
import { motion } from "framer-motion";
import Navigation from "../../components/Navigation";

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  readTime: number;
  category: string;
  tags: string[];
  featured: boolean;
}

// Mock data - you can replace this with API calls
const blogs: Blog[] = [
  {
    id: "1",
    title: "Building Modern Web Applications with Next.js 14",
    excerpt: "Explore the latest features and best practices for developing high-performance web applications using Next.js 14 and React Server Components.",
    content: "Full blog content here...",
    publishedAt: "2024-11-15",
    readTime: 8,
    category: "Web Development",
    tags: ["Next.js", "React", "TypeScript", "Performance"],
    featured: true
  },
  {
    id: "2",
    title: "The Future of AI in Software Development",
    excerpt: "How artificial intelligence is transforming the way we write, test, and deploy code, and what it means for developers.",
    content: "Full blog content here...",
    publishedAt: "2024-11-10",
    readTime: 12,
    category: "AI & Technology",
    tags: ["AI", "Machine Learning", "Development", "Future"],
    featured: true
  },
  {
    id: "3",
    title: "Optimizing React Performance: Tips and Tricks",
    excerpt: "Learn practical techniques to improve your React application's performance and provide better user experience.",
    content: "Full blog content here...",
    publishedAt: "2024-11-05",
    readTime: 6,
    category: "React",
    tags: ["React", "Performance", "Optimization", "Best Practices"],
    featured: false
  },
  {
    id: "4",
    title: "Understanding TypeScript Generics",
    excerpt: "A comprehensive guide to mastering TypeScript generics and how they can make your code more flexible and type-safe.",
    content: "Full blog content here...",
    publishedAt: "2024-10-28",
    readTime: 10,
    category: "TypeScript",
    tags: ["TypeScript", "Generics", "Type Safety", "Programming"],
    featured: false
  }
];

const BlogsPage: React.FC = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Web Development": "bg-blue-100 text-blue-800 border-blue-200",
      "AI & Technology": "bg-purple-100 text-purple-800 border-purple-200",
      "React": "bg-cyan-100 text-cyan-800 border-cyan-200",
      "TypeScript": "bg-indigo-100 text-indigo-800 border-indigo-200",
    };
    return colors[category] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const featuredBlogs = blogs.filter(blog => blog.featured);
  const regularBlogs = blogs.filter(blog => !blog.featured);

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
            Latest Blogs
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on web development, AI, and technology trends.
          </p>
        </motion.div>

        {/* Featured Blogs */}
        {featuredBlogs.length > 0 && (
          <section className="mb-12">
            <motion.h2
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold mb-6 text-foreground"
            >
              Featured Posts
            </motion.h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredBlogs.map((blog, index) => (
                <motion.article
                  key={blog.id}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getCategoryColor(blog.category)}`}>
                      {blog.category}
                    </span>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium">
                      Featured
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {blog.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-muted/30 text-muted-foreground rounded-md text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>{formatDate(blog.publishedAt)}</span>
                    <span>{blog.readTime} min read</span>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        )}

        {/* Regular Blogs */}
        <section>
          <motion.h2
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-bold mb-6 text-foreground"
          >
            All Posts
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularBlogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getCategoryColor(blog.category)}`}>
                    {blog.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {blog.readTime} min read
                  </span>
                </div>

                <h3 className="text-lg font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>

                <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                  {blog.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-muted/30 text-muted-foreground rounded-md text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="text-xs text-muted-foreground">
                  {formatDate(blog.publishedAt)}
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogsPage;