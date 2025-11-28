// Global type definitions
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Animation types
export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: string;
}

// Theme types
export interface ThemeConfig {
  colors: Record<string, string>;
  animations: Record<string, string>;
  breakpoints: Record<string, string>;
}

// API Response types
export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
  success: boolean;
}

// Form types
export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

// Page types
export interface PageProps {
  params?: Record<string, string>;
  searchParams?: Record<string, string>;
}

// SEO types
export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

export type LoadingState = "idle" | "loading" | "success" | "error";

export {};