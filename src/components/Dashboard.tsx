import React, { useState } from 'react';
import { BarChart3, TrendingUp, Clock, Award, BookOpen, Zap } from 'lucide-react';
import { mockQuestions } from '../types/pte';

interface DashboardProps {
  onStartPractice: () => void;
  onStartExam: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onStartPractice, onStartExam }) => {
  const stats = {
    totalPractice: 24,
    averageScore: 72,
    studyStreak: 5,
    questionsAnswered: 156
  };

  const recentSessions = [
    { id: 1, date: 'Today', type: 'Speaking', score: 78, duration: '12 min' },
    { id: 2, date: 'Yesterday', type: 'Reading', score: 82, duration: '15 min' },
    { id: 3, date: '2 days ago', type: 'Listening', score: 68, duration: '18 min' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold">
              PT
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">PTELab</h1>
              <p className="text-xs text-slate-500">Master PTE with AI Scoring</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition">
              Settings
            </button>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold cursor-pointer">
              U
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome back!</h2>
          <p className="text-slate-600">Continue your PTE journey and improve your English skills</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium mb-1">Total Practice</p>
                <p className="text-3xl font-bold text-slate-900">{stats.totalPractice}</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium mb-1">Average Score</p>
                <p className="text-3xl font-bold text-slate-900">{stats.averageScore}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium mb-1">Study Streak</p>
                <p className="text-3xl font-bold text-slate-900">{stats.studyStreak} days</p>
              </div>
              <Zap className="w-8 h-8 text-orange-500 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium mb-1">Questions Done</p>
                <p className="text-3xl font-bold text-slate-900">{stats.questionsAnswered}</p>
              </div>
              <Award className="w-8 h-8 text-purple-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <button
            onClick={onStartPractice}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-6 hover:shadow-lg transition text-left group"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-bold">Practice Mode</h3>
              <Zap className="w-5 h-5 opacity-60 group-hover:opacity-100 transition" />
            </div>
            <p className="text-blue-100 text-sm">Practice questions with feedback and model answers</p>
            <div className="mt-4 text-sm font-medium text-white opacity-80">Start Practicing →</div>
          </button>

          <button
            onClick={onStartExam}
            className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-lg p-6 hover:shadow-lg transition text-left group"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-bold">Exam Mode</h3>
              <Clock className="w-5 h-5 opacity-60 group-hover:opacity-100 transition" />
            </div>
            <p className="text-slate-300 text-sm">Full exam simulation with strict time limits</p>
            <div className="mt-4 text-sm font-medium text-white opacity-80">Start Exam →</div>
          </button>
        </div>

        {/* Recent Sessions */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Recent Sessions
            </h3>
          </div>
          <div className="divide-y divide-slate-200">
            {recentSessions.map((session) => (
              <div key={session.id} className="p-4 hover:bg-slate-50 transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">{session.type}</p>
                    <p className="text-sm text-slate-500">{session.date} • {session.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-slate-900">{session.score}</p>
                    <p className="text-xs text-slate-500">Score</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Study Tools Grid */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer">
            <BookOpen className="w-8 h-8 text-blue-600 mb-3" />
            <h4 className="font-bold text-slate-900 mb-2">Vocabulary Builder</h4>
            <p className="text-sm text-slate-600 mb-3">Master 90% of PTE exam vocabulary</p>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700">Learn more →</button>
          </div>

          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer">
            <Zap className="w-8 h-8 text-orange-500 mb-3" />
            <h4 className="font-bold text-slate-900 mb-2">Shadowing Drills</h4>
            <p className="text-sm text-slate-600 mb-3">Improve speaking fluency in 14 days</p>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700">Learn more →</button>
          </div>

          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer">
            <TrendingUp className="w-8 h-8 text-green-600 mb-3" />
            <h4 className="font-bold text-slate-900 mb-2">AI Analysis</h4>
            <p className="text-sm text-slate-600 mb-3">Get detailed performance reports</p>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700">Learn more →</button>
          </div>
        </div>
      </main>
    </div>
  );
};
