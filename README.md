# Feature Flag Demo

A standalone React app demonstrating the [feature-flag-system](https://github.com/victoralfonsoperez/feature-flag-system) SDK.

## What it demonstrates

### Runtime Flags (via SDK)
- **Theme flag** — switches between a default and "neon" card style
- **Dashboard layout flag** — toggles between classic stacked cards and a new grid + chart layout
- Uses `FlagProvider` and `useFlag` from `@victoralfonsoperez/feature-flags-sdk`

### Build-Time Flags (via Vite `define`)
- **Premium Analytics** — conditionally included at build time; dead code is tree-shaken in production
- **Beta Banner** — warning banner shown only when the flag is enabled
- Flags are fetched from the API during `vite build` and baked into the bundle

## Setup

### Prerequisites
- Node.js 18+
- A GitHub personal access token with `read:packages` scope (for the SDK)

### Install

```bash
# Authenticate to GitHub Packages (one-time)
echo "//npm.pkg.github.com/:_authToken=YOUR_TOKEN" >> ~/.npmrc

# Install dependencies
npm install
```

### Run (development)

```bash
npm run dev
```

The app works without the feature-flag API running — it uses sensible defaults.

To connect to a live API:

```bash
VITE_API_URL=http://localhost:3100 npm run dev
```

### Build (production)

```bash
# Build-time flags are fetched from the API during build
VITE_API_URL=https://your-api.example.com npm run build

# Preview the production build
npm run preview
```

## Flags used

| Flag | Type | Values | Effect |
|------|------|--------|--------|
| `theme` | Runtime | `"default"`, `"neon"` | Switches card styling |
| `new_dashboard` | Runtime | `"true"`, `"false"` | Toggles dashboard layout |
| `enable_analytics` | Build-time | `"true"`, `"false"` | Includes/excludes analytics panel |
| `enable_beta_banner` | Build-time | `"true"`, `"false"` | Shows/hides beta warning |
