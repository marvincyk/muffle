<script lang="ts">
	import { onMount } from "svelte";
	import {
		getDocument,
		GlobalWorkerOptions,
		type PDFDocumentProxy,
	} from "pdfjs-dist/legacy/build/pdf.mjs";
	import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";

	let canvas: HTMLCanvasElement;
	let pageNum = 1;
	let pdfDoc: PDFDocumentProxy | null = null;

	GlobalWorkerOptions.workerSrc = pdfjsWorker;

	async function renderPage(num: number) {
		if (!pdfDoc) return;

		const page = await pdfDoc.getPage(num);
		const viewport = page.getViewport({ scale: 1.5 });
		const context = canvas.getContext("2d");

		if (context) {
			canvas.height = viewport.height;
			canvas.width = viewport.width;

			const renderContext = {
				canvasContext: context,
				viewport: viewport,
			};
			await page.render(renderContext).promise;
		}
	}

	function goToPrevPage() {
		if (pageNum > 1) {
			pageNum--;
			renderPage(pageNum);
		}
	}

	function goToNextPage() {
		if (pdfDoc && pageNum < pdfDoc.numPages) {
			pageNum++;
			renderPage(pageNum);
		}
	}

	onMount(async () => {
		const pdfUrl = "lorem.pdf";
		pdfDoc = await getDocument(pdfUrl).promise;
		renderPage(pageNum);
	});
</script>

<div class="flex justify-center">
	<button on:click={goToPrevPage} class="flex-1 cursor-pointer"></button>
	<canvas bind:this={canvas}></canvas>
	<button on:click={goToNextPage} class="flex-1 cursor-pointer"></button>
</div>
