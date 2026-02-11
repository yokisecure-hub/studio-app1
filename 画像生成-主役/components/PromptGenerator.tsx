import React, { useState } from 'react';
import { 
  Camera, 
  Film, 
  Sun, 
  Clock, 
  Layout, 
  Box, 
  Clapperboard, 
  Image as ImageIcon,
  Wand2,
  Copy,
  CheckCircle2,
  AlertCircle,
  Sparkles
} from 'lucide-react';

import Accordion from './Accordion';
import { OptionItem, PromptState } from '../types';
import {
  ASPECT_RATIOS,
  CAMERA_GEAR,
  FILM_TEXTURE,
  LIGHTING_ATMOSPHERE,
  TIME_MOTION,
  COMPOSITION,
  MATERIAL_RENDER,
  DIRECTOR_STYLE,
  QUALITY_PREFIX,
  QUALITY_SUFFIX
} from '../constants';
import { translateSubject } from '../services/geminiService';

const PromptGenerator: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>('base');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [state, setState] = useState<PromptState>({
    subject: '',
    aspectRatio: ASPECT_RATIOS[0].value,
    camera: '',
    film: '',
    lighting: '',
    time: '',
    composition: '',
    material: '',
    director: '',
  });

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleSelection = (key: keyof PromptState, value: string) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  const getLabelForValue = (options: OptionItem[], value: string) => {
    const found = options.find(opt => opt.value === value);
    return found ? found.label.split(' (')[0] : '未選択';
  };

  const generatePrompt = async () => {
    setError(null);
    if (!state.subject.trim()) {
      setError("被写体 (Subject) を入力してください。");
      setActiveSection('base');
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsGenerating(true);
    setGeneratedPrompt('');

    try {
      // 1. Translate Subject
      const translatedSubject = await translateSubject(state.subject);

      // 2. Assemble Logic
      // Format: [Quality Prefix] + [Translated Subject] + [Camera] + [Film] + [Lighting] + [Time] + [Composition] + [Material] + [Director] + [Quality Suffix] + [Aspect Ratio]
      
      const parts = [
        QUALITY_PREFIX.trim(),
        translatedSubject,
        state.camera,
        state.film,
        state.lighting,
        state.time === 'Standard shutter speed' ? '' : state.time,
        state.composition,
        state.material === 'Photorealistic texture' ? '' : state.material,
        state.director,
        QUALITY_SUFFIX.trim()
      ];

      // Filter out empty strings and join with comma + space
      let finalPrompt = parts
        .filter(part => part && part.trim() !== '')
        .join(', ');

      // Clean up potential double punctuation
      finalPrompt = finalPrompt.replace(/, ,/g, ',').replace(/\.\./g, '.');

      // Append aspect ratio at the very end (usually parameters like --ar go last)
      finalPrompt += ` ${state.aspectRatio}`;

      setGeneratedPrompt(finalPrompt);
      setActiveSection(null); // Close accordions to show result
      
      // Scroll to bottom to see result
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }, 100);

    } catch (err) {
      setError("生成中にエラーが発生しました。APIキーを確認してください。");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const renderOptionGrid = (
    options: OptionItem[], 
    currentValue: string, 
    stateKey: keyof PromptState
  ) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((opt) => {
        const isSelected = currentValue === opt.value;
        return (
          <button
            key={opt.label}
            onClick={() => handleSelection(stateKey, opt.value === currentValue ? '' : opt.value)}
            className={`p-3 rounded-lg text-left text-sm transition-all border ${
              isSelected
                ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-900/50'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750 hover:border-slate-600'
            }`}
          >
            <div className="font-medium flex items-center justify-between">
              {opt.label}
              {isSelected && <CheckCircle2 size={16} />}
            </div>
            {isSelected && <div className="text-xs mt-1 opacity-80 font-mono truncate">{opt.value.substring(0, 40)}...</div>}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-24">
      
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-lg flex items-center gap-2 animate-pulse">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {/* 1. Base Settings */}
      <Accordion 
        title="1. 基本設定 (Base)" 
        icon={<ImageIcon />}
        isOpen={activeSection === 'base'} 
        onToggle={() => toggleSection('base')}
        selectionLabel={state.subject ? `${state.subject.substring(0, 15)}... / ${state.aspectRatio}` : '未入力'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">
              被写体 (Subject) - 日本語で入力してください
            </label>
            <textarea
              value={state.subject}
              onChange={(e) => handleSelection('subject', e.target.value)}
              placeholder="例：雨の新宿、サイバーパンクな侍、猫の宇宙飛行士..."
              className="w-full h-24 bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">
              アスペクト比
            </label>
            <div className="flex flex-wrap gap-2">
              {ASPECT_RATIOS.map((ar) => (
                <button
                  key={ar.value}
                  onClick={() => handleSelection('aspectRatio', ar.value)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors border ${
                    state.aspectRatio === ar.value
                      ? 'bg-indigo-500 border-indigo-400 text-white'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {ar.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Accordion>

      {/* 2. Camera Gear */}
      <Accordion 
        title="2. カメラ機材 (Camera Gear)" 
        icon={<Camera />}
        isOpen={activeSection === 'camera'} 
        onToggle={() => toggleSection('camera')}
        selectionLabel={getLabelForValue(CAMERA_GEAR, state.camera)}
      >
        {renderOptionGrid(CAMERA_GEAR, state.camera, 'camera')}
      </Accordion>

      {/* 3. Film & Texture */}
      <Accordion 
        title="3. フィルムと質感 (Film & Texture)" 
        icon={<Film />}
        isOpen={activeSection === 'film'} 
        onToggle={() => toggleSection('film')}
        selectionLabel={getLabelForValue(FILM_TEXTURE, state.film)}
      >
        {renderOptionGrid(FILM_TEXTURE, state.film, 'film')}
      </Accordion>

      {/* 4. Lighting & Atmosphere */}
      <Accordion 
        title="4. 照明と大気 (Lighting & Atmosphere)" 
        icon={<Sun />}
        isOpen={activeSection === 'lighting'} 
        onToggle={() => toggleSection('lighting')}
        selectionLabel={getLabelForValue(LIGHTING_ATMOSPHERE, state.lighting)}
      >
        {renderOptionGrid(LIGHTING_ATMOSPHERE, state.lighting, 'lighting')}
      </Accordion>

      {/* 5. Time & Motion */}
      <Accordion 
        title="5. 時間と動き (Time & Motion)" 
        icon={<Clock />}
        isOpen={activeSection === 'time'} 
        onToggle={() => toggleSection('time')}
        selectionLabel={getLabelForValue(TIME_MOTION, state.time)}
      >
        {renderOptionGrid(TIME_MOTION, state.time, 'time')}
      </Accordion>

      {/* 6. Composition */}
      <Accordion 
        title="6. 構図と視線 (Composition)" 
        icon={<Layout />}
        isOpen={activeSection === 'composition'} 
        onToggle={() => toggleSection('composition')}
        selectionLabel={getLabelForValue(COMPOSITION, state.composition)}
      >
        {renderOptionGrid(COMPOSITION, state.composition, 'composition')}
      </Accordion>

      {/* 7. Material & Render */}
      <Accordion 
        title="7. 質感レンダリング (Material & Render)" 
        icon={<Box />}
        isOpen={activeSection === 'material'} 
        onToggle={() => toggleSection('material')}
        selectionLabel={getLabelForValue(MATERIAL_RENDER, state.material)}
      >
        {renderOptionGrid(MATERIAL_RENDER, state.material, 'material')}
      </Accordion>

      {/* 8. Director's Vibe */}
      <Accordion 
        title="8. スタイル・世界観 (Style & Genre) - 世界の支配" 
        icon={<Clapperboard />}
        isOpen={activeSection === 'director'} 
        onToggle={() => toggleSection('director')}
        selectionLabel={getLabelForValue(DIRECTOR_STYLE, state.director)}
      >
        {renderOptionGrid(DIRECTOR_STYLE, state.director, 'director')}
      </Accordion>

      {/* Generate Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-900/90 backdrop-blur-md border-t border-slate-700 z-50">
        <div className="max-w-3xl mx-auto flex gap-4">
          <button
            onClick={generatePrompt}
            disabled={isGenerating}
            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-900/50 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>翻訳・生成中...</span>
              </>
            ) : (
              <>
                <Wand2 size={20} />
                <span>最強のプロンプトを生成</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Result Area */}
      {generatedPrompt && (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-2xl animate-fade-in-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center gap-2">
              <Sparkles className="text-indigo-400" />
              生成完了 (Generated Prompt)
            </h3>
            <button
              onClick={copyToClipboard}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isCopied 
                  ? 'bg-green-500/20 text-green-300' 
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
              }`}
            >
              {isCopied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
              {isCopied ? 'コピーしました' : 'コピー'}
            </button>
          </div>
          <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm leading-relaxed text-slate-300 break-words border border-slate-700/50">
            {generatedPrompt}
          </div>
          <p className="mt-3 text-xs text-slate-500 text-center">
            *Nano Banana Pro / Imagen 3 にそのまま貼り付けて使用できます
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptGenerator;