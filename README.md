# ICM Software Guide (word-image-app-reimagined)

> _README added by Robert Dickinson via Comet._

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn--ui-000000?logo=shadcnui&logoColor=white)

## About

This repository (originally scaffolded as `word-image-app-reimagined`) is an **InfoWorks ICM software guide and decision-support web app**. It provides a knowledge base, implementation guides, an ICM comparison tool, a project planner, a pricing calculator, vendor resources, and a quote request workflow to help teams evaluate and adopt ICM hydraulic modeling software.

It is part of the SWMMEnablement collection and is built on a modern Vite + React + TypeScript frontend styled with Tailwind CSS and shadcn/ui.

## What's Inside

| Area | Description |
| --- | --- |
| `src/components/KnowledgeBase.tsx` | Searchable ICM knowledge base |
| `src/components/ImplementationGuides.tsx` | Step-by-step implementation guides |
| `src/components/ICMComparisonTool.tsx` | Tool for comparing ICM options/features |
| `src/components/ProjectPlanner.tsx` | Project planning helper |
| `src/components/PricingCalculator.tsx` | Pricing / cost estimation |
| `src/components/QuoteRequestForm.tsx` | Quote request form |
| `src/components/VendorResources.tsx` | Vendor / resource links |
| `src/components/AnalysisExport.tsx` | Export analysis results |
| `src/components/FeatureCard.tsx`, `ProfileCard.tsx`, `RelatedContent.tsx` | Reusable content cards |
| `src/components/Header.tsx`, `Footer.tsx` | Layout |
| `src/components/ui/` | shadcn/ui reusable UI primitives |
| `src/assets/`, `public/` | Images and static assets |

## Tech Stack

| Layer | Technology |
| --- | --- |
| Language | TypeScript |
| Framework | React |
| Build tool | Vite |
| Styling | Tailwind CSS |
| UI components | shadcn/ui |

## Getting Started

```bash
# Clone the repository
git clone https://github.com/SWMMEnablement/word-image-app-reimagined.git
cd word-image-app-reimagined

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open the local URL printed by Vite (typically http://localhost:5173) in your browser.

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

## License

No license file is currently included. Contact the SWMMEnablement organization regarding reuse.
