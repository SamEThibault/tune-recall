export function setupAudioProcessing(stream: MediaStream): {
  audioContext: AudioContext;
  analyser: AnalyserNode;
} {
  const audioContext = new AudioContext();

  const source = audioContext.createMediaStreamSource(stream);
  const analyser = audioContext.createAnalyser();
  const biquadFilter = audioContext.createBiquadFilter();

  // Number of audio samples (higher means more latency so I think 2048 is a good median)
  analyser.fftSize = 2048;

  // Lowest standard guitar frequency is E2 at 82.41 Hz (gave a ~15 buffer)
  biquadFilter.type = 'highpass';
  biquadFilter.frequency.value = 70;
  biquadFilter.Q.value = 0.7;

  source.connect(biquadFilter);
  biquadFilter.connect(analyser);

  return { audioContext, analyser };
}
