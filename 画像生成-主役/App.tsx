import React from 'react';
import PromptGenerator from './components/PromptGenerator';
import { Sparkles, Aperture } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30">
      {/* Header */}
      <header className="pt-10 pb-6 px-4 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-500/10 rounded-2xl mb-4 ring-1 ring-indigo-500/30">
          <Aperture className="w-8 h-8 text-indigo-400 animate-spin-slow" />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 tracking-tight mb-3">
          Ultimate Prompt Builder
        </h1>
        <p className="text-slate-400 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
          日本語を選ぶだけで、プロの写真家・映画監督レベルの<br className="hidden sm:block" />
          「英語プロンプト」を生成する究極のツール。
        </p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4">
        <PromptGenerator />
      </main>
      
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[100px]" />
      </div>
    </div>
  );
}

export default App;