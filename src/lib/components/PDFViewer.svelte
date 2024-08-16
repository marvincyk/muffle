<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import {
		getDocument,
		GlobalWorkerOptions,
		type PDFDocumentProxy,
	} from "pdfjs-dist/legacy/build/pdf.mjs";
	import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";

	let pdfDoc: PDFDocumentProxy | null = null;
	let pages: number[] = [];

	GlobalWorkerOptions.workerSrc = pdfjsWorker;

	async function renderPage(num: number, canvas: HTMLCanvasElement) {
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

	onMount(async () => {
		const pdfUrl = "lorem.pdf";
		pdfDoc = await getDocument(pdfUrl).promise;
		const numPages = pdfDoc.numPages;

		pages = Array.from({ length: numPages }, (_, i) => i + 1);

		requestAnimationFrame(() => {
			pages.forEach((page) => {
				const canvas = document.querySelector(`#page-${page}`) as HTMLCanvasElement;
				if (canvas) {
					renderPage(page, canvas);
				}
			});
		});
	});

	onDestroy(() => {
		pages.forEach((page) => {
			const canvas = document.querySelector(`#page-${page}`);
			if (canvas) {
				canvas.remove();
			}
		});
	});
</script>

<div class="flex flex-col gap-4 p-4 overflow-auto">
	{#each pages as page (page)}
		<canvas id={`page-${page}`} class="mb-4 w-full"></canvas>
	{/each}
</div>
