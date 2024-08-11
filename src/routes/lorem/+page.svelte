<script lang="ts">
	import { LoremIpsum } from "lorem-ipsum";

	const lorem = new LoremIpsum({}, "plain", "\n\n");
</script>

<p class="text-justify p-10 lg:p-20 leading-loose whitespace-pre-line">
	{lorem.generateParagraphs(100)}
</p>
