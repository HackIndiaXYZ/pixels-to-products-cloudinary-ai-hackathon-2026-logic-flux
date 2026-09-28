import React from 'react';
import { 
  Sparkles, 
  Layers, 
  Globe, 
  Sliders, 
  CloudRain, 
  CheckCircle2, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export const AUDIENCE_OPTIONS = [
  { id: 'student', label: 'Student', icon: '🎓', desc: 'Study notes, concepts & quizzes' },
  { id: 'creator', label: 'Creator', icon: '🎬', desc: 'Viral hooks, scripts & reels' },
  { id: 'business', label: 'Business', icon: '💼', desc: 'Executive ROI & 90-day roadmap' },
  { id: 'journalist', label: 'Journalist', icon: '📰', desc: 'Audited claims & source facts' },
  { id: 'general', label: 'General', icon: '🌐', desc: 'Plain-language key takeaways' }
];

export const LANGUAGE_OPTIONS = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिंदी' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' }
];

export default function Navbar({
  currentAudience,
  setAudience,
  currentLanguage,
  setLanguage,
  openAccessibility,
  currentProjectTitle,
  cloudinaryStatus,
  onResetDemo
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 p-0.5 shadow-lg shadow-emerald-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
              <Sparkles className="h-5 w-5 text-emerald-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg tracking-tight text-white flex items-center">
                EchoLens <span className="text-emerald-400 ml-1">AI</span>
              </span>
              <span className="hidden md:inline-flex items-center rounded-full bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                Cloudinary Hackathon 2026
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              One source. Many experiences. Every claim traceable.
            </p>
          </div>
        </div>

        {/* Center / Project Info */}
        <div className="hidden lg:flex items-center space-x-2 rounded-lg bg-slate-900/60 border border-white/5 px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-xs text-slate-400 font-medium">Source:</span>
          <span className="text-xs font-semibold text-slate-200 max-w-xs truncate">
            {currentProjectTitle || "The Future of AI and Digital Media"}
          </span>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Audience Selector */}
          <div className="relative">
            <select
              value={currentAudience}
              onChange={(e) => setAudience(e.target.value)}
              className="appearance-none rounded-lg bg-slate-900 border border-white/10 hover:border-emerald-500/40 text-xs font-medium text-slate-200 py-1.5 pl-3 pr-8 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all cursor-pointer shadow-sm"
              title="Select Audience Lens"
            >
              {AUDIENCE_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.icon} {opt.label} Lens
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          </div>

          {/* Multilingual Selector */}
          <div className="relative">
            <select
              value={currentLanguage}
              onChange={(e) => setLanguage(e.target.value)}
              className="appearance-none rounded-lg bg-slate-900 border border-white/10 hover:border-cyan-500/40 text-xs font-medium text-slate-200 py-1.5 pl-7 pr-7 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all cursor-pointer shadow-sm"
              title="Select Language"
            >
              {LANGUAGE_OPTIONS.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.native}
                </option>
              ))}
            </select>
            <Globe className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-cyan-400" />
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          </div>

          {/* Cloudinary Status Badge */}
          <div 
            className={`hidden sm:flex items-center space-x-1.5 rounded-lg px-2.5 py-1 text-[11px] font-medium border ${
              cloudinaryStatus?.configured 
                ? "bg-emerald-950/60 border-emerald-500/30 text-emerald-300"
                : "bg-cyan-950/50 border-cyan-500/30 text-cyan-300"
            }`}
            title={cloudinaryStatus?.configured ? "Cloudinary Production Connected" : "Cloudinary Demo Cloud Mode (100% Functional)"}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
            <span>{cloudinaryStatus?.configured ? "Cloudinary Live" : "Cloudinary Demo CDN"}</span>
          </div>

          {/* Accessibility Drawer Toggle */}
          <button
            onClick={openAccessibility}
            className="flex items-center justify-center h-8 w-8 rounded-lg bg-slate-900 border border-white/10 hover:border-slate-700 text-slate-300 hover:text-white transition-all shadow-sm"
            title="Accessibility Settings (Font size, contrast, simplified text)"
          >
            <Sliders className="h-4 w-4" />
          </button>

          {/* Explore Demo Reset Button */}
          <button
            onClick={onResetDemo}
            className="hidden sm:inline-flex items-center space-x-1.5 rounded-lg bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 border border-emerald-500/30 text-emerald-300 text-xs font-semibold px-3 py-1.5 transition-all shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>Load Demo</span>
          </button>
        </div>
      </div>
    </header>
  );
}
