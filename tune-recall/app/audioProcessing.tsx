export function setupAudioProcessing(stream: MediaStream): {
  audioContext: AudioContext;
  analyser: AnalyserNode;
} {
  const audioContext = new AudioContext();

  const source = audioContext.createMediaStreamSource(stream);
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 2048;

  source.connect(analyser);

  return { audioContext, analyser };
}