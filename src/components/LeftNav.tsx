"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "blogs", label: "Blogs" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

interface LeftNavProps {
  activeSection: string;
  scrollProgress: number;
}

const LeftNav: React.FC<LeftNavProps> = ({ activeSection, scrollProgress }) => {
  const [clickedSection, setClickedSection] = useState<string | null>(null);

  const scrollToSection = (sectionId: string) => {
    // Instantly set the clicked section for immediate indicator movement
    setClickedSection(sectionId);
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      
      // Reset clicked section when scroll animation completes
      setTimeout(() => setClickedSection(null), 800);
    }
  };

  // Calculate target position for clicked section based on actual section positions
  const getTargetProgress = (sectionId: string): number => {
    const sectionIndex = navItems.findIndex(item => item.id === sectionId);
    if (sectionIndex === -1) return scrollProgress;
    
    // Map each section to its position on the progress line
    const sectionPositions = {
      'home': 0.1,      // 10% for home section
      'projects': 0.3,  // 30% for projects section  
      'blogs': 0.5,     // 50% for blogs section
      'about': 0.7,     // 70% for about section
      'contact': 1    // 90% for contact section
    };
    
    return sectionPositions[sectionId as keyof typeof sectionPositions] || scrollProgress;
  };

  return (
    <motion.nav
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.5 }}
      className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 bg-card/90 backdrop-blur-md p-2 shadow-xl"
    >
      {/* Enhanced Scroll Progress Indicator */}
      <motion.div 
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.3, ease: "easeOut" }}
        className="absolute left-0 top-0 w-1 h-full bg-muted/30 rounded-l-2xl overflow-hidden origin-top"
      >
        <div
          className="w-full bg-foreground rounded-l-2xl transition-all ease-out"
          style={{
            height: `${Math.max((clickedSection ? getTargetProgress(clickedSection) : scrollProgress) * 100, 2)}%`,
            minHeight: '2px',
            transitionProperty: 'height',
            transitionDuration: clickedSection ? '0.4s' : '0.3s',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
      </motion.div>

      {/* Navigation Items */}
      <div className="flex flex-col space-y-2 ml-2">
        {navItems.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ x: -30, opacity: 0, scale: 0.9 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: 1.5 + (index * 0.15), // Staggered delay: 1.5s, 1.65s, 1.8s, etc.
              ease: [0.22, 1, 0.36, 1]
            }}
            onClick={() => scrollToSection(item.id)}
            whileHover={{ scale: 1.05 }}
            className={`relative flex items-center p-3 rounded-xl transition-all duration-200 ${
              activeSection === item.id
                ? "text-primary-foreground shadow-md"
                : "bg-transparent hover:bg-muted/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="text-md">{item.label}</span>

            {/* Active indicator */}
            {activeSection === item.id && (
              <div
                className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-primary rounded-full transition-all duration-200 z-20"
              />
            )}
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
};

export default LeftNav;