"use client";

import React from "react";
import { motion } from "framer-motion";
import { personalDetails } from "../../data/portfolio";
import Button from "../Button";
import { THEME } from "@/constants";

const HeroSection: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="min-h-screen flex items-center justify-center px-4"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ color: THEME.colors.primary}}
          className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6`}
        >
          {personalDetails.name}
        </motion.h1>
        
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
        >
          {personalDetails.title}
        </motion.p>
        
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto"
        >
          {personalDetails.bio}
        </motion.p>
        
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button variant="primary" size="medium">
            View My Work
          </Button>
          
          <Button variant="secondary" size="medium">
            Get In Touch
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;