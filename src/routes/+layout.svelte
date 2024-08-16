<script lang="ts">
	import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
	import "../app.css";
	import { fade } from "svelte/transition";
	import { page } from "$app/stores";

	export let data;

	$: shouldShowBreadcrumbs = $page.route.id !== "/";
</script>

{#key data.url}
	<div class="p-10 lg:p-20" in:fade={{ duration: 300, delay: 400 }} out:fade={{ duration: 300 }}>
		{#if shouldShowBreadcrumbs}
			<Breadcrumbs class="absolute top-4" />
		{/if}
		<slot />
	</div>
{/key}
