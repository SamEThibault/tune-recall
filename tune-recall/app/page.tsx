'use client';

import { useAudioRecorder } from './hooks/useAudioRecorder';

export default function Page() {
  const { canvasRef, mainSectionRef, isRecording, clips, handleRecord, handleStop, handleDelete, handleRename, note, toggleDetection, isDetecting, frequency } =
    useAudioRecorder();

  return (
    <div>
      <section className="main-controls" ref={mainSectionRef}>
        <canvas className="visualizer" ref={canvasRef} height={60} />
        <div>
          <button className="detect" onClick={toggleDetection} disabled={false}>
              {isDetecting ? 'Stop Detecting' : 'Detect'}
          </button>
          <button className="record" onClick={handleRecord} disabled={isRecording}>
            {isRecording ? 'Recording' : 'Record'}
          </button>
          <button className="stop" onClick={handleStop} disabled={!isRecording}>
            Stop
          </button>
        </div>
      </section>
      <p>
        {note}
      </p>
      <p>
        {frequency}
      </p>

      <section className="sound-clips">
        {clips.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--foreground)', opacity: 0.6, padding: '2rem' }}>
            No recordings yet. Record something to get started!
          </p>
        ) : (
          clips.map((clip) => (
            <article key={clip.id} className="clip">
              <audio src={clip.url} controls />
              <p onClick={() => handleRename(clip.id)}>
                {clip.name} (click to rename)
              </p>
              <button className="delete" onClick={() => handleDelete(clip.id)}>
                Delete
              </button>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
