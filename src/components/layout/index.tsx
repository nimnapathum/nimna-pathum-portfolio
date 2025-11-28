"use client";

import React from "react";
import { cn } from "../../lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

const maxWidthClasses = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md", 
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
} as const;

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  maxWidth = "xl",
}) => {
  return (
    <div className={cn(
      "mx-auto px-4 sm:px-6 lg:px-8",
      maxWidthClasses[maxWidth],
      className
    )}>
      {children}
    </div>
  );
};

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: "default" | "muted" | "accent";
}

const backgroundClasses = {
  default: "bg-background",
  muted: "bg-muted/50",
  accent: "bg-accent/10",
} as const;

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  id,
  background = "default",
}) => {
  return (
    <section 
      id={id}
      className={cn(
        "py-12 md:py-16 lg:py-20",
        backgroundClasses[background],
        className
      )}
    >
      {children}
    </section>
  );
};

interface FlexProps {
  children: React.ReactNode;
  direction?: "row" | "col";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: boolean;
  gap?: "0" | "1" | "2" | "4" | "6" | "8" | "12";
  className?: string;
}

export const Flex: React.FC<FlexProps> = ({
  children,
  direction = "row",
  align = "start",
  justify = "start",
  wrap = false,
  gap = "4",
  className,
}) => {
  const directionClass = direction === "col" ? "flex-col" : "flex-row";
  const alignClass = `items-${align}`;
  const justifyClass = `justify-${justify}`;
  const wrapClass = wrap ? "flex-wrap" : "flex-nowrap";
  const gapClass = `gap-${gap}`;

  return (
    <div className={cn(
      "flex",
      directionClass,
      alignClass,
      justifyClass,
      wrapClass,
      gapClass,
      className
    )}>
      {children}
    </div>
  );
};

interface GridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: "0" | "1" | "2" | "4" | "6" | "8" | "12";
  className?: string;
}

export const Grid: React.FC<GridProps> = ({
  children,
  cols = 1,
  gap = "4",
  className,
}) => {
  const colsClass = `grid-cols-${cols}`;
  const gapClass = `gap-${gap}`;

  return (
    <div className={cn(
      "grid",
      colsClass,
      gapClass,
      className
    )}>
      {children}
    </div>
  );
};