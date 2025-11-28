// Environment variables and configuration

// Helper function to get optional env var with default
function getOptionalEnvVar(key: string, defaultValue?: string): string | undefined {
  return process.env[key] || defaultValue;
}

export const env = {
  // Node environment
  NODE_ENV: process.env.NODE_ENV || "development",
  
  // App configuration
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "Nimna Pathum Portfolio",
  NEXT_PUBLIC_APP_DESCRIPTION: process.env.NEXT_PUBLIC_APP_DESCRIPTION || "Full Stack Developer & AI Researcher Portfolio",
  
  // Analytics and tracking
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: getOptionalEnvVar("NEXT_PUBLIC_GOOGLE_ANALYTICS_ID"),
  NEXT_PUBLIC_HOTJAR_ID: getOptionalEnvVar("NEXT_PUBLIC_HOTJAR_ID"),
  
  // Admin and authentication
  ADMIN_TOKEN: getOptionalEnvVar("ADMIN_TOKEN", "development-token"),
  JWT_SECRET: getOptionalEnvVar("JWT_SECRET"),
  
  // Email configuration
  EMAIL_SERVICE: getOptionalEnvVar("EMAIL_SERVICE"),
  EMAIL_HOST: getOptionalEnvVar("EMAIL_HOST"),
  EMAIL_PORT: getOptionalEnvVar("EMAIL_PORT", "587"),
  EMAIL_USER: getOptionalEnvVar("EMAIL_USER"),
  EMAIL_PASS: getOptionalEnvVar("EMAIL_PASS"),
  EMAIL_FROM: getOptionalEnvVar("EMAIL_FROM"),
  
  // Database configuration
  DATABASE_URL: getOptionalEnvVar("DATABASE_URL"),
  MONGODB_URI: getOptionalEnvVar("MONGODB_URI"),
  REDIS_URL: getOptionalEnvVar("REDIS_URL"),
  
  // File upload and storage
  CLOUDINARY_CLOUD_NAME: getOptionalEnvVar("CLOUDINARY_CLOUD_NAME"),
  CLOUDINARY_API_KEY: getOptionalEnvVar("CLOUDINARY_API_KEY"),
  CLOUDINARY_API_SECRET: getOptionalEnvVar("CLOUDINARY_API_SECRET"),
  AWS_BUCKET_NAME: getOptionalEnvVar("AWS_BUCKET_NAME"),
  AWS_ACCESS_KEY_ID: getOptionalEnvVar("AWS_ACCESS_KEY_ID"),
  AWS_SECRET_ACCESS_KEY: getOptionalEnvVar("AWS_SECRET_ACCESS_KEY"),
  AWS_REGION: getOptionalEnvVar("AWS_REGION", "us-east-1"),
  
  // External APIs
  GITHUB_TOKEN: getOptionalEnvVar("GITHUB_TOKEN"),
  LINKEDIN_CLIENT_ID: getOptionalEnvVar("LINKEDIN_CLIENT_ID"),
  LINKEDIN_CLIENT_SECRET: getOptionalEnvVar("LINKEDIN_CLIENT_SECRET"),
  
  // Rate limiting and security
  RATE_LIMIT_MAX: parseInt(getOptionalEnvVar("RATE_LIMIT_MAX", "100") || "100"),
  RATE_LIMIT_WINDOW: getOptionalEnvVar("RATE_LIMIT_WINDOW", "15m"),
  CORS_ORIGIN: getOptionalEnvVar("CORS_ORIGIN"),
} as const;

// Environment helpers
export const isDevelopment = env.NODE_ENV === "development";
export const isProduction = env.NODE_ENV === "production";
export const isTest = env.NODE_ENV === "test";

// Validation for required environment variables in production
if (isProduction) {
  const requiredInProduction = [
    'NEXT_PUBLIC_APP_URL',
    'ADMIN_TOKEN',
  ];
  
  for (const envVar of requiredInProduction) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable for production: ${envVar}`);
    }
  }
}

// Development warnings
if (isDevelopment) {
  const recommendedInDevelopment = {
    'ADMIN_TOKEN': 'Admin dashboard access',
    'EMAIL_USER': 'Contact form functionality',
    'EMAIL_PASS': 'Contact form functionality',
  };
  
  for (const [envVar, purpose] of Object.entries(recommendedInDevelopment)) {
    if (!process.env[envVar]) {
      console.warn(`⚠️  Missing optional environment variable: ${envVar} (needed for: ${purpose})`);
    }
  }
}

// Export typed environment for better IDE support
export type Env = typeof env;