# Quickstart: Hytale Docs Site

**Feature**: `001-hytale-docs-site`

## Prerequisites
- Node.js 18+
- npm / yarn / pnpm

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Access at `http://localhost:3000`.

3. **Build Static Site**:
   ```bash
   npm run build
   ```
   Outputs to `out/` (requires `output: 'export'` in next.config.js).

## Project Structure

- `app/`: Next.js App Router pages
- `components/`: React components (shadcn/ui + custom)
- `lib/`: Utilities (doc parsing, tree generation)
- `docs/`: Source markdown content (symlinked or copied)
