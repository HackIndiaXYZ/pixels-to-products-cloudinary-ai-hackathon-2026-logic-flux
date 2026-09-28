import React from 'react';
import { 
  X, 
  Sliders, 
  Type, 
  Eye, 
  BookOpen, 
  Subtitles, 
  RotateCcw,
  Check
} from 'lucide-react';

export default function AccessibilityModal({ isOpen, onClose, settings, updateSetting, resetSettings }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Sliders className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-base">Accessibility & Reading Modes</h3>
              <p className="text-xs text-slate-400">Customize the UI for comfort and clarity</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Options */}
        <div className="space-y-4">
          {/* Large Text */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-white/5">
            <div className="flex items-center space-x-3">
              <Type className="h-5 w-5 text-emerald-400" />
              <div>
                <p className="text-xs font-medium text-slate-200">Large Text & High Readability</p>
                <p className="text-[11px] text-slate-400">Increases font sizes and line heights across cards</p>
              </div>
            </div>
            <button
              onClick={() => updateSetting('largeText', !settings.largeText)}
              className={`h-6 w-11 rounded-full transition-colors relative ${settings.largeText ? 'bg-emerald-500' : 'bg-slate-800'}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                  settings.largeText ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* High Contrast */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-white/5">
            <div className="flex items-center space-x-3">
              <Eye className="h-5 w-5 text-cyan-400" />
              <div>
                <p className="text-xs font-medium text-slate-200">High Contrast Mode</p>
                <p className="text-[11px] text-slate-400">Boosts border definitions and text contrast</p>
              </div>
            </div>
            <button
              onClick={() => updateSetting('highContrast', !settings.highContrast)}
              className={`h-6 w-11 rounded-full transition-colors relative ${settings.highContrast ? 'bg-emerald-500' : 'bg-slate-800'}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                  settings.highContrast ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Simple Language */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-white/5">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-5 w-5 text-teal-400" />
              <div>
                <p className="text-xs font-medium text-slate-200">Simplified Language Mode</p>
                <p className="text-[11px] text-slate-400">Prioritizes plain-text explanations and avoids jargon</p>
              </div>
            </div>
            <button
              onClick={() => updateSetting('simpleLanguage', !settings.simpleLanguage)}
              className={`h-6 w-11 rounded-full transition-colors relative ${settings.simpleLanguage ? 'bg-emerald-500' : 'bg-slate-800'}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                  settings.simpleLanguage ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Show Captions & Timestamps */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-white/5">
            <div className="flex items-center space-x-3">
              <Subtitles className="h-5 w-5 text-indigo-400" />
              <div>
                <p className="text-xs font-medium text-slate-200">Transcript Timestamps Everywhere</p>
                <p className="text-[11px] text-slate-400">Always display TruthTrace source badges inline</p>
              </div>
            </div>
            <button
              onClick={() => updateSetting('alwaysShowTimestamps', !settings.alwaysShowTimestamps)}
              className={`h-6 w-11 rounded-full transition-colors relative ${settings.alwaysShowTimestamps ? 'bg-emerald-500' : 'bg-slate-800'}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                  settings.alwaysShowTimestamps ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <button
            onClick={resetSettings}
            className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={onClose}
            className="flex items-center space-x-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-4 py-2 text-xs font-semibold text-slate-950 transition-colors shadow-lg shadow-emerald-500/20"
          >
            <Check className="h-4 w-4" />
            <span>Apply & Close</span>
          </button>
        </div>
      </div>
    </div>
  );
}
