import React from 'react';
import { BookOpen, Zap, Brain, ArrowRight, Download } from 'lucide-react';

interface LandingPageProps {
  onStartPractice: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartPractice }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="text-2xl font-bold text-[#0070c0]">PTELab</div>
        <button
          onClick={onStartPractice}
          className="px-6 py-2 bg-[#0070c0] text-white rounded-full font-semibold hover:bg-[#005fa3] transition"
        >
          Start Practice
        </button>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#0070c0] to-[#005fa3] text-white px-6 py-16 text-center">
        <h1 className="text-5xl font-bold mb-4">PTE Academic Practice Platform</h1>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Master the PTE exam with AI-powered scoring, interactive practice, and comprehensive study tools
        </p>
        <button
          onClick={onStartPractice}
          className="px-8 py-3 bg-white text-[#0070c0] rounded-lg font-bold text-lg hover:bg-blue-50 transition inline-flex items-center gap-2"
        >
          Practice Now <ArrowRight className="w-5 h-5" />
        </button>
      </section>

      {/* Speaking & Writing Section */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-slate-800">Speaking & Writing AI Scorings</h2>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start gap-3">
                <span className="text-[#0070c0] font-bold">✓</span>
                <span>PTELab AI scoring engines evaluate pronunciation & fluency</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#0070c0] font-bold">✓</span>
                <span>Real-time feedback on grammar, spelling, and structure</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#0070c0] font-bold">✓</span>
                <span>3-second silence auto-stop for authentic exam experience</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#0070c0] font-bold">✓</span>
                <span>Detailed performance analytics and improvement tracking</span>
              </li>
            </ul>
            <button
              onClick={onStartPractice}
              className="mt-6 px-6 py-2 bg-[#0070c0] text-white rounded font-semibold hover:bg-[#005fa3] transition"
            >
              Practice Now
            </button>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 h-80 rounded-lg flex items-center justify-center text-slate-400">
            <div className="text-center">
              <Zap className="w-16 h-16 mx-auto mb-2 text-[#0070c0]" />
              <p>AI-Powered Scoring Engine</p>
            </div>
          </div>
        </div>
      </section>

      {/* Study Tools Section */}
      <section className="bg-slate-50 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">PTE Study Tools</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Vocab Tool */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer">
              <BookOpen className="w-12 h-12 text-[#0070c0] mb-4" />
              <h3 className="text-xl font-bold mb-2 text-slate-800">Vocabulary Builder</h3>
              <p className="text-slate-600 text-sm mb-4">
                Master 90% of PTE exam vocabulary with interactive flashcards and spaced repetition
              </p>
              <button className="text-[#0070c0] font-semibold hover:underline flex items-center gap-2">
                Learn More <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Shadowing Tool */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer">
              <Zap className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-slate-800">Shadowing Drills</h3>
              <p className="text-slate-600 text-sm mb-4">
                Improve speaking fluency in 14 days with our proven shadowing methodology
              </p>
              <button className="text-[#0070c0] font-semibold hover:underline flex items-center gap-2">
                Learn More <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* AI Analysis Tool */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer">
              <Brain className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-slate-800">AI Analysis</h3>
              <p className="text-slate-600 text-sm mb-4">
                Get accurate score predictions and detailed performance reports for every practice session
              </p>
              <button className="text-[#0070c0] font-semibold hover:underline flex items-center gap-2">
                Learn More <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose PTE Section */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">Why Choose PTE?</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-gradient-to-br from-green-50 to-green-100 h-80 rounded-lg flex items-center justify-center text-slate-400">
            <div className="text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-2 text-green-600" />
              <p>Accepted Worldwide</p>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4 text-slate-800">Trusted by Universities & Governments</h3>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span>Go worry-free with a single, 2-hour test</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span>Get results typically within 48 hours</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span>Computer-based with fair, impartial AI scoring</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span>Build confidence with comprehensive preparation resources</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0070c0] text-white px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Master PTE?</h2>
        <p className="text-xl text-blue-100 mb-8">
          Join thousands of students preparing with PTELab's AI-powered platform
        </p>
        <button
          onClick={onStartPractice}
          className="px-8 py-3 bg-white text-[#0070c0] rounded-lg font-bold text-lg hover:bg-blue-50 transition"
        >
          Start Your Practice
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">PTELab</h4>
              <p className="text-slate-400 text-sm">Your personal PTE Academic exam simulator and practice platform</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Practice</h4>
              <ul className="text-slate-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-white transition">Speaking & Writing</a></li>
                <li><a href="#" className="hover:text-white transition">Reading</a></li>
                <li><a href="#" className="hover:text-white transition">Listening</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="text-slate-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-white transition">Study Materials</a></li>
                <li><a href="#" className="hover:text-white transition">Vocabulary</a></li>
                <li><a href="#" className="hover:text-white transition">About PTE</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="text-slate-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-slate-400">
            <p>&copy; 2026 PTELab. Not affiliated with Pearson PTE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
