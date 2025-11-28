"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingName from "./LoadingName";
import HeroSection from "./HeroSection";

const MainContent: React.FC = () => {
  const [showScrollable, setShowScrollable] = useState(false);

  const handleLoadingComplete = () => {
    // Wait a bit before enabling scroll
    setTimeout(() => {
      setShowScrollable(true);
    }, 1000);
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {!showScrollable && (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50"
          >
            <LoadingName onLoadingComplete={handleLoadingComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scrollable content */}
      {showScrollable && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          {/* Fixed name that moves up on scroll */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-10"
            style={{
              transform: "translateY(var(--scroll-y, 0))",
            }}
          >
            <motion.img
              src="/svg/name.svg"
              alt="Nimna Pathum"
              className="w-full max-w-4xl h-auto object-contain opacity-20"
              style={{
                transform: "scale(0.8)",
              }}
            />
          </motion.div>

          {/* Hero section that comes from behind */}
          <div className="relative z-20">
            <div className="h-screen" /> {/* Spacer for initial scroll */}
            <HeroSection />
            
            {/* Additional sections can be added here */}
            <div className="min-h-screen bg-muted/20 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-4">More Content</h2>
                <p className="text-xl text-muted-foreground">Add your projects, about section, etc.</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MainContent;