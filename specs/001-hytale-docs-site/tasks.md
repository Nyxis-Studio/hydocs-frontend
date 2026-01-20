---
description: "Implementation tasks for Hytale Documentation Site"
---

# Tasks: Hytale Documentation Site

**Input**: Design documents from `/specs/001-hytale-docs-site/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md
**Tests**: Component tests and E2E tests are OPTIONAL (not strictly requested, but good practice).

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Initialize Next.js project with TypeScript and Tailwind
- [x] T002 Install shadcn/ui and add button, sheet, command components
- [x] T003 [P] Install `next-mdx-remote`, `gray-matter`, `lucide-react`
- [x] T004 [P] Configure `next.config.js` for static export
- [x] T005 [P] Setup specific fonts/typography in `globals.css`
- [x] T006 [P] Create project folder structure (`lib/`, `components/docs/`, `styles/`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure for data loading and parsing

**⚠️ CRITICAL**: Must function before UI can render anything.

- [x] T007 Implement file system walker in `lib/docs.ts` to generate FileNode tree
- [x] T008 Implement MDX parser in `lib/docs.ts` using `next-mdx-remote`
- [x] T009 Implement `getDocBySlug` and `getAllDocs` in `lib/docs.ts`
- [x] T010 [P] Create standard Page Layout with `SidebarProvider` context
- [x] T011 Verify `docs` folder reads correctly (test script)

**Checkpoint**: `lib/docs.ts` can successfully read and parse the `docs/` folder structure.

---

## Phase 3: User Story 1 - Browse Documentation (Priority: P1) 🎯 MVP

**Goal**: Users can navigate the file tree and view markdown content.

**Independent Test**: Verify file tree renders in sidebar and clicking a file loads the content.

### Implementation for User Story 1

- [x] T012 [US1] Create `Sidebar` component in `components/docs/sidebar.tsx`
- [x] T013 [US1] Implement recursive tree rendering for `FileNode` in Sidebar
- [x] T014 [US1] Create `MDXContent` component in `components/docs/mdx-remote.tsx`
- [x] T015 [US1] Create dynamic route `app/[...slug]/page.tsx`
- [x] T016 [US1] Implement `generateStaticParams` to build paths for all docs
- [x] T017 [US1] Integrate `Sidebar` and `MDXContent` into layout/page
- [x] T018 [US1] Add basic prose styling (headers, lists, code blocks)

**Checkpoint**: Full browsing capability is functional.

---

## Phase 4: User Story 2 - Search Documentation (Priority: P1)

**Goal**: Users can quickly find files by name.

**Independent Test**: Typing in search bar filters results and navigates to file.

### Implementation for User Story 2

- [x] T019 [US2] Create search index generator (in `lib/docs.ts` or separate script)
- [x] T020 [US2] Create `SearchDialog` component using shadcn `Command`
- [x] T021 [US2] Integrate search trigger (CMD+K / Button) in Sidebar/Navbar
- [x] T022 [US2] Implement search logic (filtering `FileNode` tree or flat index)
- [x] T023 [US2] Verify navigation from search results

**Checkpoint**: Search is functional.

---

## Phase 5: User Story 3 - Mobile Reading (Priority: P3)

**Goal**: Usable experience on small screens.

**Independent Test**: Sidebar is hidden by default and accessible via toggle.

### Implementation for User Story 3

- [x] T024 [US3] Update Layout to support mobile responsiveness
- [x] T025 [US3] Implement `Sheet` (Drawer) for mobile sidebar
- [x] T026 [US3] Add hamburger menu toggle in Navbar
- [x] T027 [US3] Ensure Sidebar closes on route change (mobile)

**Checkpoint**: Mobile responsiveness verified.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements, Styling, and Performance.

- [x] T028 [P] Add syntax highlighting (rehype-highlight/prism) to MDX
- [x] T029 [P] Implement Dark Mode toggle
- [x] T030 [P] Improve typography and spacing for long content
- [x] T031 [P] Handle broken links / 404 pages
- [x] T032 Verify static build output (`npm run build`) in `out/`

---

## Dependencies & Execution Order

- **Phase 1 & 2** are strictly sequential.
- **Phase 3 (Browse)** must complete before Phase 5 (Mobile).
- **Phase 4 (Search)** can be done in parallel with Phase 3/5 after Phase 2 is done.
