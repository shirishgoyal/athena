import { error } from '@sveltejs/kit';

import { SDK } from "$lib/eth";

const sdk = new SDK();

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const block = await sdk.getBlock(parseInt(params.blockNum));

    return {
        block
    };

    throw error(404, 'Not found');
}