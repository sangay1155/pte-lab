import React, { useState, useEffect } from 'react';
import { Menu, ChevronRight, ChevronLeft, Clock, HelpCircle } from 'lucide-react';
import type { PTEQuestion } from '../types/pte';

interface ExamLayoutProps {
  children: React.ReactNode;
  currentQuestion: PTEQuestion;
  currentIndex: number;
  totalQuestions: number;
  onNext: () => void;
  onPrev: () => void;
  isPracticeMode: boolean;
  setIsPracticeMode: (val: boolean) => void;
  onSelectQuestion: (index: number) => void;
  questions: PTEQuestion[];
}

export const ExamLayout: React.FC<ExamLayoutProps> = ({
  children,
  currentQuestion,
  currentIndex,
  totalQuestions,
  onNext,
  onPrev,
  isPracticeMode,
  setIsPracticeMode,
  onSelectQuestion,
  questions,
}) => {
  const [timeLeft, setTimeLeft] = useState(currentQuestion.timeLimitSeconds);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setTimeLeft(currentQuestion.timeLimitSeconds);
  }, [currentQuestion]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isTimeCritical = timeLeft < 15;
  const sectionTitles: Record<string, string> = {
    'speaking-writing': 'Speaking & Writing',
    'reading': 'Reading Assessment Module',
    'listening': 'Listening Assessment Module',
  };

  return (
    <div className="h-screen w-screen bg-[#f8fafc] flex flex-col font-sans overflow-hidden select-none text-slate-800 antialiased">
      {/* Pearson Authentic Top Banner Structure */}
      <header className="bg-[#0c2340] text-white h-14 min-h-[56px] px-6 flex items-center justify-between shadow-sm z-30">
        <div className="flex items-center space-x-4">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-[#1e3a5f] rounded transition text-slate-300 hover:text-white">
            <Menu className="w-5 h-5" />
          </button>
          <div className="text-sm font-semibold tracking-wide border-l border-slate-600 pl-4 text-slate-200">
            {sectionTitles[currentQuestion.section]}
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="bg-[#153054] px-3 py-1 rounded text-xs font-semibold tracking-wider text-slate-300 border border-slate-700/50">
            Item <span className="text-[#ffc000] font-bold">{currentIndex + 1}</span> of {totalQuestions}
          </div>

          <div className={`flex items-center space-x-2 px-3 py-1 rounded text-sm font-bold border transition-all duration-300 ${
            isTimeCritical ? 'bg-red-600 border-red-700 animate-pulse text-white' : 'bg-[#1a365d] border-slate-700 text-slate-200'
          }`}>
            <Clock className="w-4 h-4 text-slate-400" />
            <span className="font-mono tracking-widest">{formatTime(timeLeft)}</span>
          </div>

          <div className="flex items-center bg-[#153054] rounded p-0.5 border border-slate-700">
            <button onClick={() => setIsPracticeMode(false)} className={`px-2.5 py-0.5 text-[11px] rounded font-bold uppercase tracking-wider transition ${!isPracticeMode ? 'bg-[#0070c0] text-white shadow-sm' : 'text-slate-400'}`}>Exam</button>
            <button onClick={() => setIsPracticeMode(true)} className={`px-2.5 py-0.5 text-[11px] rounded font-bold uppercase tracking-wider transition ${isPracticeMode ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-400'}`}>Practice</button>
          </div>
        </div>
      </header>

      {/* Main Container Viewport Shell Frame */}
      <div className="flex flex-1 relative overflow-hidden">
        {/* Navigation Sidebar Panel */}
        <aside className={`absolute inset-y-0 left-0 w-64 bg-white border-r border-slate-200 shadow-xl z-20 transform transition-transform duration-200 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-xs tracking-widest uppercase text-slate-400">Navigation Matrix</div>
          <nav className="p-2 space-y-0.5 overflow-y-auto h-[calc(100vh-120px)]">
            {questions.map((q, idx) => (
              <button 
                key={q.id} 
                onClick={() => { onSelectQuestion(idx); setIsSidebarOpen(false); }} 
                className={`w-full text-left px-3 py-2 rounded text-xs font-semibold transition flex items-center justify-between ${idx === currentIndex ? 'bg-blue-50 text-[#0070c0]' : 'hover:bg-slate-100 text-slate-600'}`}
              >
                <span className="truncate capitalize">{idx + 1}. {q.type.replace(/-/g, ' ')}</span>
                <span className="text-[9px] uppercase px-1 py-0.2 bg-slate-200 rounded text-slate-500 font-bold">{q.section.split('-')[0]}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Content Box Frame Wrapper */}
        <main className="flex-1 flex flex-col justify-between overflow-hidden bg-white max-w-5xl mx-auto w-full border-x border-slate-200 shadow-sm">
          <div className="flex-1 overflow-y-auto p-6 flex flex-col">
            {children}
          </div>

          {/* Conditional Practice Insights Frame Container */}
          {isPracticeMode && (
            <div className="border-t border-amber-200 bg-amber-50/60 p-4 shrink-0 max-h-48 overflow-y-auto">
              <div className="flex items-center space-x-2 text-amber-800 font-bold text-xs uppercase tracking-wider mb-1">
                <HelpCircle className="w-4 h-4 text-amber-700" />
                <h3>Model Key Strategy Solution</h3>
              </div>
              <div className="text-xs text-amber-900 font-medium whitespace-pre-line leading-relaxed bg-white/80 p-2 rounded border border-amber-200/60">
                {currentQuestion.modelAnswer}
              </div>
            </div>
          )}

          {/* Persistent Standard Footer Navigation Layer Panel */}
          <footer className="h-12 min-h-[48px] bg-slate-100 border-t border-slate-200 px-6 flex items-center justify-between shrink-0">
            <span className="text-[10px] tracking-wider text-slate-400 uppercase font-bold">Simulator Instance Active</span>
            <div className="flex items-center space-x-2">
              <button 
                onClick={onPrev} 
                disabled={currentIndex === 0} 
                className="px-3 py-1 border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-40 text-slate-600 rounded text-xs font-bold transition flex items-center space-x-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>
              <button 
                onClick={onNext} 
                className="px-4 py-1 bg-[#0070c0] hover:bg-[#005fa3] text-white font-bold rounded text-xs tracking-wide transition flex items-center space-x-1 shadow-sm"
              >
                <span>{currentIndex === totalQuestions - 1 ? 'Finish Block' : 'Next Item'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};