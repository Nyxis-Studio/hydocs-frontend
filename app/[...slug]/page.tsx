import { getDocBySlug, getAllDocsPaths } from '@/lib/docs';
import { MDXContent } from '@/components/docs/mdx-remote';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{
        slug: string[];
    }>;
}

// Generate static params for all docs
export async function generateStaticParams() {
    const paths = getAllDocsPaths();
    return paths.map((slug) => ({
        slug,
    }));
}

export default async function DocPage({ params }: PageProps) {
    const { slug } = await params;

    try {
        const { meta, content } = await getDocBySlug(slug);

        return (
            <div className="max-w-4xl mx-auto p-8">
                <h1 className="text-4xl font-extrabold mb-4">{meta.title}</h1>
                {meta.description && <p className="text-xl text-gray-500 mb-8">{meta.description}</p>}
                <div className="prose dark:prose-invert max-w-none">
                    <MDXContent source={content} />
                </div>
            </div>
        );
    } catch (e) {
        notFound();
    }
}
