# ICM Software Guide — Project Handover Document

> **App Name:** ICM Software Guide  
> **Brand:** BobSWMM Legacy  
> **Author/Owner:** Robert Dickinson (50+ years in SSF modeling)  
> **Live URL:** https://word-image-app-reimagined.lovable.app  
> **Lovable Project:** https://lovable.dev/projects/6393e9bc-85b8-4741-83c8-8e3c4a4a9bac  
> **Last Updated:** February 2026  
> **Current Grade:** A- (Excellent)

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Component Architecture](#component-architecture)
5. [Design System](#design-system)
6. [Data Architecture](#data-architecture)
7. [Feature Inventory](#feature-inventory)
8. [Business Logic & Algorithms](#business-logic--algorithms)
9. [Content & Domain Knowledge](#content--domain-knowledge)
10. [Known Limitations & Planned Improvements](#known-limitations--planned-improvements)
11. [Roadmap](#roadmap)
12. [Deployment & Environment](#deployment--environment)
13. [Migration Notes](#migration-notes)

---

## Executive Summary

The ICM Software Guide is a **professional decision-support tool** for comparing Autodesk InfoWorks ICM software versions (Ultimate, Sewer, Flood, Viewer). It helps water infrastructure engineers select the right product, understand pricing, plan implementations, and prepare for vendor negotiations.

**Core Value Proposition:** Translates Robert Dickinson's 50+ years of hydraulic modeling expertise into an interactive, data-driven software selection tool — positioned as an **independent hydraulic modeling platform advisor**, not a marketing page.

**Target Users:**
- Municipal engineers evaluating ICM products
- Engineering consultancies selecting modeling tools
- Water utility managers planning software procurement
- SWMM users considering migration to ICM

---

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Framework** | React | ^18.3.1 |
| **Build Tool** | Vite | (via Lovable) |
| **Language** | TypeScript | strict mode |
| **Styling** | Tailwind CSS + CSS Variables | v3.x |
| **UI Components** | shadcn/ui (Radix primitives) | latest |
| **Routing** | React Router DOM | ^6.30.1 |
| **State** | React useState/useMemo (no global store) | — |
| **Icons** | Lucide React | ^0.462.0 |
| **Theme** | next-themes | ^0.3.0 |
| **Toast** | Sonner + Radix Toast | ^1.7.4 |
| **Charts** | Recharts (installed, not actively used) | ^2.15.4 |
| **Forms** | React Hook Form + Zod | ^7.61.1 / ^3.25.76 |
| **Data Fetching** | TanStack React Query (installed, unused — no backend) | ^5.83.0 |

### Notable: No Backend

This is a **purely client-side SPA**. There is no database, no authentication, no API calls. All data is hardcoded in component files. TanStack React Query and React Hook Form are installed but the app currently uses simple `useState` for all forms and data.

---

## Project Structure

```
src/
├── assets/                          # Static images
│   ├── hero-bg.jpg
│   ├── hero-cover.jpg
│   ├── hero-water-modeling.jpg      # Current hero background
│   ├── icm-features.jpg
│   ├── icm-sewer.jpg
│   ├── icm-shortcut-flags.jpg
│   ├── icm-ultimate.jpg
│   ├── icm-ultimate-2.jpg
│   ├── icm-viewer.jpg
│   └── robert-profile.jpg           # Author headshot
├── components/
│   ├── ui/                           # 40+ shadcn/ui primitives
│   │   ├── accordion.tsx
│   │   ├── badge.tsx                 # Custom variants added
│   │   ├── button.tsx                # Custom variants (hero, glass)
│   │   ├── card.tsx
│   │   ├── tabs.tsx
│   │   └── ... (40+ more)
│   ├── Header.tsx                    # Sticky nav with scroll spy
│   ├── Footer.tsx                    # BobSWMM collection links
│   ├── ProfileCard.tsx               # Robert Dickinson sidebar card
│   ├── ProjectPlanner.tsx            # Needs assessment wizard
│   ├── ICMComparisonTool.tsx         # Feature matrix + recommendations
│   ├── PricingCalculator.tsx         # Pricing + breakeven calculator (534 lines)
│   ├── KnowledgeBase.tsx             # FAQs + tutorials + source docs (1030 lines)
│   ├── ImplementationGuides.tsx      # Workflows + scripts + migration (749 lines)
│   ├── AnalysisExport.tsx            # Export tools + negotiation tips (396 lines)
│   ├── QuoteRequestForm.tsx          # Lead generation form (241 lines)
│   ├── VendorResources.tsx           # Official Autodesk links
│   ├── FeatureCard.tsx               # ICM Sewer feature summary
│   └── RelatedContent.tsx            # Related articles sidebar
├── hooks/
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/
│   └── utils.ts                      # cn() utility
├── pages/
│   ├── Index.tsx                     # Main page (single-page layout)
│   └── NotFound.tsx
├── App.tsx                           # Router + providers
├── App.css
├── index.css                         # Design tokens (HSL variables)
├── main.tsx                          # Entry point
└── vite-env.d.ts
```

---

## Component Architecture

### Page Layout (Index.tsx)

```
┌─────────────────────────────────────────┐
│ Header (sticky, scroll-spy navigation)  │
├─────────────────────────────────────────┤
│ Hero Section (background image + CTA)   │
├────────────────────────┬────────────────┤
│ Main Content (75%)     │ Sidebar (25%)  │
│ ┌────────────────────┐ │ ProfileCard    │
│ │ ProjectPlanner     │ │ VendorResources│
│ ├────────────────────┤ │ Quick Summary  │
│ │ ICMComparisonTool  │ │                │
│ ├────────────────────┤ │                │
│ │ PricingCalculator  │ │                │
│ ├────────────────────┤ │                │
│ │ KnowledgeBase      │ │                │
│ ├────────────────────┤ │                │
│ │ ImplementationGuides│ │               │
│ ├────────────────────┤ │                │
│ │ AnalysisExport     │ │                │
│ ├────────────────────┤ │                │
│ │ QuoteRequestForm   │ │                │
│ └────────────────────┘ │                │
├────────────────────────┴────────────────┤
│ Footer (BobSWMM collection + links)     │
└─────────────────────────────────────────┘
```

Layout uses a `lg:grid-cols-4` grid — main content spans 3 columns, sidebar spans 1.

### Component Dependency Graph

```
Index.tsx
├── Header.tsx (nav items defined inline, uses IntersectionObserver)
├── ProfileCard.tsx (standalone, no props)
├── ProjectPlanner.tsx (standalone, internal state)
├── ICMComparisonTool.tsx (standalone, internal state)
├── PricingCalculator.tsx (standalone, internal state)
├── KnowledgeBase.tsx (standalone, internal state)
├── ImplementationGuides.tsx (standalone, internal state)
├── AnalysisExport.tsx (standalone, internal state)
├── QuoteRequestForm.tsx (standalone, internal state)
├── VendorResources.tsx (standalone, no state)
└── Footer.tsx (standalone, no state)
```

**Key Pattern:** Every major component is fully self-contained with **zero props** and **zero shared state**. Components don't communicate with each other. This makes them highly portable but means cross-component features (like "auto-fill quote form from Project Planner selections") would require lifting state up or adding a global store.

---

## Design System

### Color Tokens (HSL-based, light/dark mode)

Defined in `src/index.css`:

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| `--background` | `39 100% 97%` (warm cream) | `212 100% 8%` (deep navy) |
| `--foreground` | `212 100% 15%` | `39 40% 98%` |
| `--primary` | `18 100% 50%` (vibrant orange) | `18 100% 58%` |
| `--primary-hover` | `18 100% 40%` | `18 100% 68%` |
| `--secondary` | `212 100% 96%` | `212 32% 18%` |
| `--accent` | `212 100% 85%` | `212 84% 52%` |
| `--muted` | `212 50% 95%` | `212 32% 18%` |
| `--card` | `0 0% 100%` | `212 30% 12%` |
| `--border` | `214 32% 91%` | `217 32% 18%` |
| `--ring` | `18 100% 50%` | `18 100% 58%` |

### Custom Design Tokens

```css
--gradient-primary: linear-gradient(135deg, orange → blue)
--gradient-hero: linear-gradient(135deg, orange → blue → orange)
--gradient-card: linear-gradient(145deg, white → warm cream)
--shadow-soft / --shadow-medium / --shadow-large
--blur-glass: blur(20px)
--transition-smooth: cubic-bezier(0.4, 0, 0.2, 1)
```

### Tailwind Extensions (tailwind.config.ts)

Custom utilities registered:
- `bg-gradient-primary`, `bg-gradient-hero`, `bg-gradient-card`
- `shadow-soft`, `shadow-medium`, `shadow-large`
- `backdrop-blur-glass`
- `ease-smooth`

### Custom Badge Variants

The `badge.tsx` component has custom variants beyond shadcn defaults:

| Variant | Purpose |
|---------|---------|
| `default` | Primary colored badge |
| `secondary` | Muted badge |
| `destructive` | Error/warning badge |
| `outline` | Bordered badge |
| `feature` | Feature highlight (gradient bg) |
| `tech` | Technology/spec badge |
| `glass` | Glassmorphism effect |

### Custom Button Variants

| Variant | Purpose |
|---------|---------|
| `hero` | Primary gradient button |
| `glass` | Glassmorphism button |
| (plus all standard shadcn variants) | |

---

## Data Architecture

All data is **hardcoded** in component files as TypeScript arrays/objects. There is no external data source.

### ICMComparisonTool.tsx — Feature Matrix

```typescript
type Feature = {
  name: string;
  description: string;
  category: "modeling" | "analysis" | "visualization" | "data";
  sewer: boolean;
  flood: boolean;
  ultimate: boolean;
  viewer: boolean;
};
// 20 features across 4 categories
```

**Products defined:**
| Product | Description |
|---------|------------|
| ICM Sewer | Sewer & stormwater networks |
| ICM Flood | 2D surface flooding |
| ICM Ultimate | Complete 4-in-1 suite |
| ICM Viewer | View-only access (FREE) |

**Shortcut commands:** `/ADSK:Sewer`, `/ADSK:Flood`, `/ADSK:Ultimate`, `/ADSK:Viewer`

### PricingCalculator.tsx — Pricing Data

```typescript
// Official Autodesk pricing (2025)
annualSubscription = {
  sewer: $5,498/year,    // ~$539/month (monthly base)
  flood: $7,497/year,    // ~$735/month
  ultimate: $18,003/year // ~$1,765/month
  viewer: FREE
};

// Flex token pricing ($3/token)
flexPricing = {
  sewer: 24 tokens/day ($72/day),
  flood: 31 tokens/day ($93/day),
  ultimate: 75 tokens/day ($225/day)
};

// Discount tiers
annualDiscount: 15%
threeYearDiscount: 25%
perpetualMultiplier: 22-24x monthly
maintenanceRate: 16-18% of perpetual cost
```

### ProjectPlanner.tsx — Project Types

6 project types with recommendation logic:
1. **Urban Drainage** → ICM Sewer (medium complexity)
2. **Flood Risk Assessment** → ICM Flood (high)
3. **Watershed Modeling** → ICM Ultimate (high)
4. **Coastal & Tidal** → ICM Flood (high)
5. **Integrated Systems** → ICM Ultimate (high)
6. **Results Review Only** → ICM Viewer (low)

**Recommendation algorithm:**
- View-only → Viewer
- Both flood AND sewer needs → Ultimate
- Flood-only → Flood
- Sewer-only → Sewer
- 3+ project types → Ultimate
- Watershed → Ultimate

### KnowledgeBase.tsx — Content

- **10 FAQs** with version filtering, tags, and video links
- **8 Tutorials** with step-by-step guides, difficulty levels, estimated times, tips/warnings, and resource links
- **6 Source Code documentation sections** explaining the app's own architecture

### ImplementationGuides.tsx — Technical Content

Three tabs:

**1. Complete Workflows (2 workflows):**
- Urban Flood Risk Study (40-60 hrs, 6 phases)
- Sewer Capacity Assessment (20-30 hrs, 5 phases)

Each step includes: title, description, duration, staff role, tips[], pitfalls[]

**2. Script Library (3 scripts):**
- Batch Results Exporter (Ruby) — exports max depths from scenarios to CSV
- QGIS Flood Map Generator (Python) — converts depth grids to styled shapefiles
- RTC Rule Optimizer (Ruby) — analyzes pump station performance

**3. SWMM Migration Guide (5 phases):**
- Phase 1: Pre-Migration Assessment (1-2 days)
- Phase 2: Import & Initial Conversion (2-4 hours)
- Phase 3: Manual Adjustments (4-8 hours)
- Phase 4: Calibration Verification (1-2 days)
- Phase 5: Documentation & Training (1-2 days)

Each phase has: tasks[], duration, validation criteria[]

### AnalysisExport.tsx — Negotiation Data

**7 negotiation tips** with impact ratings:
| Tip | Impact |
|-----|--------|
| Fiscal Quarter Timing | HIGH — 10-25% savings |
| Volume Discount Thresholds | HIGH — 10-25% at 5/10/20+ seats |
| Sector-Specific Pricing | HIGH — Gov 30-50%, Academic 80-90% |
| Bundle Opportunities | MEDIUM — 15-30% with Civil 3D |
| Flex Token Strategy | MEDIUM — breakeven ~76-81 days |
| Multi-Year Commitments | MEDIUM — 25-30% savings |
| Reseller Competition | MEDIUM — compare multiple quotes |

**Export functions:**
- `generateAnalysisSummary()` → downloads `.txt` file
- `exportComparisonMatrix()` → downloads `.csv` file with full feature matrix + pricing

### QuoteRequestForm.tsx — Lead Form

Collects: name, email, phone, company, team size (1 / 2-5 / 6-10 / 11-20 / 20+), product interest checkboxes, project description, timeline.

**Currently simulated** — no actual form submission. Shows success state on submit.

### VendorResources.tsx — External Links

| Resource | URL |
|----------|-----|
| Free Trial | autodesk.com/products/infoworks-icm/free-trial |
| Product Page | autodesk.com/products/infoworks-icm/overview |
| Documentation | help.autodesk.com/view/IWICMS/ENU/ |
| Video Tutorials | autodesk.com/products/infoworks-icm/learn-training |
| Find a Reseller | autodesk.com/resellers |
| Contact Sales | autodesk.com/company/contact-us |
| Technical Support | autodesk.com/support |
| System Requirements | (autodesk support article) |
| Release Notes | (autodesk help) |
| Community Forums | forums.autodesk.com |
| Learning Hub | autodesk.com/certification |

### Footer.tsx — BobSWMM Collection

Links to sibling apps (currently `#` placeholders):
- ICM Guide, SWMM5 Calculator, Rainfall Tools, Pipe Sizing, Unit Converter, Math Puzzles

Social links: LinkedIn (`robert-dickinson-swmm`), Email (`swmm5@gmail.com`)

---

## Feature Inventory

### Implemented ✅

| Feature | Component | Lines | Status |
|---------|-----------|-------|--------|
| Sticky header with scroll spy | Header.tsx | 98 | Complete |
| Dark/light theme toggle | Header.tsx + next-themes | — | Complete |
| Hero section with background image | Index.tsx | — | Complete |
| Author profile sidebar | ProfileCard.tsx | 50 | Complete |
| Project type needs assessment | ProjectPlanner.tsx | 261 | Complete |
| Feature comparison matrix (20 features) | ICMComparisonTool.tsx | 332 | Complete |
| Needs-based product recommendation | ICMComparisonTool.tsx | — | Complete |
| Shortcut command cards with copy | ICMComparisonTool.tsx | — | Complete |
| Category filtering for features | ICMComparisonTool.tsx | — | Complete |
| Pricing calculator (sub/perpetual) | PricingCalculator.tsx | 534 | Complete |
| Flex token breakeven calculator | PricingCalculator.tsx | — | Complete |
| Usage presets (Occasional/Regular/Heavy) | PricingCalculator.tsx | — | Complete |
| Ultimate vs. separate license comparison | PricingCalculator.tsx | — | Complete |
| Searchable FAQ system (10 items) | KnowledgeBase.tsx | 1030 | Complete |
| Version-filtered tutorials (8 items) | KnowledgeBase.tsx | — | Complete |
| Source code documentation | KnowledgeBase.tsx | — | Complete |
| End-to-end workflow guides | ImplementationGuides.tsx | 749 | Complete |
| Python/Ruby script library | ImplementationGuides.tsx | — | Complete |
| SWMM→ICM migration checklist | ImplementationGuides.tsx | — | Complete |
| Analysis summary export (.txt) | AnalysisExport.tsx | 396 | Complete |
| Feature comparison CSV export | AnalysisExport.tsx | — | Complete |
| 7 vendor negotiation tips | AnalysisExport.tsx | — | Complete |
| Quote request form | QuoteRequestForm.tsx | 241 | Complete |
| Official vendor resource links | VendorResources.tsx | 180 | Complete |
| BobSWMM collection footer | Footer.tsx | 122 | Complete |

### NOT Implemented ❌ (Planned)

| Feature | Priority | Effort |
|---------|----------|--------|
| Dynamic pricing ranges (region/sector/volume) | HIGH | 1-2 weeks |
| Competitive landscape module (PCSWMM, HEC-HMS, XP-SWMM) | HIGH | 1-2 weeks |
| SWMM .inp file parser (client-side) | MEDIUM | 2-4 weeks |
| Implementation ROI calculator | MEDIUM | 1 week |
| AI-powered Decision Engine | LOW | 3-6 months |
| Live performance benchmark database | LOW | 3-6 months |
| Community features | LOW | 3-6 months |
| PDF report generation | MEDIUM | 1 week |
| Video tutorial embeds | LOW | 2-3 days |

---

## Business Logic & Algorithms

### 1. Product Recommendation Engine (ProjectPlanner.tsx)

```
INPUT: Set of selected project types
RULES:
  - view-only only → Viewer
  - has flood + has sewer → Ultimate
  - has integrated systems → Ultimate
  - has watershed → Ultimate
  - 3+ project types → Ultimate
  - flood needs only → Flood
  - sewer/WQ/RTC needs → Sewer
  - SWMM only → Sewer, Flood, or Ultimate
  - fallback → Ultimate
OUTPUT: Recommended product(s) + reason string
```

### 2. Breakeven Calculator (PricingCalculator.tsx)

```
breakevenDays = ceil(annualSubscription / flexCostPerDay)

For usageDays input:
  flexCost = flexCostPerDay × usageDays
  if flexCost < annualSubscription → recommend Flex
  else → recommend Subscription
  savings = abs(annualSubscription - flexCost)
```

Results:
- ICM Sewer breakeven: ~76 days/year
- ICM Flood breakeven: ~81 days/year
- ICM Ultimate breakeven: ~80 days/year

### 3. Pricing Calculator

```
Subscription pricing:
  monthly: monthlyBase × teamSize
  annual: monthlyBase × 12 × (1 - 0.15) × teamSize
  3-year: monthlyBase × 36 × (1 - 0.25) × teamSize

Perpetual pricing:
  oneTime = monthlyBase × perpetualMultiplier
  maintenance = oneTime × maintenanceRate
  total = (oneTime + maintenance) × teamSize
```

### 4. Needs Assessment (ICMComparisonTool.tsx)

Maps 6 user needs to product recommendations:
- Sewer Network Design → sewer needs
- Surface Flood Modeling → flood needs
- River/Channel Modeling → flood needs
- View-Only Access → viewer
- SWMM Compatibility → all products
- Water Quality Analysis → sewer needs

Both sewer + flood needs → Ultimate recommendation.

---

## Content & Domain Knowledge

### Key Facts Embedded in the App

1. **ICM Product Evolution:** ICM Standard was split into ICM Sewer (renamed, price reduced from $7,500 to $5,500) and ICM Flood. ICM Ultimate combines all four modes.

2. **Shortcut Flags:** A single ICM installation can run as different products using command-line flags (`/ADSK:Sewer`, etc.)

3. **SWMM Compatibility:** All ICM versions can open EPA SWMM5 `.inp` files. ICM uses a superset of SWMM's hydraulic engine.

4. **Pricing Context:** Ultimate costs more than Sewer + Flood combined. Value proposition is unified workflow and license flexibility, not cost savings.

5. **Author Authority:** Robert Dickinson — 50+ years in water resources, 20 years at Innovyze/Autodesk, 18,583 LinkedIn followers, 3000+ posts.

### LinkedIn Source Article

The app is based on: ["Eight ICMs in One: ICM Ultimate, Sewer, Flood, Viewer + SWMM"](https://www.linkedin.com/pulse/eight-icms-one-icm-ultimate-sewer-flood-viewer-swmm-robert-dickinson-13bae/)

---

## Known Limitations & Planned Improvements

### Critical Issues (from A- Grade Assessment)

| Issue | Severity | Description |
|-------|----------|-------------|
| **Static pricing** | HIGH | Single price point without regional/volume/sector variations. Gives "false precision." |
| **No competitive context** | HIGH | Ignores PCSWMM, XP-SWMM, HEC-HMS/RAS alternatives. Engineers need market perspective. |
| **Quote form = lead-gen wall** | MEDIUM | Form collects leads but provides zero immediate value. Partially mitigated by AnalysisExport. |
| **Superficial technical depth** | MEDIUM | FAQs are surface-level. Partially addressed by ImplementationGuides. |
| **No model validation** | MEDIUM | Can't verify if a user's SWMM model will import correctly. |
| **Large component files** | LOW | KnowledgeBase (1030 lines) and ImplementationGuides (749 lines) should be refactored. |
| **No backend** | LOW | Forms don't actually submit. No data persistence. |
| **Placeholder links** | LOW | BobSWMM collection links in footer are all `#`. |
| **Video URLs are examples** | LOW | FAQ/tutorial video URLs are placeholder example links. |

### Technical Debt

- `KnowledgeBase.tsx` at 1030 lines — should split into `FAQSection`, `TutorialSection`, `SourceDocsSection`
- `PricingCalculator.tsx` at 534 lines — could extract `BreakevenCalculator` and `FlexTokenTable`
- `ImplementationGuides.tsx` at 749 lines — could extract `WorkflowCard`, `ScriptCard`, `MigrationChecklist`
- Some hardcoded colors remain (e.g., `bg-green-500/10`, `text-red-600`) — should use semantic tokens
- React Query and React Hook Form are installed but unused
- `recharts` is installed but unused (no charts in current UI)
- `RelatedContent.tsx` and `FeatureCard.tsx` exist but are NOT rendered in `Index.tsx`

---

## Roadmap

### Phase 1: Immediate (1-2 Weeks)
- [ ] Dynamic pricing ranges with multipliers for region, sector, volume
- [ ] Competitive landscape module (ICM vs PCSWMM vs HEC-HMS vs XP-SWMM vs QGIS)
- [ ] Replace placeholder video URLs with real Autodesk/community tutorial links
- [ ] PDF export for analysis reports

### Phase 2: Medium-Term (1-2 Months)
- [ ] Client-side SWMM .inp file parser for compatibility checking
- [ ] Implementation ROI calculator (training time, project delivery acceleration)
- [ ] Complete workflow examples with interactive step tracking
- [ ] Refactor large components into smaller, focused modules

### Phase 3: Transformative (3-6 Months)
- [ ] AI-powered Decision Engine (chatbot leveraging Dickinson's expertise patterns)
- [ ] Live performance benchmark database (collaborative user submissions)
- [ ] Community edition pathway (open-source alternatives guidance)
- [ ] Tiered access model (Free → Pro → Enterprise)

---

## Deployment & Environment

| Setting | Value |
|---------|-------|
| **Platform** | Lovable (hosted) |
| **Build** | Vite |
| **Preview URL** | https://id-preview--6393e9bc-85b8-4741-83c8-8e3c4a4a9bac.lovable.app |
| **Published URL** | https://word-image-app-reimagined.lovable.app |
| **Backend** | None (purely client-side) |
| **Auth** | None |
| **Database** | None |
| **CDN** | Lovable default |
| **Custom Domain** | Not configured |

### Environment Variables / Secrets

None. No API keys or secrets are used.

---

## Migration Notes

### Moving to Another Lovable Project

1. Remix the project from Settings
2. All components are self-contained — copy the `src/components/` folder
3. Copy `src/index.css` for design tokens and `tailwind.config.ts` for custom utilities
4. Copy `src/assets/` for images
5. Install same dependencies (see `package.json`)

### Moving to a Non-Lovable Project

1. Clone the repo and run `npm install`
2. The project uses standard Vite + React + TypeScript — no Lovable-specific APIs
3. Remove `lovable-tagger` from `vite.config.ts` plugins
4. All routing is via `react-router-dom` — standard React SPA
5. Theme system uses `next-themes` — ensure `ThemeProvider` wraps the app
6. shadcn/ui components in `src/components/ui/` are standalone and portable

### Key Files for Content Reuse

If you want to reuse the **domain knowledge** in another app without the UI:

| Data Type | Source File | What It Contains |
|-----------|-----------|-----------------|
| Feature matrix | `ICMComparisonTool.tsx` lines 20-68 | 20 features × 4 products with booleans |
| Pricing data | `PricingCalculator.tsx` lines 26-94 | Tiers, monthly rates, discounts, Flex tokens |
| Project types | `ProjectPlanner.tsx` lines 29-84 | 6 project types with recommendations |
| FAQs | `KnowledgeBase.tsx` lines 73-152 | 10 Q&A items with version tags |
| Tutorials | `KnowledgeBase.tsx` lines 154-339 | 8 step-by-step guides |
| Workflows | `ImplementationGuides.tsx` lines 77-209 | 2 end-to-end project workflows |
| Scripts | `ImplementationGuides.tsx` lines 211-363 | 3 Python/Ruby automation scripts |
| Migration guide | `ImplementationGuides.tsx` lines 366-446 | 5-phase SWMM→ICM checklist |
| Negotiation tips | `AnalysisExport.tsx` lines 45-131 | 7 vendor negotiation strategies |
| Vendor links | `VendorResources.tsx` lines 17-89 | Official Autodesk URLs |
| BobSWMM apps | `Footer.tsx` lines 3-10 | Sibling app names/descriptions |

### Extracting Data to JSON

All hardcoded data can be extracted to JSON files for use in other apps. The data structures are clean TypeScript interfaces — convert arrays to JSON and serve from an API or import directly.

---

## Brand Guidelines

| Element | Value |
|---------|-------|
| **Brand Name** | BobSWMM |
| **Sub-brand** | ICM Software Guide |
| **Tagline** | "Part of the BobSWMM Legacy" |
| **Author** | Robert Dickinson |
| **Contact** | swmm5@gmail.com |
| **LinkedIn** | linkedin.com/in/robert-dickinson-swmm |
| **Positioning** | Independent hydraulic modeling platform advisor |
| **Color Identity** | Orange (primary, energy) + Deep Blue (accent, water/trust) |
| **Warm cream background** | Differentiates from typical cold tech UIs |

---

*This handover document was generated on February 12, 2026. For the latest code, always refer to the repository.*
