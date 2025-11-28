"use client";

import React from "react";
import { getSvgPath, getLetterDimensions } from "../../lib/svg";
import Image from "next/image";

export interface SvgConfig {
  letter: string;
  height?: string;
  width?: string;
  className?: string;
  alt?: string;
}

/**
 * Get SVG component with proper dimensions and optimization
 */
export function getSvgComponent({ 
  letter, 
  height, 
  width, 
  className = "", 
  alt 
}: SvgConfig): React.ReactElement | null {
  const upperLetter = letter.toUpperCase();
  const dimensions = getLetterDimensions(letter);
  
  if (!dimensions) {
    console.warn(`SVG not found for letter: ${letter}`);
    return null;
  }

  const svgPath = getSvgPath(letter);
  if (!svgPath) return null;

  return (
    <Image
      src={svgPath}
      alt={alt || `Letter ${upperLetter}`}
      width={200}
      height={200}
      className={`object-contain ${className}`}
      style={{ 
        height: height || dimensions.height, 
        width: width || dimensions.width,
        maxWidth: "100%",
        maxHeight: "100%"
      }}
      priority={false}
    />
  );
}

/**
 * Render name as SVG letters
 */
export function renderNameAsSvg(name: string, className?: string): React.ReactElement {
  const letters = name.split("");
  
  return (
    <div className={`flex items-center justify-center space-x-1 ${className || ""}`}>
      {letters.map((letter, index) => {
        if (letter === " ") {
          return <div key={index} className="w-4" />; // Space
        }
        
        const svgComponent = getSvgComponent({ letter });
        if (!svgComponent) {
          return (
            <span key={index} className="text-4xl font-bold">
              {letter}
            </span>
          );
        }
        
        return (
          <div key={index} className="shrink-0">
            {svgComponent}
          </div>
        );
      })}
    </div>
  );
}