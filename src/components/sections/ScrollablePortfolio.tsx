"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import LoadingName from "./LoadingName";
import HeroSection from "./HeroSection";
import LeftNav from "../LeftNav";
import CommunityLinks from "../CommunityLinks";
import useScrollTracking from "../../hooks/useScrollTracking";

interface ScrollablePortfolioProps {
  skipLoading?: boolean;
}

const ScrollablePortfolio: React.FC<ScrollablePortfolioProps> = ({ skipLoading = false }) => {
  const [loadingComplete, setLoadingComplete] = useState(skipLoading);
  const sections = ["home", "projects", "blogs", "about", "contact"];
  const { activeSection, scrollProgress } = useScrollTracking(sections);

  // Handle skip loading when navigating from navbar
  React.useEffect(() => {
    if (skipLoading) {
      setLoadingComplete(true);
    }
  }, [skipLoading]);

  const handleLoadingComplete = () => {
    if (skipLoading) {
      setLoadingComplete(true);
      return;
    }
    // Smooth transition with longer delay for better UX
    setTimeout(() => {
      setLoadingComplete(true);
    }, 1000); // Optimized timing for smooth transition
  };

  if (!loadingComplete) {
    return <LoadingName onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <motion.div 
      className="relative overflow-hidden bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* Scrollable content with smooth background transition */}
      <motion.div 
        className="relative z-10 bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      >
        {/* Left Navigation */}
        <LeftNav activeSection={activeSection} scrollProgress={scrollProgress} />
        
        {/* Right Community Links */}
        <CommunityLinks />

        {/* Hero section that slides up */}
        <motion.section
          id="home"
          initial={{ y: 80, opacity: 0, scale: 0.95 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ 
            duration: 1.5, 
            ease: [0.22, 1, 0.36, 1],
            delay: 0.2 
          }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative bg-background backdrop-blur-sm"
        >
          <HeroSection />
        </motion.section>

        {/* Projects Section */}
        <motion.section
          id="projects"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.22, 1, 0.36, 1],
            delay: 0.1
          }}
          viewport={{ once: true, margin: "-50px" }}
          className="min-h-screen bg-background flex items-center justify-center"
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-8">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-primary to-accent bg-clip-text text-foreground"
              >
                Projects
              </motion.h2>
              <motion.p 
                className="text-lg text-muted-foreground mb-6"
              >
                A showcase of my recent work and development projects
              </motion.p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/projects"
                  className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                >
                  View All Projects
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((project) => (
                <motion.div
                  key={project}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="p-6 bg-card border rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="h-48 bg-muted rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-muted-foreground">Project {project}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Amazing Project {project}</h3>
                  <p className="text-muted-foreground mb-4">Description of your incredible project and its impact.</p>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">React</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">TypeScript</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Blogs Section */}
        <motion.section
          id="blogs"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.22, 1, 0.36, 1],
            delay: 0.1
          }}
          viewport={{ once: true, margin: "-50px" }}
          className="min-h-screen bg-muted/5 flex items-center justify-center"
        >
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-8">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-primary to-accent bg-clip-text text-foreground"
              >
                Latest Blogs
              </motion.h2>
              <motion.p 
                className="text-lg text-muted-foreground mb-6"
              >
                Insights and tutorials on web development and technology
              </motion.p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/blogs"
                  className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                >
                  View All Blogs
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            </div>
            <div className="space-y-6">
              {[1, 2, 3].map((blog) => (
                <motion.article
                  key={blog}
                  whileHover={{ scale: 1.01 }}
                  className="p-6 bg-card border rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg shrink-0 flex items-center justify-center">
                      📝
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">How to Build Amazing Web Apps</h3>
                      <p className="text-muted-foreground mb-3">Learn the secrets behind creating stunning and performant web applications...</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Nov 28, 2025</span>
                        <span>5 min read</span>
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-md">Web Development</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section
          id="about"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.22, 1, 0.36, 1],
            delay: 0.1
          }}
          viewport={{ once: true, margin: "-50px" }}
          className="min-h-screen bg-background flex items-center justify-center"
        >
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-linear-to-r from-primary to-accent bg-clip-text text-foreground">
              About Me
            </h2>
            <p className="text-lg text-foreground mb-8">
              This section can showcase your skills, experience, and journey as a developer.
              The smooth scroll transitions create an engaging user experience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {['Frontend', 'Backend', 'AI/ML'].map((skill) => (
                <motion.div
                  key={skill}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-card border rounded-lg"
                >
                  <h3 className="text-xl font-semibold mb-2">{skill}</h3>
                  <p className="text-foreground">Expert level development</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="min-h-screen bg-muted/5 flex items-center justify-center"
        >
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-linear-to-r from-primary to-accent bg-clip-text text-foreground">
              Let&apos;s Connect
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Ready to start your next project? Let&apos;s discuss how we can work together.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-card border rounded-xl"
              >
                <div className="text-3xl mb-4">📧</div>
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-muted-foreground">hello@yourname.dev</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-card border rounded-xl"
              >
                <div className="text-3xl mb-4">💬</div>
                <h3 className="text-xl font-semibold mb-2">Social</h3>
                <p className="text-muted-foreground">@yourhandle on social platforms</p>
              </motion.div>
            </div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <button className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors">
                Get In Touch
              </button>
            </motion.div>
          </div>
        </motion.section>
      </motion.div>
    </motion.div>
  );
};

export default ScrollablePortfolio;