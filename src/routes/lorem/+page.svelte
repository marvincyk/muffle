<script lang="ts">
	import { onMount } from "svelte";
	import { getNoiseLevel } from "$lib/utils/noise";
	import PdfViewer from "$lib/components/PDFViewer.svelte";

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
	<PdfViewer />
</div>
