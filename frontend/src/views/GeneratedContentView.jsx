import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Copy, 
  Check, 
  RotateCcw, 
  BookOpen, 
  Share2, 
  HelpCircle, 
  ShieldCheck, 
  Tag, 
  Play, 
  Download,
  CheckCircle2
} from 'lucide-react';

export default function GeneratedContentView({ 
  projectData, 
  currentAudience, 
  currentLanguage,
  translations,
  onSeekTimestamp,
  onNavigate
}) {
  const [activeTab, setActiveTab] = useState('summary'); // summary | notes | social | quiz | claims | topics
  const [copiedKey, setCopiedKey] = useState(null);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const audienceContent = projectData?.audiences?.[currentAudience] || projectData?.audiences?.['general'] || {};
  const claims = projectData?.claims || [];
  const topics = projectData?.topics || [];

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(typeof text === 'string' ? text : JSON.stringify(text, null, 2));
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => setIsRegenerating(false), 800);
  };

  // Check if translation is active
  const isTranslated = currentLanguage !== 'en' && translations?.[currentLanguage];
  const activeSummary = isTranslated ? translations[currentLanguage].summary : projectData?.summary;
  const activeTakeaways = isTranslated ? translations[currentLanguage].takeaways : null;

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center space-x-2">
            <FileText className="h-7 w-7 text-emerald-400" />
            <span>Generated Content Hub</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Export, copy, and explore audience-tailored deliverables with source timestamp verification.
          </p>
        </div>

        {/* Global actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="flex items-center space-x-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 px-3.5 py-2 text-xs font-semibold border border-white/10 transition-colors"
          >
            <RotateCcw className={`h-3.5 w-3.5 text-emerald-400 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>{isRegenerating ? 'Regenerating...' : 'Regenerate'}</span>
          </button>

          <button
            onClick={() => handleCopy(projectData, 'full-export')}
            className="flex items-center space-x-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 text-xs transition-colors shadow-md shadow-emerald-500/20"
          >
            {copiedKey === 'full-export' ? <Check className="h-3.5 w-3.5" /> : <Download className="h-3.5 w-3.5" />}
            <span>Export All JSON</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-2">
        {[
          { id: 'summary', label: 'Summary', icon: Sparkles },
          { id: 'notes', label: 'Study Notes', icon: BookOpen },
          { id: 'social', label: 'Social Content', icon: Share2 },
          { id: 'quiz', label: 'Interactive Quiz', icon: HelpCircle },
          { id: 'claims', label: 'TruthTrace Claims', icon: ShieldCheck },
          { id: 'topics', label: 'Topics & Entities', icon: Tag },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/15'
                  : 'text-slate-400 hover:text-white bg-slate-900/40 hover:bg-slate-900'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}

      {/* TAB 1: SUMMARY */}
      {activeTab === 'summary' && (
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 space-y-4 shadow-xl animate-fade-in">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                {isTranslated ? `Vernacular Localization (${translations[currentLanguage]?.language_name})` : 'AI Synthesis'}
              </span>
              <h3 className="text-base font-bold text-white">Comprehensive Executive Summary</h3>
            </div>
            <button
              onClick={() => handleCopy(activeSummary, 'summary-text')}
              className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 px-3 py-1.5 rounded-lg border border-white/5"
            >
              {copiedKey === 'summary-text' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>Copy</span>
            </button>
          </div>

          <div className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-5 rounded-xl border border-white/5 whitespace-pre-line">
            {activeSummary}
          </div>

          {activeTakeaways && (
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-emerald-400">Localized Key Takeaways:</h4>
              <div className="space-y-1.5">
                {activeTakeaways.map((item, i) => (
                  <div key={i} className="text-xs text-slate-300 bg-slate-950/40 p-2.5 rounded-lg border border-white/5">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: NOTES */}
      {activeTab === 'notes' && (
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 space-y-4 shadow-xl animate-fade-in">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <h3 className="text-base font-bold text-white">Audience Study Notes</h3>
            <button
              onClick={() => handleCopy(audienceContent?.study_notes || audienceContent?.action_points, 'notes-text')}
              className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 px-3 py-1.5 rounded-lg border border-white/5"
            >
              {copiedKey === 'notes-text' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>Copy</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(audienceContent?.study_notes || [
              { topic: "Key Finding", point: "Generative AI pipelines reduced manual editing time by 73%.", source_timestamp: "01:24" },
              { topic: "Core Protocol", point: "TruthTrace links tokens directly to audio-visual millisecond spectrograms.", source_timestamp: "03:42" },
              { topic: "Audience Impact", point: "3.2x higher retention across 10M viewer trial through tailored lenses.", source_timestamp: "05:10" },
              { topic: "CDN Optimization", point: "Cloudinary dynamic URL transformations execute instant aspect ratio cropping.", source_timestamp: "07:35" }
            ]).map((n, i) => (
              <div key={i} className="rounded-xl border border-white/5 bg-slate-950 p-4 space-y-2 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-200">{n.topic}</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{n.point}</p>
                </div>
                {n.source_timestamp && (
                  <button
                    onClick={() => onSeekTimestamp(n.source_timestamp === '01:24' ? 84 : 222, n.point)}
                    className="inline-flex items-center space-x-1 font-mono text-[11px] text-emerald-400 hover:underline pt-2"
                  >
                    <Play className="h-3 w-3 fill-current" />
                    <span>View Ground Truth [{n.source_timestamp}]</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SOCIAL */}
      {activeTab === 'social' && (
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 space-y-5 shadow-xl animate-fade-in">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <h3 className="text-base font-bold text-white">Cross-Platform Social Deliverables</h3>
            <button
              onClick={() => handleCopy(audienceContent?.social_posts, 'social-all')}
              className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 px-3 py-1.5 rounded-lg border border-white/5"
            >
              {copiedKey === 'social-all' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>Copy All Posts</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Thread */}
            <div className="rounded-xl border border-white/5 bg-slate-950 p-4 space-y-3">
              <h4 className="text-xs font-bold text-white">Viral X/Twitter Thread</h4>
              <div className="space-y-2 text-xs font-mono text-slate-300">
                {(projectData?.audiences?.creator?.social_posts?.twitter_thread || []).map((t, idx) => (
                  <p key={idx} className="bg-slate-900/60 p-2.5 rounded-lg border border-white/5">{t}</p>
                ))}
              </div>
            </div>

            {/* LinkedIn */}
            <div className="rounded-xl border border-white/5 bg-slate-950 p-4 space-y-3">
              <h4 className="text-xs font-bold text-white">LinkedIn Executive Narrative</h4>
              <p className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-white/5 whitespace-pre-line leading-relaxed">
                {projectData?.audiences?.creator?.social_posts?.linkedin_post}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: QUIZ */}
      {activeTab === 'quiz' && (
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 space-y-4 shadow-xl animate-fade-in">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <h3 className="text-base font-bold text-white">AI-Generated Assessment Questions</h3>
            <span className="text-xs font-mono text-emerald-400">Automatic Answer Key & Citations</span>
          </div>

          <div className="space-y-4">
            {(projectData?.audiences?.student?.quiz || []).map((q, i) => (
              <div key={i} className="rounded-xl border border-white/5 bg-slate-950 p-4 space-y-3 text-xs">
                <p className="font-bold text-white">{i + 1}. {q.question}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, optIdx) => (
                    <div 
                      key={optIdx} 
                      className={`p-2 rounded-lg border text-[11px] ${
                        optIdx === q.correct_index 
                          ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300 font-bold' 
                          : 'border-white/5 bg-slate-900 text-slate-400'
                      }`}
                    >
                      <span className="font-mono text-slate-500 mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                      <span>{opt}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-white/5">
                  <span>Source Explanation: {q.explanation}</span>
                  <button
                    onClick={() => onSeekTimestamp(q.source_timestamp === '01:24' ? 84 : 222, q.explanation)}
                    className="font-mono text-emerald-400 hover:underline flex items-center space-x-1"
                  >
                    <Play className="h-3 w-3 fill-current" />
                    <span>[{q.source_timestamp}]</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: CLAIMS */}
      {activeTab === 'claims' && (
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 space-y-4 shadow-xl animate-fade-in">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <h3 className="text-base font-bold text-white">Verified Ground Truth Claims</h3>
            <button
              onClick={() => onNavigate('truthtrace')}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300"
            >
              Open in TruthTrace Timeline →
            </button>
          </div>

          <div className="space-y-3">
            {claims.map((claim) => (
              <div key={claim.id} className="rounded-xl border border-white/5 bg-slate-950 p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-emerald-400 font-bold">[{claim.timestamp_formatted}]</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                    {claim.confidence}% {claim.status}
                  </span>
                </div>
                <p className="font-semibold text-slate-200">"{claim.text}"</p>
                <p className="text-[11px] text-slate-400 italic">Evidence: "{claim.evidence_quote}"</p>
                <div className="pt-1 flex justify-end">
                  <button
                    onClick={() => {
                      onSeekTimestamp(claim.timestamp_seconds, claim.text);
                      onNavigate('truthtrace');
                    }}
                    className="text-[11px] font-mono text-emerald-400 hover:underline flex items-center space-x-1"
                  >
                    <Play className="h-3 w-3 fill-current" />
                    <span>Seek to {claim.timestamp_formatted}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: TOPICS */}
      {activeTab === 'topics' && (
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 space-y-4 shadow-xl animate-fade-in">
          <h3 className="text-base font-bold text-white">Extracted Topics & Semantic Clusters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.map((top) => (
              <div key={top.id} className="rounded-xl border border-white/5 bg-slate-950 p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{top.name}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300">
                    {top.relevance}% Relevance
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">{top.category}</span>
                <p className="text-slate-400 leading-relaxed">{top.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
