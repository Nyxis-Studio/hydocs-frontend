import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const DOCS_DIRECTORY = path.join(process.cwd(), 'docs');

export type DocMetadata = {
    title: string;
    description?: string;
    [key: string]: any;
};

export type FileNode = {
    name: string;
    path: string;
    type: 'file' | 'directory';
    children?: FileNode[];
    metadata?: DocMetadata;
};

export function getDocsTree(dir: string = DOCS_DIRECTORY, relativePath: string = ''): FileNode[] {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    const nodes: FileNode[] = entries
        .filter(entry => !entry.name.startsWith('.') && (entry.isDirectory() || entry.name.endsWith('.md')))
        .map(entry => {
            const entryPath = path.join(dir, entry.name);
            const entryRelativePath = path.join(relativePath, entry.name);

            if (entry.isDirectory()) {
                return {
                    name: entry.name,
                    path: entryRelativePath,
                    type: 'directory',
                    children: getDocsTree(entryPath, entryRelativePath)
                };
            } else {
                let title = entry.name.replace(/\.md$/, '');
                let metadata: DocMetadata = { title };

                try {
                    const fileContent = fs.readFileSync(entryPath, 'utf8');
                    const { data } = matter(fileContent);
                    if (data.title) metadata.title = data.title;
                    metadata = { ...metadata, ...data };
                } catch (e) {
                    console.warn(`Failed to read metadata for ${entryPath}`);
                }

                return {
                    name: entry.name,
                    path: entryRelativePath,
                    type: 'file',
                    metadata
                };
            }
        });

    return nodes.sort((a, b) => {
        if (a.type === b.type) return a.name.localeCompare(b.name);
        return a.type === 'directory' ? -1 : 1;
    });
}

export async function getDocBySlug(slug: string[]) {
    const realSlug = slug.join('/');
    const fullPath = path.join(DOCS_DIRECTORY, `${realSlug}.md`);

    let targetPath = fullPath;
    if (!fs.existsSync(targetPath)) {
        const dirIndex = path.join(DOCS_DIRECTORY, realSlug, '_index.md');
        if (fs.existsSync(dirIndex)) {
            targetPath = dirIndex;
        } else {
            throw new Error(`Doc not found: ${realSlug}`);
        }
    }

    const fileContents = fs.readFileSync(targetPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug: realSlug,
        meta: data as DocMetadata,
        content: content
    };
}

export function getAllDocsPaths(dir: string = DOCS_DIRECTORY, relativePath: string = ''): string[][] {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let paths: string[][] = [];

    entries.forEach(entry => {
        if (entry.name.startsWith('.')) return;
        const entryRelativePath = path.join(relativePath, entry.name);
        if (entry.isDirectory()) {
            paths.push(...getAllDocsPaths(path.join(dir, entry.name), entryRelativePath));
        } else if (entry.name.endsWith('.md')) {
            const cleanPath = entryRelativePath.replace(/\.md$/, '');
            paths.push(cleanPath.split('/'));
        }
    });
    return paths;
}
