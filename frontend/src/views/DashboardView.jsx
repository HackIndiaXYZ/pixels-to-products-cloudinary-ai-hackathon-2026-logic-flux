import React from 'react';
import { 
  UploadCloud, 
  Sparkles, 
  Network, 
  Users, 
  ShieldCheck, 
  Film, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  Clock, 
  FileVideo,
  ExternalLink
} from 'lucide-react';

export default function DashboardView({ 
  onNavigate, 
  onLoadDemo, 
  projectData, 
  currentAudience,
  onSeekClaim
}) {
  return (
    <div className="space-y-10 pb-12 animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 p-8 sm:p-12 shadow-2xl">
        {/* Glow backdrop effects */}
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 rounded-full bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-300">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Pixels to Products — Cloudinary AI Hackathon 2026</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              One source. Many experiences.{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Every claim traceable.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Transform multimedia into audience-specific content while keeping every important claim connected to its original source with millisecond ground-truth anchors.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('upload')}
              className="flex items-center space-x-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3.5 text-sm transition-all shadow-lg shadow-emerald-500/25 hover:scale-105"
            >
              <UploadCloud className="h-4 w-4" />
              <span>Upload Content</span>
            </button>

            <button
              onClick={() => {
                onLoadDemo();
                onNavigate('truthtrace');
              }}
              className="flex items-center space-x-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-medium border border-white/10 hover:border-emerald-500/40 px-6 py-3.5 text-sm transition-all shadow-md"
            >
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Explore TruthTrace Demo</span>
            </button>
          </div>

          {/* Pipeline stages pill */}
          <div className="pt-4 flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-400">
            <span className="text-slate-300 font-semibold">PIPELINE:</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-white/5">ONE SOURCE</span>
            <span>→</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-white/5">UNDERSTAND</span>
            <span>→</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-white/5">STORY GRAPH</span>
            <span>→</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-white/5">AUDIENCE LENS</span>
            <span>→</span>
            <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold">TRUTHTRACE</span>
          </div>
        </div>
      </section>

      {/* 3 Core Feature Cards */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Core Architecture Pillars</h2>
          <p className="text-xs text-slate-400">Three unified innovations powering verifiable multimedia transformation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Feature Card 1: Story Graph */}
          <div 
            onClick={() => onNavigate('graph')}
            className="group relative rounded-2xl border border-white/10 bg-slate-900/50 p-6 hover:bg-slate-900/80 hover:border-emerald-500/40 transition-all cursor-pointer shadow-lg space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                <Network className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                Story Graph
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Understand people, topics, events, and complex multi-layered relationships in a structured interactive map.
              </p>
            </div>
            <div className="flex items-center text-xs font-semibold text-teal-400 space-x-1 pt-2">
              <span>Explore Graph Map</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Feature Card 2: Audience Lens */}
          <div 
            onClick={() => onNavigate('audience')}
            className="group relative rounded-2xl border border-white/10 bg-slate-900/50 p-6 hover:bg-slate-900/80 hover:border-emerald-500/40 transition-all cursor-pointer shadow-lg space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                Audience Lens
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Adapt the exact same multimedia source into 5 distinct cognitive experiences: Student, Creator, Business, Journalist, and General.
              </p>
            </div>
            <div className="flex items-center text-xs font-semibold text-cyan-400 space-x-1 pt-2">
              <span>View 5 Personas</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Feature Card 3: TruthTrace */}
          <div 
            onClick={() => onNavigate('truthtrace')}
            className="group relative rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 to-slate-900/50 p-6 hover:bg-slate-900/80 hover:border-emerald-500/60 transition-all cursor-pointer shadow-lg shadow-emerald-500/5 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  TruthTrace
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Differentiator
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Verify generated claims against exact source moments. Don't just trust the AI—click timestamps to seek the original video.
              </p>
            </div>
            <div className="flex items-center text-xs font-semibold text-emerald-400 space-x-1 pt-2">
              <span>Audit Claims Timeline</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Recent Sources Dashboard (Section 13) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Recent Sources</h2>
            <p className="text-xs text-slate-400">Processed multimedia assets ready for multi-audience exploration</p>
          </div>
          <button
            onClick={() => onNavigate('upload')}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1"
          >
            <span>+ New Upload</span>
          </button>
        </div>

        {/* Source Card */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 hover:border-emerald-500/30 transition-all shadow-md">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
            {/* Left: Thumbnail & Info */}
            <div className="flex items-start space-x-4">
              <div 
                onClick={() => onNavigate('truthtrace')}
                className="relative h-24 w-40 shrink-0 rounded-xl overflow-hidden bg-slate-950 border border-white/10 group/thumb cursor-pointer"
              >
                <img
                  src={projectData?.source?.poster_url || "https://res.cloudinary.com/demo/video/upload/so_2,c_fill,w_640,h_360/docs/walking_talking.jpg"}
                  alt="Source Thumbnail"
                  className="h-full w-full object-cover group-hover/thumb:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity">
                  <Play className="h-7 w-7 text-white fill-white" />
                </div>
                <div className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-mono text-white">
                  {projectData?.source?.duration_formatted || "12:48"}
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center space-x-2">
                  <h3 className="text-base font-bold text-white hover:text-emerald-400 cursor-pointer" onClick={() => onNavigate('truthtrace')}>
                    {projectData?.source?.title || "The Future of AI and Digital Media"}
                  </h3>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                    Cloudinary Verified
                  </span>
                </div>
                <p className="text-xs text-slate-400 max-w-xl line-clamp-2">
                  Keynote exploration of generative media production, 73% workflow reduction benchmarks, TruthTrace millisecond anchoring, and 3.2x audience engagement.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-300">
                  <span className="flex items-center space-x-1 text-emerald-400 font-semibold">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Summary</span>
                  </span>
                  <span className="flex items-center space-x-1 text-emerald-400 font-semibold">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Structured Notes</span>
                  </span>
                  <span className="flex items-center space-x-1 text-emerald-400 font-semibold">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Interactive Quiz</span>
                  </span>
                  <span className="flex items-center space-x-1 text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    <ShieldCheck className="h-3.5 w-3.5 mr-0.5" />
                    <span>TruthTrace (6 Claims)</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center space-x-2 w-full lg:w-auto justify-end border-t lg:border-t-0 pt-3 lg:pt-0 border-white/5">
              <button
                onClick={() => onNavigate('shorts')}
                className="flex items-center space-x-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 text-xs font-medium border border-white/10 transition-colors"
                title="Create derived 9:16 short with Cloudinary"
              >
                <Film className="h-3.5 w-3.5 text-cyan-400" />
                <span>Create Short</span>
              </button>

              <button
                onClick={() => onNavigate('truthtrace')}
                className="flex items-center space-x-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 text-xs transition-colors shadow-md shadow-emerald-500/20"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Open TruthTrace</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
