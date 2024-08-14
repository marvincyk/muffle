export async function getNoiseLevel(): Promise<() => number> {
	const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

	const audioContext = new window.AudioContext();

	const analyser = audioContext.createAnalyser();

	const microphone = audioContext.createMediaStreamSource(stream);
	microphone.connect(analyser);

	analyser.fftSize = 512;

	const frequencies = new Uint8Array(analyser.frequencyBinCount);

	return function checkNoiseLevel() {
		analyser.getByteFrequencyData(frequencies);
		let sum = 0;
		for (const val of frequencies) sum += val;
		return sum / frequencies.length;
	};
}
