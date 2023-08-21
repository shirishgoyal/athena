<script>
	import { timeDifference } from '$lib/time';
	import { hex_to_ascii } from '$lib/utils';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<div class="container h-full flex">
	<div class="flex flex-col p-6">
		<h1 class="h4 mb-4">
			Block <span class="text-surface-400 font-normal">#{data.block.number}</span>
		</h1>

		<div class="card p-4 mb-4">
			<div class="grid grid-cols-[20%_80%] gap-2">
				<div>Status</div>
				<div>TODO</div>
				<div>Timestamp</div>
				<div>
					<i class="fa-solid fa-clock mr-1" />{timeDifference(data.block.timestamp)} | {Date(
						data.block.timestamp
					)}
				</div>
				<div>Transactions</div>
				<div>{data.block.transactionsCount} txns. in block</div>
			</div>

			<hr class="opacity-75 my-5" />

			<div class="grid grid-cols-[20%_80%] gap-2">
				<div>Hash</div>
				<div class="truncate ...">{data.block.hash}</div>
				<div>Parent Hash</div>
				<div class="truncate ...">{data.block.parentHash}</div>
				<div>State Root</div>
				<div>xxx</div>
				<div>Withdrawals Root</div>
				<div>xxx</div>
				<div>Nonce</div>
				<div>{data.block.nonce}</div>
			</div>
		</div>

		<div class="card p-4 mb-4">
			<div class="grid grid-cols-[20%_80%] gap-2">
				<div>Miner</div>
				<div>
					{hex_to_ascii(data.block.extraData)}
					<span class="text-surface-400 font-normal">{data.block.miner}</span>
				</div>
				<div>Block Reward</div>
				<div>
					{data.block.blockRewardEth} (Total Miner Tips - Burnt Fees)
				</div>
				<div>Difficulty</div>
				<div>{data.block.difficulty}</div>
			</div>
		</div>

		<div class="card p-4 mb-4">
			<div class="grid grid-cols-[20%_80%] gap-2">
				<div>Gas Used</div>
				<div>{data.block.gasUsed.toLocaleString()} ({data.block.gasUsedPercent}%)</div>
				<div>Gas Limit</div>
				<div>{data.block.gasLimit.toLocaleString()}</div>
				<div>Base Fee Per Gas</div>
				<div>
					{data.block.baseFeePerGasEth}
					<span class="text-surface-400 font-normal">({data.block.baseFeePerGasGwei})</span>
				</div>
				<div>Burnt Fees</div>
				<div>
					<i class="fa-solid fa-fire mr-1 text-warning-500" />
					{data.block.burntFeesEth}
				</div>
				<div>Total Miner Tips</div>
				<div>
					<i class="fa-solid fa-coins mr-1 text-success-500" />
					{data.block.totalMinerTipsEth}
				</div>
			</div>
		</div>
	</div>
</div>
