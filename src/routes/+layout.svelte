<script lang="ts">
	import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
	import "../app.css";
	import { fade } from "svelte/transition";
	import { page } from "$app/stores";

	export let data;

	$: isHomePage = $page.route.id === "/";
</script>

{#key data.url}
	<div in:fade={{ duration: 300, delay: 400 }} out:fade={{ duration: 300 }}>
		{#if isHomePage}
			<slot />
		{:else}
			<div class="navbar bg-base-300">
				<a role="button" href="/" class="btn btn-ghost text-xl">muffle</a>
			</div>
			<div class="p-10">
				<Breadcrumbs />
				<slot />
			</div>
		{/if}
	</div>
{/key}
