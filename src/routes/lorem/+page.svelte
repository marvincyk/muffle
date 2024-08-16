<script lang="ts">
	import { LoremIpsum } from "lorem-ipsum";
	import { onMount } from "svelte";
	import { getNoiseLevel } from "$lib/utils/noise";

	const lorem = new LoremIpsum({}, "plain", "\n\n");
	let noiseLevel = 0;
	let checkNoiseLevel: () => number;

	onMount(async () => {
		checkNoiseLevel = await getNoiseLevel();

		setInterval(() => {
			noiseLevel = checkNoiseLevel();
		}, 100);
	});

	$: filterStyle = `filter: blur(${noiseLevel / 10}px)`;
</script>

<div style={filterStyle}>
	<p class="text-justify leading-loose whitespace-pre-line transition-all">
		{lorem.generateParagraphs(100)}
	</p>
</div>
