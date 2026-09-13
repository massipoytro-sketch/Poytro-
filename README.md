# GainiRen Rewards Platform

This branch is the new mobile-first frontend architecture for GainiRen.

## Design direction
Dark premium rewards dashboard with purple/blue neon accents, desktop sidebar, mobile bottom navigation, reward hero, balance cards, earning categories, activity, referrals, store, withdrawal and support surfaces.

## Architecture
- `src/app` — application shell and routing state
- `src/components` — reusable navigation, dashboard and page components
- `src/data` — temporary UI-only mock data
- `src/styles` — tokens, global rules, layout, components and responsive rules
- `src/services` — reserved for the existing backend/database integration phase

The current data is presentation-only. No database schema is changed by this redesign.
The Admin system remains separate.
