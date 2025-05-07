# HairStyle App

A Next.js project built with TypeScript and enhanced with Tailwind CSS.

## Current Setup

- Next.js 15.2.4 with TypeScript
- Tailwind CSS for styling
- React 19.0.0
- Development tools: ESLint, PostCSS

## Dependencies

- Framer Motion: For animations
- React Icons: Icon library
- @sendgrid/mail & nodemailer: For email functionality
- js-cookie: For cookie management

## Project Structure

The project is currently in setup phase with the following configuration:

```
├── public/               # Static assets
├── src/                  # Source files
│   └── assests/          # Project assets
├── .next/                # Next.js build directory
├── .vscode/              # VS Code configuration
├── tailwind.config.js    # Tailwind configuration
├── middleware.ts         # Next.js middleware
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── next.config.ts        # Next.js configuration
└── postcss.config.mjs    # PostCSS configuration
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deployment

The project is configured for deployment on Netlify as indicated by the netlify.toml file.
