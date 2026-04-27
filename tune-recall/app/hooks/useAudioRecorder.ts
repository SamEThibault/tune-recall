'use client'; //Changed to .ts as it wasnt using jsx or react componenets

import { useEffect, useRef, useState } from 'react';
import { setupAudioProcessing } from '../lib/audio/audioProcessing';
import { Clip, UseAudioRecorderReturn } from '../lib/audio/types';
import { find_closest_note } from '../lib/audio/notes';
import { detectPitch } from '../lib/audio/detectPitch';

export function useAudioRecorder(): UseAudioRecorderReturn {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mainSectionRef = useRef<HTMLElement>(null);

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [clips, setClips] = useState<Clip[]>([]);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const [note, setNote]=useState<string>("")
  const [frequency, setFrequency]=useState<number>(0)

  const [isDetecting, setIsDetecting]=useState<boolean>(false)
  const isDetectingRef = useRef<boolean>(false) //draw() captures isDetecting at creation so had to add this
//ref is a container that persists across runders, always holds current value

  // Update the ref whenever isDetecting changes
  useEffect(() => {
    isDetectingRef.current = isDetecting
  }, [isDetecting])

  useEffect(() => {
    const canvas = canvasRef.current;
    const mainSection = mainSectionRef.current;
    if (!canvas || !mainSection) return;

    if (!navigator.mediaDevices?.getUserMedia) {
      console.error('getUserMedia not supported');
      return;
    }

    const handleResize = () => {
      canvas.width = mainSection.offsetWidth;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        // Grabs the audio context and analyser from the other file now (audioProcessing.ts)
        const { audioContext, analyser } = setupAudioProcessing(stream);
        audioCtxRef.current = audioContext;

        // Calls the visualizer (split the function call out to make it easier to read)
        visualize(analyser, audioContext, canvas);

        mediaRecorder.ondataavailable = (e: BlobEvent) => {
          chunksRef.current.push(e.data);
        };

        mediaRecorder.onstop = () => {
          const clipName = prompt('Enter a name for your sound clip?', 'My unnamed clip');
          const blob = new Blob(chunksRef.current, { type: mediaRecorder.mimeType });
          chunksRef.current = [];
          const url = window.URL.createObjectURL(blob);

          setClips((prev) => [
            ...prev,
            { id: Date.now(), name: clipName ?? 'My unnamed clip', url },
          ]);
        };
      })
      .catch((err: Error) => console.error('Error accessing microphone:', err));

    return () => {
      window.removeEventListener('resize', handleResize);
      audioCtxRef.current?.close();
    };
  }, []);

  function visualize(analyser: AnalyserNode, audioCtxRef: AudioContext, canvas: HTMLCanvasElement): void {
    const canvasCtx = canvas.getContext('2d')!;
    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);

    function draw(): void {
      requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(dataArray);

      const W = canvas.width;
      const H = canvas.height;

      canvasCtx.fillStyle = 'rgb(200, 200, 200)';
      canvasCtx.fillRect(0, 0, W, H);
      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
      canvasCtx.beginPath();

      const sliceWidth = W / bufferLength;
      let x = 0;

      //Length is 2048 (based on the audioProcessing file variable)
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * H) / 2;
        i === 0 ? canvasCtx.moveTo(x, y) : canvasCtx.lineTo(x, y);
        x += sliceWidth;
      }

      canvasCtx.lineTo(W, H / 2);
      canvasCtx.stroke();

      if (isDetectingRef.current){
        const detectedFreq=detectPitch(dataArray,audioCtxRef.sampleRate)
        const note=find_closest_note(detectedFreq)
        setFrequency(detectedFreq)
        setNote(note) 
      }
          
    }

    draw();
  }

  function toggleDetection(): void {
    setIsDetecting(prev=>!prev)
  }

  function handleRecord(): void {
    mediaRecorderRef.current?.start();
    setIsRecording(true);
  }

  function handleStop(): void {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  }

  function handleDelete(id: number): void {
    setClips((prev) => prev.filter((c) => c.id !== id));
  }

  function handleRename(id: number): void {
    const newName = prompt('Enter a new name for your sound clip?');
    if (newName) {
      setClips((prev) =>
        prev.map((c) => (c.id === id ? { ...c, name: newName } : c))
      );
    }
  }

  return {
    canvasRef,
    mainSectionRef, //idk why these are erroring but they work fine
    isRecording,
    clips,
    handleRecord,
    handleStop,
    handleDelete,
    handleRename,
    note,
    frequency,
    toggleDetection,
    isDetecting,
  };
}
