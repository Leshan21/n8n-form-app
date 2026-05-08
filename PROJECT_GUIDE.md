# 📋 Project Files Quick Reference

## Core Application Files

### 🎨 UI Components

**[components/FormComponent.tsx](components/FormComponent.tsx)** - Form Input Component

```
├── State: form data (name, email, documentType, message)
├── Features:
│   ├── Text inputs with focus states
│   ├── Email input field
│   ├── Dropdown select for document type
│   ├── Textarea for message
│   ├── Gradient submit button
│   ├── Loading spinner during submission
│   └── Disabled state while processing
└── Customizable field structure
```

**[components/OutputDisplay.tsx](components/OutputDisplay.tsx)** - Response Display Component

```
├── State: output, loading, error
├── Display Modes:
│   ├── Loading spinner with pulse animation
│   ├── Error message with icon
│   ├── JSON output in code block
│   ├── Copy to clipboard button
│   ├── Response statistics (size, status)
│   └── Empty state guidance
└── Animated background with gradient
```

### 🔧 Backend & Routing

**[app/api/webhook/route.ts](app/api/webhook/route.ts)** - Webhook API Handler

```
├── POST endpoint at /api/webhook
├── Functionality:
│   ├── Receives form data from frontend
│   ├── Forwards to N8N webhook URL
│   ├── Handles CORS issues
│   ├── Error handling with logging
│   └── Returns N8N response to frontend
├── Environment: N8N_WEBHOOK_URL
└── Methods: POST, GET
```

### 📄 Main Pages

**[app/page.tsx](app/page.tsx)** - Home Page (Main Application)

```
├── Client Component with 'use client'
├── Layout:
│   ├── Gradient background with animated elements
│   ├── Header with title and description
│   └── Two-column grid:
│       ├── Left: FormComponent
│       └── Right: OutputDisplay
├── State Management:
│   ├── output: string | null
│   ├── loading: boolean
│   └── error: string | null
└── Webhook Integration:
    └── Fetch to /api/webhook with form data
```

**[app/layout.tsx](app/layout.tsx)** - Root Layout

```
├── Default Next.js layout
├── Tailwind CSS configuration
└── Global styles setup
```

## Configuration Files

### Environment Setup

**[.env.local](.env.local)** - Environment Variables (Local)

```bash
N8N_WEBHOOK_URL=http://localhost:5678/webhook/test
NEXT_PUBLIC_N8N_WEBHOOK=/api/webhook
```

**[.env.example](.env.example)** - Environment Template

```
Template for team members to copy and configure
```

### Build Configuration

**[package.json](package.json)** - Dependencies & Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

**[tsconfig.json](tsconfig.json)** - TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "jsx": "preserve",
    "jsxImportSource": "react",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

**[next.config.ts](next.config.ts)** - Next.js Configuration

```
App Router configuration with React strict mode
```

**[tailwind.config.ts](tailwind.config.ts)** - Tailwind CSS Setup

```
Dark mode enabled
Content paths configured
```

## Documentation Files

### Setup & Getting Started

**[README.md](README.md)** - Complete Documentation

- Features overview
- Installation & setup
- API integration
- Project structure
- Customization guide
- Security considerations
- Deployment options
- Troubleshooting

**[QUICKSTART.md](QUICKSTART.md)** - Fast Setup Guide

- Installation (3 steps)
- Environment variables
- Quick customization
- Testing with cURL
- Docker deployment
- Tips & tricks

**[SETUP_COMPLETE.md](SETUP_COMPLETE.md)** - What You Got

- Feature summary
- Getting started (3 steps)
- Key features overview
- Documentation guide
- Testing methods
- Next steps

### Advanced Guides

**[N8N_SETUP.md](N8N_SETUP.md)** - N8N Workflow Configuration

- Creating a test workflow
- Adding webhook trigger
- Processing nodes
- Response setup
- Testing methods
- Example workflows
- Data structure reference
- Debugging tips

**[CUSTOMIZATION.md](CUSTOMIZATION.md)** - Component Customization

- Form field examples:
  - Number inputs
  - Checkboxes
  - Radio buttons
  - File uploads
  - Date pickers
  - Textarea with counter
- Output display customization
- Form validation examples
- Multi-step form wizard
- Styling variations

## Project Structure Tree

```
n8n-form-app/
│
├── 📁 app/                          # Next.js app directory
│   ├── layout.tsx                   # Root layout component
│   ├── page.tsx                     # Main home page ⭐
│   └── 📁 api/
│       └── 📁 webhook/
│           └── route.ts             # Webhook handler API ⭐
│
├── 📁 components/                   # React components
│   ├── FormComponent.tsx            # Input form component ⭐
│   └── OutputDisplay.tsx            # Output display component ⭐
│
├── 📁 public/                       # Static assets
│   └── (SVG icons, etc.)
│
├── 📁 .next/                        # Build output (generated)
│
├── 📄 Configuration Files
│   ├── next.config.ts               # Next.js config
│   ├── tsconfig.json                # TypeScript config
│   ├── tailwind.config.ts           # Tailwind CSS config
│   └── package.json                 # Dependencies
│
├── 🔐 Environment Files
│   ├── .env.local                   # Local config (create this)
│   └── .env.example                 # Config template
│
└── 📚 Documentation
    ├── README.md                    # Full documentation
    ├── QUICKSTART.md                # Quick setup
    ├── SETUP_COMPLETE.md            # Setup summary
    ├── N8N_SETUP.md                 # N8N guide
    ├── CUSTOMIZATION.md             # Customization guide
    └── PROJECT_GUIDE.md             # This file
```

## What to Edit for Each Task

### 🎨 Design Changes

→ Edit `components/FormComponent.tsx` or `components/OutputDisplay.tsx`
→ Tailwind CSS classes control all styling

### ➕ Add Form Fields

→ Edit `components/FormComponent.tsx`
→ 1) Add to state
→ 2) Add input element
→ 3) Handle onChange

### 🎯 Change Colors

→ Search for Tailwind classes like `from-blue-500`
→ Replace with your desired colors
→ Files: `app/page.tsx`, `components/*.tsx`

### 🔗 Update Webhook URL

→ Edit `.env.local`
→ Change `N8N_WEBHOOK_URL` value

### 🚀 Deploy

→ Run `npm run build && npm start`
→ Or use Vercel: `vercel deploy`

## Key Dependencies

```bash
next@16.2.6              # React framework
react@19.x              # UI library
typescript@5.x          # Type safety
tailwindcss@3.4         # Styling
```

## Commands Reference

```bash
# Development
npm run dev             # Start dev server (hot reload)
npm run build           # Build for production
npm start               # Start production server
npm run lint            # Check code with ESLint

# Testing
curl -X POST http://localhost:3000/api/webhook \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com"}'
```

## File Relationships

```
User submits form
       ↓
app/page.tsx (handles submission)
       ↓
Calls fetch to /api/webhook
       ↓
app/api/webhook/route.ts (receives form data)
       ↓
Forwards to N8N_WEBHOOK_URL
       ↓
N8N processes workflow
       ↓
Webhook returns JSON response
       ↓
app/page.tsx receives response
       ↓
OutputDisplay.tsx shows formatted JSON
```

## Common Customization Paths

| Goal                 | File to Edit                    | What to Change            |
| -------------------- | ------------------------------- | ------------------------- |
| Add form field       | FormComponent.tsx               | Add state + input element |
| Change colors        | app/page.tsx, components/\*.tsx | Tailwind classes          |
| Update webhook URL   | .env.local                      | N8N_WEBHOOK_URL value     |
| Modify API logic     | app/api/webhook/route.ts        | POST/GET handlers         |
| Change layout        | app/page.tsx                    | Grid/container classes    |
| Add validation       | FormComponent.tsx               | Add validation logic      |
| Custom output format | OutputDisplay.tsx               | Modify display JSX        |

---

**Pro Tip**: Files marked with ⭐ are the main files you'll likely customize. The rest are supporting infrastructure.

Use this guide to quickly navigate the project! 🚀
