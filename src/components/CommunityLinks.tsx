"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import personalDetails from "@/data/legacy";

interface CommunityLink {
  id: string;
  label: string;
  url: string;
  icon: React.ReactNode;
}

const communityLinks: CommunityLink[] = [
  {
    id: "github",
    label: "GitHub",
    url: personalDetails.github,
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    url: personalDetails.linkedin,
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    id: "email",
    label: "Email",
    url: `mailto:${personalDetails.email}`,
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 12.713l11.985-7.713H.015L12 12.713zm0 2.574L.015 7.001v10.998h23.97V7.001L12 15.287z"/>
      </svg>
    ),
  }
];

const CommunityLinks: React.FC = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const openLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.nav
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.8 }}
      className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 bg-card/90 backdrop-blur-md p-2 shadow-xl"
    >
      {/* Community Links */}
      <div className="flex flex-col space-y-2">
        {communityLinks.map((link, index) => (
          <motion.button
            key={link.id}
            initial={{ x: 50, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: 1.8 + (index * 0.3), // Staggered delay: 1.8s, 2.1s, 2.4s, etc.
              ease: [0.22, 1, 0.36, 1]
            }}
            onClick={() => openLink(link.url)}
            onHoverStart={() => setHoveredLink(link.id)}
            onHoverEnd={() => setHoveredLink(null)}
            whileHover={{ scale: 1.05 }}
            className="relative flex items-center justify-center p-3 rounded-xl transition-all duration-200 bg-transparent hover:bg-muted/50 text-muted-foreground hover:text-foreground"
          >
            {link.icon}
            
            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{
                opacity: hoveredLink === link.id ? 1 : 0,
                x: hoveredLink === link.id ? 0 : 10,
              }}
              className="absolute right-full mr-4 px-3 py-2 bg-foreground text-background rounded-lg text-sm font-medium whitespace-nowrap shadow-lg"
            >
              {link.label}
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1 w-2 h-2 bg-foreground rotate-45" />
            </motion.div>
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
};

export default CommunityLinks;
