"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTypingEffect } from "../../hooks/useTypingEffect";
import { cn } from "../../lib/utils";
import Image from "next/image";

interface LoadingNameProps {
  className?: string;
  onLoadingComplete?: () => void;
}

const LoadingName: React.FC<LoadingNameProps> = ({
  className,
  onLoadingComplete,
}) => {
  const [currentPhase, setCurrentPhase] = useState<'typing' | 'name' | 'complete'>('typing');
  
  // Typing effect for "Loading..." text
  const { displayText: typingText, isComplete: typingComplete } = useTypingEffect(
    "Loading...",
    150,
    500
  );

  useEffect(() => {
    if (typingComplete) {
      // Wait 1 second after typing is complete, then show name
      const timer = setTimeout(() => {
        setCurrentPhase('name');
      }, 1000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [typingComplete]);

  useEffect(() => {
    if (currentPhase === 'name') {
      // Wait 2 seconds with name visible, then mark as complete
      const timer = setTimeout(() => {
        setCurrentPhase('complete');
        onLoadingComplete?.();
      }, 2000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [currentPhase, onLoadingComplete]);

  return (
    <div className={cn(
      "w-screen h-screen flex justify-center items-center bg-background text-foreground",
      className
    )}>
      <AnimatePresence mode="wait">
        {/* Typing Loading Text */}
        {currentPhase === 'typing' && (
          <motion.div
            key="typing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center"
          >
            <p className="text-2xl md:text-3xl font-medium text-center">
              {typingText}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="ml-1"
              >
                |
              </motion.span>
            </p>
          </motion.div>
        )}

        {/* Name SVG */}
        {(currentPhase === 'name' || currentPhase === 'complete') && (
          <motion.div
            key="name"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: currentPhase === 'complete' ? 0.8 : 1,
              y: currentPhase === 'complete' ? -100 : 0
            }}
            transition={{ 
              duration: 0.8, 
              ease: "easeInOut"
            }}
            className="flex justify-center items-center"
          >
            <Image
              src="/svg/name.svg"
              alt="Nimna Pathum"
              width={800}
              height={200}
              className="w-full max-w-4xl h-auto object-contain"
              priority
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoadingName;