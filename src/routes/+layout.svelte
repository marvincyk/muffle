<script lang="ts">
	import "../app.css";
	import { fade } from "svelte/transition";
	import { page } from "$app/stores";
	import SettingsButton from "$lib/components/SettingsButton.svelte";

	export let data;

	$: isHomePage = $page.route.id === "/";
</script>

{#key data.url}
	<div in:fade={{ duration: 300, delay: 400 }} out:fade={{ duration: 300 }}>
		{#if isHomePage}
			<video
				playsinline
				autoplay
				muted
				loop
				class="object-cover w-screen h-screen fixed top-0 left-0 blur-sm"
			>
				<source src="old-film-grain.mp4" type="video/mp4" />
			</video>
			<slot />
		{:else}
			<div class="navbar bg-base-300">
				<div class="flex-1">
					<a role="button" href="/" class="btn btn-ghost text-xl">muffle</a>
				</div>
				<div class="flex-none">
					<SettingsButton />
				</div>
			</div>
			<div class="p-10">
				<slot />
			</div>
		{/if}
	</div>
{/key}
