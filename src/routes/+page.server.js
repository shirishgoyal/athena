import { error } from '@sveltejs/kit';

import { SDK } from "$lib/eth";

const sdk = new SDK();

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const latestBlocks = await sdk.getLatestXBlocks(5);

    return {
        latestBlocks
    };

    throw error(404, 'Not found');
}
