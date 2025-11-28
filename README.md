# Nimna Pathum Portfolio

A modern, full-stack portfolio website built with Next.js 15, React 19, and TypeScript. Features include a dynamic admin dashboard, content management system, animations, and responsive design.

## ✨ Features

- 🎨 **Modern UI**: Tailwind CSS v4 with Framer Motion animations
- 📱 **Responsive Design**: Mobile-first approach with fluid layouts
- 🔐 **Admin Dashboard**: Secure content management for projects and blogs
- 📝 **CMS**: Rich forms with validation and real-time feedback
- 🚀 **Performance**: Optimized with Next.js App Router and React 19
- 📊 **Analytics**: Google Analytics and Hotjar integration
- 📧 **Contact Form**: Email integration with SMTP support
- 🌙 **Dark Mode**: System preference detection and manual toggle
- 🔍 **SEO**: Optimized with Next.js Metadata API
- 🎯 **Navigation**: Smooth client-side routing with progress indicators

## 🚀 Quick Start

### 1. Environment Setup

Run the interactive setup script:

```bash
npm run setup-env
```

Or manually copy `.env.example` to `.env.local` and fill in your values.

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Access Admin Dashboard

Navigate to `/admin` and use your admin token to manage content.

## 🔧 Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_APP_URL` | Production | Your app's URL |
| `ADMIN_TOKEN` | Yes | Admin dashboard access |
| `EMAIL_USER` | Optional | SMTP email address |
| `EMAIL_PASS` | Optional | SMTP password |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | Optional | GA4 Measurement ID |

See `.env.example` for all available options.

## 📁 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **React**: 19.2.0 with modern features
- **TypeScript**: Full type safety
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Code Quality**: ESLint + Prettier

## 🛠 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run setup-env    # Interactive environment setup
npm run lint         # Run ESLint with auto-fix
npm run type-check   # TypeScript type checking
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repo to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

**Built with ❤️ by Nimna Pathum**
