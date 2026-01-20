# Data Model: Hytale Documentation Site

**Feature**: `001-hytale-docs-site`

## Core Entities

### FileNode
Represents a node in the navigation tree (file or directory).

```typescript
type FileNode = {
  /** Display name of the file or folder */
  name: string;
  /** Relative path from docs root (e.g., "com/hypixel/hytale/Main.md") */
  path: string;
  /** Type of node */
  type: 'file' | 'directory';
  /** Children nodes (if directory) */
  children?: FileNode[];
  /** Metadata extracted from file content (if file) */
  metadata?: DocMetadata;
}
```

### DocMetadata
Metadata associated with a specific markdown file.

```typescript
type DocMetadata = {
  /** extracted from first H1 or filename */
  title: string;
  /** extracted description or first paragraph */
  description?: string;
  /** full raw content (for search indexing) */
  content?: string; 
}
```

## State Management

### Navigation State
- **Active Path**: The currently viewed document path.
- **Expanded Nodes**: Set of directory paths currently expanded in the sidebar.

```typescript
interface NavState {
  activePath: string | null;
  expandedPaths: Set<string>;
  toggleExpand: (path: string) => void;
}
```
