import { MDXRemote } from 'next-mdx-remote/rsc';
import React from 'react';
import Link from 'next/link';
import rehypeHighlight from 'rehype-highlight';

const components = {
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4" {...props} />
    ),
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-4 mt-8" {...props} />
    ),
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4 mt-6" {...props} />
    ),
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />
    ),
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />
    ),
    li: (props: React.HTMLAttributes<HTMLLIElement>) => (
        <li className="" {...props} />
    ),
    blockguid: (props: React.HTMLAttributes<HTMLElement>) => (
        <blockquote className="mt-6 border-l-2 pl-6 italic" {...props} />
    ),
    code: (props: React.HTMLAttributes<HTMLElement>) => (
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" {...props} />
    ),
    pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
        <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4" {...props} />
    ),
    a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
        const isInternal = href && (href.startsWith('/') || href.startsWith('#'));
        if (isInternal) {
            return (
                <Link href={href} className="font-medium text-primary underline underline-offset-4" {...props}>
                    {children}
                </Link>
            );
        }
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-4" {...props}>
                {children}
            </a>
        );
    },
};

interface MDXContentProps {
    source: string;
}

export function MDXContent({ source }: MDXContentProps) {
    return (
        <MDXRemote
            source={source}
            components={components}
            options={{
                mdxOptions: {
                    rehypePlugins: [rehypeHighlight]
                }
            }}
        />
    );
}
