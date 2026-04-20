# SmartLogix — Transport OS Admin Panel

A production-grade React.js dashboard for fleet and logistics management.

## Project Structure

```
smartlogix/
├── public/
│   └── index.html              # HTML shell with Google Fonts
├── src/
│   ├── data/
│   │   └── mockData.js         # All mock data (drivers, trucks, trips, etc.)
│   ├── utils/
│   │   └── helpers.js          # fmt(), STATUS_MAP constants
│   ├── components/
│   │   ├── ui/
│   │   │   └── StatusBadge.jsx # Reusable StatusBadge + Rating components
│   │   └── layout/
│   │       ├── Sidebar.jsx     # Navigation sidebar with sections & badges
│   │       └── Header.jsx      # Top bar: page title, search, notifications
│   ├── pages/
│   │   ├── Dashboard.jsx       # Live stats, charts, pending actions
│   │   ├── Trips.jsx           # Trip table with create/detail modals
│   │   ├── Tracking.jsx        # GPS map + active trip details
│   │   ├── Drivers.jsx         # Driver table with add/view modals
│   │   ├── Fleet.jsx           # Fleet grid cards by status
│   │   ├── Marketplace.jsx     # Load board + post load form
│   │   ├── Expenses.jsx        # Expense table, approval queue, charts
│   │   ├── Customers.jsx       # Customer table with plan badges
│   │   ├── Analytics.jsx       # KPI cards, revenue trend, driver stats
│   │   ├── Billing.jsx         # Invoices table + subscription plans
│   │   └── Settings.jsx        # Company profile, notifications, integrations
│   ├── App.jsx                 # Root component with page-level routing
│   ├── index.js                # React DOM entry point
│   └── index.css               # Global CSS variables, utility classes, themes
└── package.json
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Tech Stack

- **React 18** — UI framework
- **Recharts** — Charts (Line, Bar, Area, Pie)
- **CSS Variables** — Theming (dark mode by default)
- **Google Fonts** — Syne (headings) + DM Sans (body)

## Features

| Page | Features |
|------|---------|
| Dashboard | Live stats, revenue/fleet/trip charts, pending actions |
| Trips | Filter by status, create trip modal, trip detail modal |
| GPS Tracking | Live map, active trip list, trip detail bar |
| Drivers | Driver table, add driver, driver profile modal |
| Fleet | Fleet grid cards, status filters, maintenance info |
| Marketplace | Load board, bid counts, post load form |
| Expenses | Approval queue, expense charts, export CSV |
| Customers | Customer table, plan badges, shipment values |
| Analytics | KPI cards, area chart, route performance, driver stats |
| Billing | Invoice table, subscription plan breakdown |
| Settings | Company profile form, notification toggles, API integrations |

## Extending

To add a new page:
1. Create `src/pages/YourPage.jsx`
2. Add it to `PAGE_MAP` in `src/App.jsx`
3. Add a nav item to `NAV_ITEMS` in `src/components/layout/Sidebar.jsx`
