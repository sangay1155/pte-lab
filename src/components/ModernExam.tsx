import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Volume2, Pause, Play } from 'lucide-react';
import type { PTEQuestion } from '../types/pte';

interface ModernExamProps {
  questions: PTEQuestion[];
  onBack: () => void;
}

export const ModernExam: React.FC<ModernExamProps> = ({ questions, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(questions[0]?.timeLimitSeconds ?? 40);

  const q = questions[currentIndex];

  useEffect(() => {
    setTimeLeft(q.timeLimitSeconds ?? 40);
  }, [currentIndex, q.timeLimitSeconds]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (value: string) => {
    setAnswers((a) => ({ ...a, [q.id]: value }));
  };

  const handleNext = () => {
    setCurrentIndex((i) => Math.min(questions.length - 1, i + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const isTimeLow = timeLeft < 15;

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Top Bar */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={onBack}
              className="text-slate-400 hover:text-white transition flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
            <div className="text-sm text-slate-300">
              <p className="font-semibold text-white">{q.section.toUpperCase()}</p>
              <p className="text-xs">Question {currentIndex + 1} of {questions.length}</p>
            </div>
          </div>

          <div className={`px-4 py-2 rounded-lg font-mono font-bold text-lg transition ${
            isTimeLow
              ? 'bg-red-600 text-white animate-pulse'
              : 'bg-slate-700 text-slate-200'
          }`}>
            {formatTime(timeLeft)}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Question Section */}
          <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 mb-8">
            <h2 className="text-xl font-bold text-white mb-6 capitalize">{q.type.replace(/-/g, ' ')}</h2>

            {q.promptText && (
              <div className="bg-slate-700 rounded-lg p-6 text-white mb-6 leading-relaxed">
                {q.promptText}
              </div>
            )}

            {q.type === 'reorder-paragraphs' && (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-slate-300 font-semibold mb-3 text-sm">Available Items</h3>
                  <div className="space-y-2">
                    {(q.scrambledTexts ?? []).map((text, i) => (
                      <div
                        key={i}
                        className="bg-slate-700 p-3 rounded cursor-move hover:bg-slate-600 transition text-slate-200 text-sm border border-slate-600"
                      >
                        {text}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-slate-300 font-semibold mb-3 text-sm">Your Order</h3>
                  <div className="bg-slate-700 rounded p-4 min-h-[200px] border border-slate-600 border-dashed text-slate-400 text-sm">
                    Drop items here to arrange...
                  </div>
                </div>
              </div>
            )}

            {q.type === 'reading-multiple-choice-single' && (
              <div className="space-y-3">
                <h3 className="text-slate-300 font-semibold mb-4 text-sm">Select the correct answer:</h3>
                {(q.options ?? []).map((option, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="answer"
                      value={option}
                      checked={answers[q.id] === option}
                      onChange={(e) => handleAnswer(e.target.value)}
                      className="w-4 h-4 text-blue-600 cursor-pointer"
                    />
                    <span className="text-slate-200 group-hover:text-white transition">{option}</span>
                  </label>
                ))}
              </div>
            )}

            {q.type === 'listening-fill-blanks' && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-slate-700 p-4 rounded">
                  <button className="text-blue-400 hover:text-blue-300 transition">
                    <Play className="w-6 h-6" />
                  </button>
                  <div className="flex-1 bg-slate-600 rounded-full h-2"></div>
                  <span className="text-slate-300 text-sm font-mono">0:00 / 0:45</span>
                </div>
                <div className="space-y-2">
                  {(q.blankOptions ?? []).map((_, i) => (
                    <input
                      key={i}
                      type="text"
                      placeholder={`Blank ${i + 1}`}
                      value={answers[`${q.id}_${i}`] ?? ''}
                      onChange={(e) => handleAnswer(e.target.value)}
                      className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition"
                    />
                  ))}
                </div>
              </div>
            )}

            {q.type === 'write-dictation' && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-slate-700 p-4 rounded">
                  <button className="text-blue-400 hover:text-blue-300 transition">
                    <Play className="w-6 h-6" />
                  </button>
                  <div className="flex-1 bg-slate-600 rounded-full h-2"></div>
                  <span className="text-slate-300 text-sm font-mono">0:00 / 1:30</span>
                </div>
                <textarea
                  placeholder="Type what you hear here..."
                  value={answers[q.id] ?? ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  className="w-full h-32 bg-slate-700 border border-slate-600 rounded px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition resize-none"
                />
                <div className="text-xs text-slate-400">
                  Words: {answers[q.id]?.trim().split(/\s+/).filter(Boolean).length ?? 0} | Characters: {answers[q.id]?.length ?? 0}
                </div>
              </div>
            )}

            {q.type === 'read-aloud' && (
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <button className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center text-white mx-auto mb-4 transition">
                    <Volume2 className="w-8 h-8" />
                  </button>
                  <p className="text-slate-300">Click to start recording</p>
                  <p className="text-xs text-slate-500 mt-2">Recording will start in 3 seconds...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <footer className="bg-slate-800 border-t border-slate-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="text-xs text-slate-400">Question {currentIndex + 1} of {questions.length}</p>
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-200 rounded-lg transition flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
