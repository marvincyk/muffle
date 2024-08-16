<script lang="ts">
	import { page } from "$app/stores";
	import { derived } from "svelte/store";
	import _ from "lodash";

	const breadcrumbs = derived(page, ($page) => {
		const segments = $page.route.id?.split("/").filter(Boolean);
		return (
			segments?.map((segment, index) => ({
				name: _.capitalize(segment),
				path: "/" + segments.slice(0, index + 1).join("/"),
			})) ?? []
		);
	});
</script>

<nav class={`breadcrumbs text-sm ${$$props.class}`}>
	<ul>
		<li>
			<a href="/">Home</a>
		</li>
		{#each $breadcrumbs as breadcrumb (breadcrumb.path)}
			<li>
				{#if $breadcrumbs.indexOf(breadcrumb) === $breadcrumbs.length - 1}
					<span>{breadcrumb.name}</span>
				{:else}
					<a href={breadcrumb.path}>
						{breadcrumb.name}
					</a>
				{/if}
			</li>
		{/each}
	</ul>
</nav>
