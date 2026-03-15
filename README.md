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

## Live Demo

https://kanary-demo.netlify.app/

## Setup

### Prerequisites
- Node.js 18+
- A GitHub personal access token (classic) with `read:packages` scope (for installing the SDK from GitHub Packages)

### Install

The SDK is published to GitHub Packages. The `.npmrc` in this repo is already configured to reference a `GH_PACKAGES_TOKEN` environment variable:

```bash
# Set your GitHub PAT (read:packages scope)
export GH_PACKAGES_TOKEN=ghp_your_token_here

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

## Deployment (Netlify)

When deploying to Netlify (or any hosting provider), set the following environment variables under **Site settings > Environment variables**:

| Variable | Required | Description |
|---|---|---|
| `GH_PACKAGES_TOKEN` | Yes | GitHub PAT (classic) with `read:packages` scope. Required to install the SDK from GitHub Packages during the build. |
| `VITE_API_URL` | Yes | Base URL of the Flag Service API (e.g., `https://kanary-api.onrender.com`). **Do not include `/api`** — the SDK appends it automatically. If missing, the app defaults to `http://localhost:3100` and flags will silently fall back to defaults. |
| `VITE_SDK_API_KEY` | Yes | API token created in the [Kanary dashboard](https://kanary-feature-flags.netlify.app/) for authenticating with the resolve endpoint. Create an app-scoped token for isolation. |

> **Important:** All `VITE_*` variables are baked into the bundle at build time. After adding or changing them, you must trigger a new deploy for the changes to take effect.

### Netlify build settings

| Setting | Value |
|---|---|
| **Build command** | `npm run build` |
| **Publish directory** | `dist` |

## Flags used

| Flag | Type | Values | Effect |
|------|------|--------|--------|
| `theme` | Runtime | `"default"`, `"neon"` | Switches card styling |
| `new_dashboard` | Runtime | `"true"`, `"false"` | Toggles dashboard layout |
| `enable_analytics` | Build-time | `"true"`, `"false"` | Includes/excludes analytics panel |
| `enable_beta_banner` | Build-time | `"true"`, `"false"` | Shows/hides beta warning |
