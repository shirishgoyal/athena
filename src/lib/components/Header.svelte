<script>
	import { page } from '$app/stores';
	import { AppBar, popup } from '@skeletonlabs/skeleton';
</script>

<!-- App Bar -->
<AppBar padding="px-4 py-2">
	<svelte:fragment slot="lead">
		<strong class="text-xl uppercase">Athena</strong>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<!-- <div class="relative hidden lg:block">
	
			<button
				class="btn hover:variant-soft-primary"
				use:popup={{ event: 'click', target: 'features' }}
			>
				<span>Blockchain</span>
				<i class="fa-solid fa-caret-down opacity-50" />
			</button>
		
			<div class="card p-4 w-60 shadow-xl" data-popup="features">
				<nav class="list-nav">
					<ul>
						<li>
							<a href="/">
								<span class="w-6 text-center"><i class="fa-solid fa-home" /></span>
								<span>Homepage</span>
							</a>
						</li>
						<li>
							<a href="/docs/get-started">
								<span class="w-6 text-center"><i class="fa-solid fa-book" /></span>
								<span>Documentation</span>
							</a>
						</li>
						<li>
							<a href="/blog">
								<span class="w-6 text-center"><i class="fa-solid fa-bullhorn" /></span>
								<span>Blog</span>
							</a>
						</li>
						<li>
							<a href="https://store.skeleton.dev" target="_blank">
								<span class="w-6 text-center"><i class="fa-solid fa-shopping-cart" /></span>
								<span>Skeleton Store</span>
							</a>
						</li>
						<hr class="!my-4" />
						<li>
							<a href="/utilities/codeblocks">
								<span class="w-6 text-center"><i class="fa-solid fa-screwdriver-wrench" /></span>
								<span>Utilities</span>
							</a>
						</li>
					</ul>
				</nav>
				<div class="arrow bg-surface-100-800-token" />
			</div>
			 <a
				aria-current={$page.url.pathname === '/blockchain' ? 'page' : undefined}
				class="btn btn-sm hover:variant-soft-surface"
				href="/blockchain"
			>
				Blockchain
			</a>
			<a class="btn btn-sm hover:variant-soft-surface" href="/tokens"> Tokens </a>
			<a class="btn btn-sm hover:variant-soft-surface" href="/nft"> NFTs </a>
		</div> -->
	</svelte:fragment>
</AppBar>
