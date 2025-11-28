"use client";

import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LoadingName from "./LoadingName";
import HeroSection from "./HeroSection";
import Image from "next/image";

const ScrollablePortfolio: React.FC = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const { scrollY } = useScroll();
  
  // Transform scroll position to move name up and fade it
  const nameY = useTransform(scrollY, [0, 500], [0, -200]);
  const nameOpacity = useTransform(scrollY, [0, 300], [0.3, 0]);
  const nameScale = useTransform(scrollY, [0, 500], [0.8, 0.6]);

  const handleLoadingComplete = () => {
    setTimeout(() => {
      setLoadingComplete(true);
    }, 500);
  };

  if (!loadingComplete) {
    return <LoadingName onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="relative">
      {/* Fixed parallax name background */}
      <motion.div
        className="fixed inset-0 flex items-center justify-center pointer-events-none z-0"
        style={{
          y: nameY,
          opacity: nameOpacity,
          scale: nameScale,
        }}
      >
        <Image
          src="/svg/name.svg"
          alt="Nimna Pathum"
          width={800}
          height={200}
          className="w-full max-w-5xl h-auto object-contain"
          priority
        />
      </motion.div>

      {/* Scrollable content */}
      <div className="relative z-10">
        {/* Initial spacer to show name first */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="h-screen flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center"
          >
            <p className="text-lg text-muted-foreground animate-pulse">
              Scroll to explore
            </p>
          </motion.div>
        </motion.div>

        {/* Hero section that slides up */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative bg-background/80 backdrop-blur-sm"
        >
          <HeroSection />
        </motion.div>

        {/* Additional content sections */}
        <motion.section
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="min-h-screen bg-background flex items-center justify-center"
        >
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
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
                  <p className="text-muted-foreground">Expert level development</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="min-h-screen bg-muted/20 flex items-center justify-center"
        >
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Projects
            </h2>
            <p className="text-lg text-muted-foreground">
              This section will showcase your amazing projects with interactive demos and case studies.
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ScrollablePortfolio;