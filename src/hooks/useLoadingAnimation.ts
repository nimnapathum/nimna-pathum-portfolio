"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook for loading animation with customizable text and timing
 */
export function useLoadingAnimation(
  initialText = "Loading",
  maxDots = 3,
  interval = 500,
  duration = 3000
) {
  const [loadingText, setLoadingText] = useState(initialText);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Animate dots
    const dotInterval = setInterval(() => {
      setLoadingText(prev => {
        const currentDots = prev.replace(initialText, "").length;
        return currentDots >= maxDots 
          ? initialText 
          : prev + ".";
      });
    }, interval);

    // Stop loading after duration
    const timeout = setTimeout(() => {
      setIsLoading(false);
      setIsVisible(false);
      clearInterval(dotInterval);
    }, duration);

    return () => {
      clearInterval(dotInterval);
      clearTimeout(timeout);
    };
  }, [initialText, maxDots, interval, duration]);

  return {
    loadingText,
    isLoading,
    isVisible,
    setIsVisible,
  };
}