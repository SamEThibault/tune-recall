export function setupAudioProcessing(stream: MediaStream): {
  audioContext: AudioContext;
  analyser: AnalyserNode;
} {
  const audioContext = new AudioContext();

  const source = audioContext.createMediaStreamSource(stream);
  const analyser = audioContext.createAnalyser();
  const biquadHighpassFilter = audioContext.createBiquadFilter();
  const biquadLowpassFilter = audioContext.createBiquadFilter();


  // Number of audio samples (higher means more latency so I think 2048 is a good median)
  analyser.fftSize = 2048;

  // Lowest standard guitar frequency is E2 at 82.41 Hz
  biquadHighpassFilter.type = 'highpass';
  biquadHighpassFilter.frequency.value = 70;
  biquadHighpassFilter.Q.value = 0.7;

  biquadLowpassFilter.type = 'lowpass';
  biquadLowpassFilter.frequency.value = 2000;
  biquadLowpassFilter.Q.value = 0.7;

  source.connect(biquadHighpassFilter);
  biquadHighpassFilter.connect(biquadLowpassFilter);
  biquadLowpassFilter.connect(analyser);

  return { audioContext, analyser };
}
