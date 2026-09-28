import React, { useState } from 'react';
import { 
  Film, 
  Sparkles, 
  Play, 
  Clock, 
  Sliders, 
  CheckCircle2, 
  Download, 
  ExternalLink, 
  Copy, 
  Check, 
  Smartphone, 
  Square, 
  Monitor,
  Loader2
} from 'lucide-react';

export default function ShortsStudioView({ 
  sourceMetadata, 
  shortsPresets = [],
  onSeekVideo 
}) {
  const [startTime, setStartTime] = useState(75.0); // 01:15
  const [endTime, setEndTime] = useState(105.0);   // 01:45
  const [aspectRatio, setAspectRatio] = useState('9:16');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [activePreset, setActivePreset] = useState('short-1');

  const cloud = sourceMetadata?.cloud_name || 'demo';
  const publicId = sourceMetadata?.public_id || 'docs/walking_talking';

  // Construct Cloudinary Dynamic Transformation URL
  const cropParam = aspectRatio === '9:16' ? 'c_fill,ar_9:16,g_auto' : aspectRatio === '1:1' ? 'c_fill,ar_1:1,g_auto' : 'c_fill,ar_16:9,g_auto';
  const transformStr = `so_${Math.round(startTime)},eo_${Math.round(endTime)},${cropParam},q_auto,f_auto`;
  const derivedVideoUrl = `https://res.cloudinary.com/${cloud}/video/upload/${transformStr}/${publicId}.mp4`;
  const posterUrl = `https://res.cloudinary.com/${cloud}/video/upload/so_${Math.round(startTime)},${cropParam}/${publicId}.jpg`;
  const gifUrl = `https://res.cloudinary.com/${cloud}/video/upload/so_${Math.round(startTime)},eo_${Math.min(Math.round(endTime), Math.round(startTime) + 4)},c_scale,w_360,f_gif/${publicId}.gif`;

  const duration = Math.max(1, Math.round(endTime - startTime));

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleApplyPreset = (preset) => {
    setActivePreset(preset.id);
    setStartTime(preset.start_time);
    setEndTime(preset.end_time);
    if (preset.aspect_ratio) setAspectRatio(preset.aspect_ratio);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(derivedVideoUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      await fetch('/api/short', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          public_id: publicId,
          start_time: startTime,
          end_time: endTime,
          aspect_ratio: aspectRatio
        })
      });
    } catch (e) {
      console.warn("Using dynamic Cloudinary transformation URL directly:", e);
    } finally {
      setTimeout(() => setIsGenerating(false), 600);
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center space-x-2">
              <Film className="h-7 w-7 text-cyan-400" />
              <span>Cloudinary Shorts Studio</span>
            </h1>
            <span className="rounded-full bg-cyan-950 px-2.5 py-0.5 text-[11px] font-semibold text-cyan-300 border border-cyan-500/30">
              CDN Edge Rendering
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Create derived vertical shorts and teasers directly from the source video using Cloudinary real-time dynamic transformations.
          </p>
        </div>
      </div>

      {/* 1-Click Viral Presets */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Curated Viral Moment Presets</span>
          </span>
          <span className="text-[11px] text-slate-400">1-Click Auto Config</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {shortsPresets.map((preset) => {
            const isSelected = activePreset === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleApplyPreset(preset)}
                className={`p-4 rounded-2xl border text-left transition-all space-y-2 relative overflow-hidden ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/40 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/30'
                    : 'border-white/10 bg-slate-900/60 hover:bg-slate-900 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-bold">
                    {preset.badge}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {preset.duration}s
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white">{preset.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {preset.caption}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Editor & Preview Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 space-y-6 shadow-xl">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Sliders className="h-4 w-4 text-cyan-400" />
              <span>Transformation Parameters</span>
            </h3>

            {/* Time Segment Selection */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">Clip Timeline Window:</span>
                <span className="font-mono text-cyan-400 font-bold">
                  {formatTime(startTime)} → {formatTime(endTime)} ({duration} seconds)
                </span>
              </div>

              {/* Start Time Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Start Offset (`so_`):</span>
                  <span className="font-mono text-white">{formatTime(startTime)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={Math.max(10, endTime - 5)}
                  step={1}
                  value={startTime}
                  onChange={(e) => setStartTime(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
                />
              </div>

              {/* End Time Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>End Offset (`eo_`):</span>
                  <span className="font-mono text-white">{formatTime(endTime)}</span>
                </div>
                <input
                  type="range"
                  min={startTime + 5}
                  max={sourceMetadata?.duration || 768}
                  step={1}
                  value={endTime}
                  onChange={(e) => setEndTime(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Aspect Ratio Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">
                Target Aspect Ratio (Smart Gravity Crop):
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: '9:16', label: '9:16 Vertical', desc: 'Reels, TikTok, Shorts', icon: Smartphone },
                  { id: '1:1', label: '1:1 Square', desc: 'LinkedIn & Feed', icon: Square },
                  { id: '16:9', label: '16:9 Landscape', desc: 'YouTube & Web', icon: Monitor },
                ].map((ratio) => {
                  const Icon = ratio.icon;
                  const isSelected = aspectRatio === ratio.id;
                  return (
                    <button
                      key={ratio.id}
                      onClick={() => setAspectRatio(ratio.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300 font-bold'
                          : 'border-white/5 bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-1.5 mb-1">
                        <Icon className="h-3.5 w-3.5" />
                        <span className="text-xs">{ratio.label}</span>
                      </div>
                      <p className="text-[10px] opacity-75 font-normal">{ratio.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cloudinary Transformation Formula Card */}
            <div className="rounded-xl border border-white/5 bg-slate-950 p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Generated Cloudinary Transformation URL:
                </span>
                <button
                  onClick={handleCopyUrl}
                  className="text-slate-400 hover:text-white flex items-center space-x-1 text-[11px]"
                >
                  {copiedUrl ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedUrl ? 'Copied' : 'Copy URL'}</span>
                </button>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-lg border border-white/5 font-mono text-[11px] text-cyan-300 break-all select-all">
                {derivedVideoUrl}
              </div>
              <p className="text-[10px] text-slate-400">
                ⚡ Video is cropped to {aspectRatio} with smart face gravity (`g_auto`) and clipped between {startTime}s and {endTime}s without server rendering lag.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex-1 flex items-center justify-center space-x-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 text-xs transition-colors shadow-lg shadow-cyan-500/20 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Applying Transformation...</span>
                  </>
                ) : (
                  <>
                    <Film className="h-4 w-4" />
                    <span>Generate Short Video</span>
                  </>
                )}
              </button>

              <a
                href={derivedVideoUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold p-3 text-xs border border-white/10 transition-colors flex items-center space-x-1"
                title="Open Cloudinary URL in new tab"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Preview Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 space-y-4 shadow-xl text-center">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">Live Cloudinary Clip Preview</span>
              <span className="font-mono text-cyan-400">{aspectRatio} Format</span>
            </div>

            {/* Vertical Mockup Container */}
            <div className={`mx-auto rounded-2xl overflow-hidden border-2 border-slate-700 bg-black shadow-2xl relative ${aspectRatio === '9:16' ? 'max-w-[260px] aspect-[9/16]' : aspectRatio === '1:1' ? 'max-w-[320px] aspect-square' : 'max-w-[400px] aspect-video'}`}>
              <video
                key={derivedVideoUrl}
                src={derivedVideoUrl}
                poster={posterUrl}
                controls
                className="w-full h-full object-cover"
                playsInline
              />

              {/* Cloudinary watermark badge */}
              <div className="absolute top-2 left-2 flex items-center space-x-1 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-mono text-cyan-300 pointer-events-none">
                <span>Cloudinary Dynamic Transform</span>
              </div>
            </div>

            <div className="text-left text-xs text-slate-400 space-y-1 bg-slate-950 p-3 rounded-xl border border-white/5">
              <div className="flex justify-between">
                <span>Derived Duration:</span>
                <span className="text-white font-mono">{duration} seconds</span>
              </div>
              <div className="flex justify-between">
                <span>Cloudinary Asset:</span>
                <span className="text-cyan-400 font-mono text-[10px]">{publicId}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
