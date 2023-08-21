<script>
	import LatestBlocks from '$lib/components/LatestBlocks.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>Athena</title>
	<meta name="description" content="Ethereum Block Explorer" />
</svelte:head>

<div class="container h-full flex">
	<div class="flex flex-col p-6">
		<LatestBlocks latestBlocks={data.latestBlocks} />
	</div>
</div>
