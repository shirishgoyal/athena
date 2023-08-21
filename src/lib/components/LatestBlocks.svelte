<script>
	export let latestBlocks;
</script>

<div class="table-container">
	<!-- Native Table Element -->
	<table class="table table-hover">
		<thead>
			<tr>
				<th colspan="3">Latest Blocks</th>
			</tr>
		</thead>
		<tbody>
			{#each latestBlocks as row, i}
				<tr>
					<td>
						<div class="flex flex-row align-items-center gap-3">
							<div
								class="flex h-8 w-8 items-center justify-center text-muted rounded p-6 bg-surface-700"
							>
								<i class="fa-solid fa-cube fa-xl text-surface-400" />
							</div>
							<div class="flex flex-col align-items-center sm:align-items-start gap-1">
								<a class="text-base" href="/block/{row.block.number}">{row.block.number}</a>
								<div class="text-sm text-surface-400">{row.block.timestamp}</div>
							</div>
						</div>
					</td>
					<td
						><div class="flex flex-col align-items-center sm:align-items-start gap-1">
							<div class="text-base max-w-xs whitespace-nowrap truncate ...">
								Miner: <a href="/address/{row.block.feeRecipient}">{row.block.feeRecipient}</a>
							</div>
							<div class="text-sm text-surface-400">
								<a href="/txns?block={row.block.number}">{row.block.transactionsCount} txns</a> in 12
								secs
							</div>
						</div></td
					>
					<td>{row.block.blockRewardEth}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
