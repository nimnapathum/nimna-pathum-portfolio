"use client";

import { useState, useEffect } from "react";

interface UseScrollTrackingResult {
  activeSection: string;
  scrollProgress: number;
}

const useScrollTracking = (sections: string[]): UseScrollTrackingResult => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Get all section elements with their positions
      const sectionElements = sections.map(id => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrollTop;
          const elementBottom = elementTop + rect.height;
          return {
            id,
            element,
            top: elementTop,
            bottom: elementBottom,
            height: rect.height
          };
        }
        return null;
      }).filter(Boolean);

      if (sectionElements.length === 0) return;

      // Find active section based on viewport center
      const viewportCenter = scrollTop + windowHeight / 2;
      let currentActiveSection = "home";
      let currentSectionIndex = 0;

      for (let i = 0; i < sectionElements.length; i++) {
        const section = sectionElements[i];
        if (section && viewportCenter >= section.top) {
          currentActiveSection = section.id;
          currentSectionIndex = i;
        }
      }

      setActiveSection(currentActiveSection);

      // Calculate enhanced scroll progress based on section progression
      let progress = 0;
      const totalSections = sectionElements.length;
      
      if (totalSections > 0) {
        const currentSection = sectionElements[currentSectionIndex];
        
        if (currentSection) {
          // Base progress from completed sections
          const sectionBaseProgress = currentSectionIndex / totalSections;
          
          // Progress within current section
          const sectionScrolled = Math.max(0, viewportCenter - currentSection.top);
          const sectionProgress = Math.min(sectionScrolled / currentSection.height, 1);
          const sectionContribution = sectionProgress / totalSections;
          
          progress = Math.min(sectionBaseProgress + sectionContribution, 1);
        }
      }

      setScrollProgress(progress);
    };

    // Throttled scroll handler for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll);
    
    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [sections]);

  return { activeSection, scrollProgress };
};

export default useScrollTracking;