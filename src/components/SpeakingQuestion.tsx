import React, { useEffect, useRef } from 'react';
import { Mic, Square, Info } from 'lucide-react';
import { PTEQuestion } from '../types/pte';
import { usePTEAudioRecorder } from '../hooks/usePTEAudioRecorder';

interface SpeakingQuestionProps {
  question: PTEQuestion;
  isPracticeMode: boolean;
}

export const SpeakingQuestion: React.FC<SpeakingQuestionProps> = ({ question, isPracticeMode }) => {
  const {
    recorderState,
    countdown,
    volumeData,
    recordedBlob,
    initiateRecordingSequence,
    stopRecordingAction
  } = usePTEAudioRecorder(3, question.timeLimitSeconds);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    initiateRecordingSequence();
  }, [question, initiateRecordingSequence]);

  // Real-time Canvas Waveform Rendering Loop
  useEffect(() => {
    if (recorderState !== 'recording' || !canvasRef.current) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      if (!canvas || !ctx) return;
      animationRef.current = requestAnimationFrame(draw);

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle background grid lines grid
      ctx.strokeStyle = '#f1f5f9';
      ctx.lineWidth = 1;
      for (let i = 0; i < width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }

      // Draw Waveform Line
      ctx.strokeStyle = '#0070c0'; // Official Accent Steel Blue
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.beginPath();

      const sliceWidth = width / volumeData.length;
      let x = 0;

      for (let i = 0; i < volumeData.length; i++) {
        // Center the wave vertically on the canvas context frame
        const v = volumeData[i] / 50; 
        const y = (height / 2) + (v * (height / 2) * (i % 2 === 0 ? 1 : -1));

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      ctx.lineTo(width, height / 2);
      ctx.stroke();
    };

    draw();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [recorderState, volumeData]);

  return (
    <div className="space-y-6 flex-1 flex flex-col justify-between">
      <div className="bg-[#f4f8fa] border-l-4 border-[#0070c0] p-4 rounded-r shadow-sm flex items-start space-x-3">
        <Info className="w-5 h-5 text-[#0070c0] mt-0.5 shrink-0" />
        <p className="text-sm text-slate-700 leading-relaxed font-medium">
          {question.type === 'read-aloud' && 'Look at the text below. In 40 seconds, you must read this text aloud as naturally and clearly as possible. You have 40 seconds to read.'}
          {question.type === 'describe-image' && 'Look at the map or chart below. In 25 seconds, please speak into the microphone and describe in detail what the graph is showing.'}
        </p>
      </div>

      <div className={`grid gap-6 flex-1 ${question.imageUrl ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
        {question.type === 'read-aloud' && (
          <div className="bg-white border border-slate-200 p-6 rounded-lg shadow-sm text-lg leading-relaxed text-slate-800 font-normal select-text tracking-wide whitespace-pre-line antialiased">
            {question.promptText}
          </div>
        )}

        {question.imageUrl && (
          <div className="border border-slate-200 rounded-lg p-4 bg-white flex items-center justify-center shadow-sm min-h-[300px]">
            <img src={question.imageUrl} alt="PTE Evaluation Graph" className="max-h-72 object-contain rounded" />
          </div>
        )}

        <div className="border border-slate-200 rounded-lg p-6 bg-slate-50 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center space-x-2">
              <Mic className={`w-4 h-4 ${recorderState === 'recording' ? 'text-red-500 animate-pulse' : 'text-slate-400'}`} />
              <span className="font-bold text-xs tracking-wider text-slate-600 uppercase">Recorded Answer Status</span>
            </div>
            <span className={`text-xs font-bold px-3 py-0.5 rounded uppercase tracking-wider ${
              recorderState === 'idle' && 'bg-slate-200 text-slate-600' ||
              recorderState === 'preparing' && 'bg-amber-500 text-white animate-pulse' ||
              recorderState === 'recording' && 'bg-red-600 text-white' ||
              'bg-green-600 text-white'
            }`}>
              {recorderState === 'preparing' ? `Current Countdown: ${countdown}` : recorderState}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center py-4 flex-1">
            {recorderState === 'preparing' && (
              <div className="text-center space-y-2">
                <div className="text-sm text-slate-500 font-semibold uppercase tracking-widest">Beginning In</div>
                <div className="text-5xl font-black text-slate-800">{countdown}</div>
              </div>
            )}

            {recorderState === 'recording' && (
              <div className="w-full space-y-4 flex flex-col items-center">
                <canvas 
                  ref={canvasRef} 
                  width={500} 
                  height={80} 
                  className="w-full max-w-md h-20 bg-white border border-slate-200 rounded shadow-inner"
                />
                <button
                  onClick={stopRecordingAction}
                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2 rounded text-xs uppercase tracking-wider transition shadow-sm"
                >
                  <Square className="w-3.5 h-3.5 fill-white" />
                  <span>Stop & Lock Response</span>
                </button>
              </div>
            )}

            {recorderState === 'completed' && (
              <div className="text-center space-y-3 w-full">
                <div className="text-sm font-bold text-slate-700 flex items-center justify-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span>Audio Response Audio Locked Successfully.</span>
                </div>
                {isPracticeMode && recordedBlob && (
                  <div className="pt-2">
                    <audio src={URL.createObjectURL(recordedBlob)} controls className="mx-auto h-8 w-64 accent-[#0070c0]" />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-blue-50/50 p-3 rounded text-[11px] text-slate-500 border border-blue-100 leading-normal">
            <span className="font-bold text-[#0070c0] uppercase tracking-wider block mb-0.5">Audio Engine Metric Guard</span>
            If you remain completely silent for 3 consecutive seconds once recording initializes, the audio channel terminates automatically.
          </div>
        </div>
      </div>
    </div>
  );
};