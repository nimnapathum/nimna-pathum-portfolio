// Application constants
export const APP_CONFIG = {
  name: "Nimna Pathum",
  description: "Full Stack Developer & AI Researcher Portfolio",
  url: "https://nimnapathum.dev",
  author: "Nimna Pathum",
  keywords: ["portfolio", "developer", "AI", "full-stack", "typescript", "next.js"],
} as const;

export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  PROJECTS: "/projects",
  EXPERIENCE: "/experience",
  CONTACT: "/contact",
  BLOG: "/blog",
} as const;

export const THEME = {
  colors: {
    primary: "#fd7e14",
    secondary: "#64748b",
    accent: "#06b6d4",
    background: "#0f172a",
    foreground: "#f1f5f9",
    muted: "#334155",
  },
  animations: {
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
} as const;

export const LOADING_STATES = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
} as const;

export const SKILL_CATEGORIES = [
  "Frontend",
  "Backend", 
  "Database",
  "AI/ML",
  "Tools",
  "Cloud",
] as const;

export const PROJECT_STATUS = {
  COMPLETED: "completed",
  IN_PROGRESS: "in-progress",
  PLANNED: "planned",
} as const;

export const CONTACT_METHODS = {
  EMAIL: "email",
  LINKEDIN: "linkedin",
  GITHUB: "github",
  PHONE: "phone",
} as const;