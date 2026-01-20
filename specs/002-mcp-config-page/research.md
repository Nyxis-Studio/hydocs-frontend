# Research: MCP Configuration Page
 Feature: `002-mcp-config-page` | Status: Complete

## Research Goals
- Determine best way to build interactive snippet viewer in Next.js Static Export.
- Validate component architecture for client-side interactivity.

## Findings

### 1. Interactive Viewer in Static Site
**Decision**: Use "Island Architecture" pattern where the Page is a Server Component (static HTML) and the Viewer is a Client Component (`'use client'`).

**Rationale**:
- Next.js 14+ app router defaults to Server Components.
- We need interactivity (tabs, toggles) which requires JS.
- Static Export (`output: 'export'`) works fully with Client Components; they are hydrated on the client.
- This creates the requested "cacheable" page while keeping interactivity.

### 2. Configuration Data Storage
**Decision**: Store configuration snippets in a dedicated TypeScript file (`lib/mcp-data.ts`) as constants.

**Rationale**:
- No need for dynamic DB calls.
- Type-safety (autocompletion, validation).
- Easy to update by editing a single file.
- Bundled directly into the build for zero-latency access.

### 3. Copy Functionality
**Decision**: Use `navigator.clipboard.writeText` with simple state for "Copied!" feedback.

**Rationale**:
- Standard Web API, no external heavy lib needed.
