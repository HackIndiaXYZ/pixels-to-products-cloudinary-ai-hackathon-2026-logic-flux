import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Search, 
  Share2, 
  Filter,
  Check,
  Copy,
  ExternalLink,
  Info
} from 'lucide-react';
import VideoPlayer from '../components/VideoPlayer';

export default function TruthTraceView({ 
  claims = [], 
  sourceMetadata = {}, 
  activeClaim = null,
  setActiveClaim = () => {},
  videoPlayerRef,
  onSeekClaim
}) {
  const [filter, setFilter] = useState('all'); // all | verified | unverified
  const [copiedId, setCopiedId] = useState(null);

  const duration = sourceMetadata?.duration || 768;

  const filteredClaims = claims.filter(c => {
    if (filter === 'verified') return c.verified;
    if (filter === 'unverified') return !c.verified;
    return true;
  });

  const handleCopyClaim = (claim) => {
    const text = `[TruthTrace Verified Claim]\n"${claim.text}"\nSource Timestamp: ${claim.timestamp_formatted}\nConfidence: ${claim.confidence}%\nEvidence: "${claim.evidence_quote}"`;
    navigator.clipboard.writeText(text);
    setCopiedId(claim.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClaimClick = (claim) => {
    setActiveClaim(claim);
    if (videoPlayerRef?.current) {
      videoPlayerRef.current.seekTo(claim.timestamp_seconds, claim.text);
    }
    if (onSeekClaim) {
      onSeekClaim(claim.timestamp_seconds, claim.text);
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center space-x-2">
              <ShieldCheck className="h-7 w-7 text-emerald-400" />
              <span>TruthTrace</span>
            </h1>
            <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-bold text-emerald-300 border border-emerald-500/40">
              Core Differentiator
            </span>
          </div>
          <p className="text-sm font-semibold text-emerald-400 italic">
            "Don't just trust the AI. Trace it."
          </p>
          <p className="text-xs text-slate-400">
            Every critical AI-generated assertion is anchored to its exact audio-visual millisecond on Cloudinary.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-white/10 text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              filter === 'all'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Claims ({claims.length})
          </button>

          <button
            onClick={() => setFilter('verified')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              filter === 'verified'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Source-backed
          </button>

          <button
            onClick={() => setFilter('unverified')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              filter === 'unverified'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Needs Verification
          </button>
        </div>
      </div>

      {/* Synchronized Video Stream & Player Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Cloudinary Video Player (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-950">
            <VideoPlayer
              ref={videoPlayerRef}
              videoUrl={sourceMetadata?.cloudinary_url}
              posterUrl={sourceMetadata?.poster_url}
              title={sourceMetadata?.title}
              duration={duration}
              claims={claims}
              activeClaim={activeClaim}
            />
          </div>

          {/* Active Claim Spotlight Bar under video */}
          {activeClaim && (
            <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-emerald-950/60 to-slate-900/80 p-4 space-y-2 shadow-lg animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold flex items-center space-x-1">
                  <ShieldCheck className="h-3.5 w-3.5 mr-1" />
                  Currently Auditing Ground Truth [{activeClaim.timestamp_formatted}]
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-emerald-900/50 text-emerald-300 border border-emerald-500/30">
                  {activeClaim.confidence}% Confidence
                </span>
              </div>
              <p className="text-xs font-semibold text-white leading-relaxed">
                "{activeClaim.text}"
              </p>
              <div className="text-[11px] text-emerald-200/80 bg-slate-950/60 p-2.5 rounded-lg border border-white/5">
                <span className="font-semibold text-slate-400 mr-1">Raw Evidence:</span>
                "{activeClaim.evidence_quote}"
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Visual Timeline & Claims Feed (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Clock className="h-4 w-4 text-emerald-400" />
              <span>Ground Truth Claims Stream</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              {filteredClaims.length} Anchored Points
            </span>
          </div>

          {/* Timeline Bar (Section 8 visual) */}
          <div className="rounded-xl border border-white/10 bg-slate-900/70 p-3 space-y-2">
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>00:00</span>
              <span>03:42</span>
              <span>07:35</span>
              <span>12:48</span>
            </div>

            {/* Stepped Timeline Graphic */}
            <div className="relative h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-teal-400 w-full opacity-60" />
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
              <span className="flex items-center space-x-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                <span>Source-backed</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="h-2 w-2 rounded-full bg-amber-400"></span>
                <span>Needs verification</span>
              </span>
            </div>
          </div>

          {/* Claims List Scrollable */}
          <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
            {filteredClaims.map((claim) => {
              const isSelected = activeClaim?.id === claim.id;

              return (
                <div
                  key={claim.id}
                  onClick={() => handleClaimClick(claim)}
                  className={`rounded-2xl border p-4 transition-all cursor-pointer relative overflow-hidden group space-y-3 ${
                    isSelected
                      ? 'border-emerald-400 bg-emerald-950/40 shadow-xl shadow-emerald-500/10 ring-1 ring-emerald-500/40'
                      : 'border-white/10 bg-slate-900/60 hover:bg-slate-900 hover:border-emerald-500/30'
                  }`}
                >
                  {/* Top info row */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/5">
                      {claim.category}
                    </span>

                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        claim.verified
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                      }`}>
                        {claim.status}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {claim.confidence}%
                      </span>
                    </div>
                  </div>

                  {/* Claim Text */}
                  <p className="text-xs sm:text-sm font-semibold text-slate-100 group-hover:text-emerald-200 transition-colors leading-relaxed">
                    "{claim.text}"
                  </p>

                  {/* Evidence quote */}
                  <div className="text-[11px] text-slate-400 italic bg-slate-950/50 p-2.5 rounded-lg border border-white/5">
                    "{claim.evidence_quote}"
                  </div>

                  {/* Bottom Actions Row */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                    <div className="flex items-center space-x-1.5 font-mono text-emerald-400 font-bold">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Source: {claim.timestamp_formatted}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyClaim(claim);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        title="Copy claim with citation"
                      >
                        {copiedId === claim.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClaimClick(claim);
                        }}
                        className="flex items-center space-x-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-1.5 text-xs transition-colors shadow"
                      >
                        <Play className="h-3 w-3 fill-current" />
                        <span>▶ View Source</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
