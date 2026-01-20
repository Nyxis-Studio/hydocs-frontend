# Research: Hytale Documentation Site

**Feature**: `001-hytale-docs-site`  
**Date**: 2026-01-15

## Decisions & Rationale

### 1. Framework: Next.js + shadcn/ui
- **Decision**: Use Next.js 14+ (App Router) with shadcn/ui components.
- **Rationale**: User requested. Provides robust static site generation (SSG) capabilities and a high-quality, customizable UI component library.
- **Alternatives**: Sphinx, Docusaurus (Standard for docs, but user specifically asked for Next.js app to learn/customize).

### 2. Markdown Parsing: `next-mdx-remote`
- **Decision**: Use `hashicorp/next-mdx-remote` for rendering.
- **Rationale**: User specific request. Allows flexible loading of MDX content from local file system without heavy webpack configuration.
- **Alternatives**: `contentlayer` (Deprecated/Unmaintained), `mdx-bundler`.

### 3. Build-Time Indexing
- **Decision**: Generate a `structure.json` or equivalent navigation tree at build time.
- **Rationale**: `docs` folder structure needs to be mapped to sidebar navigation. Traversal should happen once during build (`generateStaticParams` / `getStaticProps` equivalent) rather than at runtime.
- **Strategy**: 
  - Script/Function to recursively walk `docs` dir.
  - Extract metadata (title from frontmatter or filename).
  - Generate nested object representing tree.

## Technical Context Analysis

### The `docs` Directory
- **Location**: `/docs`
- **Structure**: Needs exploration (Action: `list_dir docs`).
- **Content**: Markdown files (`.md`).
- **Assets**: Images likely co-located or in `assets` folder.

### Needs Clarification
- **Frontmatter**: Do files have frontmatter (title, weight, etc.)?
- **Images**: How are images referenced? Relative paths?
