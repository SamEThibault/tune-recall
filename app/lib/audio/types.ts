export interface Clip {
  id: number;
  name: string;
  url: string;
}

// Return this instead of having the ui in here
export interface UseAudioRecorderReturn {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  mainSectionRef: React.RefObject<HTMLElement>;
  isRecording: boolean;
  clips: Clip[];
  handleRecord: () => void;
  handleStop: () => void;
  handleDelete: (id: number) => void;
  handleRename: (id: number) => void;
}
