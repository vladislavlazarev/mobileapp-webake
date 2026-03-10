# WE BAKE — Courier App Prototype

Interactive prototype of the courier mobile application for the WE BAKE bread delivery service.  
Built with **Vite + React**.

## Screens

| Screen | Description |
|--------|-------------|
| **Login** | Username + password authentication |
| **Deliveries** | Daily list grouped by time slots, week day picker |
| **Delivery Detail** | Customer info, items, instructions, navigation |
| **Complete Delivery** | Photo upload + status (delivered / failed with reason) |
| **Profile** | Courier info, stats, delivery history, sign out |
| **Delivery History** | Full list of past deliveries with expandable details and photo viewer |
| **Earnings** | v2 popup — coming soon |

## Setup & Run

```bash
git clone <your-repo-url>
cd webake-courier
npm install
npm run dev
```

## Deploy to Vercel

### Option A: Git integration
1. Push to GitHub
2. [vercel.com](https://vercel.com) → New Project → Import repo
3. Framework: Vite (auto-detected) → Deploy

### Option B: CLI
```bash
npm i -g vercel
vercel
```

## Responsive Behavior

- **Mobile (≤480px)**: Full-screen native feel — no phone frame, tab bar fixed to bottom with safe-area support
- **Desktop (>480px)**: Centered phone mockup (390×844) with realistic device frame

## Tech Stack

- Vite 6
- React 18
- Zero UI libraries — custom components
- Google Fonts (Fraunces + Plus Jakarta Sans)
