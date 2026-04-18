'use client';

import { useAudioRecorder } from './AudioRecorder';

export default function Page() {
  const { canvasRef, mainSectionRef, isRecording, clips, handleRecord, handleStop, handleDelete, handleRename } =
    useAudioRecorder();

  return (
    <div>
      <section className="main-controls" ref={mainSectionRef}>
        <canvas className="visualizer" ref={canvasRef} height={60} />
        <div>
          <button className="record" onClick={handleRecord} disabled={isRecording}>
            {isRecording ? 'Recording' : 'Record'}
          </button>
          <button className="stop" onClick={handleStop} disabled={!isRecording}>
            Stop
          </button>
        </div>
      </section>

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
