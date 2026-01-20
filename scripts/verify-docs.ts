import { getDocsTree, getAllDocsPaths } from '../lib/docs';

async function main() {
    console.log('--- Testing File Walker ---');
    try {
        const tree = getDocsTree();
        console.log(`Root nodes found: ${tree.length}`);
        console.log('Sample node:', JSON.stringify(tree[0], null, 2));

        const paths = getAllDocsPaths();
        console.log(`Total pages found: ${paths.length}`);
        if (paths.length > 0) {
            console.log('Sample path:', paths[0]);
        } else {
            console.error('No paths found!');
            process.exit(1);
        }

    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

main();
