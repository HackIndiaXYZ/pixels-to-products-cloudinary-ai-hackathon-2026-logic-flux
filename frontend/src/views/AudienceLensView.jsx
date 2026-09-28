import React, { useState } from 'react';
import { 
  Users, 
  Sparkles, 
  GraduationCap, 
  Video, 
  Briefcase, 
  Newspaper, 
  Globe2, 
  Copy, 
  Check, 
  Clock, 
  Play, 
  HelpCircle, 
  Lightbulb, 
  Flame, 
  Share2, 
  TrendingUp, 
  ShieldCheck,
  FileCheck
} from 'lucide-react';
import { AUDIENCE_OPTIONS } from '../components/Navbar';

export default function AudienceLensView({ 
  currentAudience, 
  setAudience, 
  audienceData, 
  onSeekTimestamp,
  onNavigate
}) {
  const [copiedSection, setCopiedSection] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [revealedQuiz, setRevealedQuiz] = useState({});

  const data = audienceData[currentAudience] || audienceData['general'] || {};

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(typeof text === 'string' ? text : JSON.stringify(text, null, 2));
    setCopiedSection(key);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleSelectQuiz = (qId, optionIdx) => {
    setQuizAnswers(prev => ({ ...prev, [qId]: optionIdx }));
    setRevealedQuiz(prev => ({ ...prev, [qId]: true }));
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      {/* Header & Persona Selector Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center space-x-2">
              <Users className="h-7 w-7 text-emerald-400" />
              <span>Audience Lens</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              The same master multimedia source, adapted into 5 fundamentally distinct cognitive experiences.
            </p>
          </div>
        </div>

        {/* Big Interactive 5 Audience Cards Switcher */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {AUDIENCE_OPTIONS.map((item) => {
            const isActive = currentAudience === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setAudience(item.id)}
                className={`flex flex-col items-start p-4 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                  isActive
                    ? 'border-emerald-400 bg-emerald-950/40 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/30'
                    : 'border-white/10 bg-slate-900/60 hover:bg-slate-900 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="text-2xl">{item.icon}</span>
                  {isActive && (
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </div>
                <h3 className={`text-sm font-bold tracking-tight ${isActive ? 'text-white' : 'text-slate-200'}`}>
                  {item.label}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                  {item.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lens Hero Banner */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-6 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
            ACTIVE LENS: {currentAudience.toUpperCase()}
          </span>
          <button
            onClick={() => handleCopy(data, 'all')}
            className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white bg-slate-800/80 px-2.5 py-1 rounded-lg border border-white/5"
          >
            {copiedSection === 'all' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copiedSection === 'all' ? 'Copied Bundle' : 'Copy All'}</span>
          </button>
        </div>
        <h2 className="text-xl font-bold text-white">{data.lens_title}</h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">{data.tagline}</p>
      </div>

      {/* AUDIENCE SPECIFIC RENDERERS */}

      {/* 1. STUDENT LENS */}
      {currentAudience === 'student' && (
        <div className="space-y-6">
          {/* Simple Explanation */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Lightbulb className="h-4 w-4 text-emerald-400" />
              <span>Intuitive Plain-English Breakdown</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-white/5">
              {data.simple_explanation}
            </p>
          </div>

          {/* Structured Study Notes with Timestamps */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <GraduationCap className="h-4 w-4 text-cyan-400" />
              <span>Structured Study Notes</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.study_notes?.map((note, idx) => (
                <div key={idx} className="rounded-xl border border-white/5 bg-slate-950 p-4 space-y-2 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">{note.topic}</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{note.point}</p>
                  </div>
                  {note.source_timestamp && (
                    <button
                      onClick={() => {
                        const sec = note.source_timestamp === '00:45' ? 45 : note.source_timestamp === '01:24' ? 84 : note.source_timestamp === '03:42' ? 222 : 310;
                        onSeekTimestamp(sec, note.point);
                      }}
                      className="inline-flex items-center space-x-1.5 text-[11px] font-mono font-medium text-emerald-400 hover:text-emerald-300 pt-2"
                    >
                      <Play className="h-3 w-3 fill-current" />
                      <span>Jump to {note.source_timestamp}</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Key Concepts Flashcards */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white">Key Concepts & Definitions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.key_concepts?.map((concept, idx) => (
                <div key={idx} className="rounded-xl border border-white/5 bg-slate-950/80 p-4 space-y-1">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">Concept #{idx + 1}</span>
                  <h4 className="text-xs font-bold text-white">{concept.term}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{concept.definition}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Quiz */}
          <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-emerald-950/20 to-slate-900/60 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <HelpCircle className="h-4 w-4 text-emerald-400" />
                <span>Interactive Concept Check Quiz</span>
              </h3>
              <span className="text-xs text-emerald-300 font-mono">4 Questions</span>
            </div>

            <div className="space-y-4">
              {data.quiz?.map((q) => {
                const isAnswered = revealedQuiz[q.id];
                const selectedIdx = quizAnswers[q.id];
                const isCorrect = selectedIdx === q.correct_index;

                return (
                  <div key={q.id} className="rounded-xl border border-white/10 bg-slate-950 p-4 space-y-3">
                    <p className="text-xs font-semibold text-slate-200">{q.question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isThisSelected = selectedIdx === optIdx;
                        let btnStyle = 'border-white/5 bg-slate-900 text-slate-300 hover:bg-slate-800';

                        if (isAnswered) {
                          if (optIdx === q.correct_index) {
                            btnStyle = 'border-emerald-500 bg-emerald-950/60 text-emerald-200 font-bold';
                          } else if (isThisSelected) {
                            btnStyle = 'border-rose-500 bg-rose-950/60 text-rose-200';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectQuiz(q.id, optIdx)}
                            className={`p-2.5 rounded-lg border text-left text-xs transition-colors ${btnStyle}`}
                          >
                            <span className="font-mono text-slate-500 mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {isAnswered && (
                      <div className={`p-3 rounded-lg text-xs space-y-1 ${isCorrect ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-500/30' : 'bg-amber-950/50 text-amber-200 border border-amber-500/30'}`}>
                        <div className="flex items-center justify-between">
                          <span className="font-bold">{isCorrect ? '✓ Correct Answer!' : '✗ Review Source Moment:'}</span>
                          {q.source_timestamp && (
                            <button
                              onClick={() => {
                                const sec = q.source_timestamp === '01:24' ? 84 : q.source_timestamp === '03:42' ? 222 : q.source_timestamp === '05:10' ? 310 : 675;
                                onSeekTimestamp(sec, q.explanation);
                              }}
                              className="font-mono text-emerald-400 hover:underline flex items-center space-x-1"
                            >
                              <Play className="h-3 w-3 fill-current" />
                              <span>View Source ({q.source_timestamp})</span>
                            </button>
                          )}
                        </div>
                        <p className="text-[11px] opacity-90">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 2. CREATOR LENS */}
      {currentAudience === 'creator' && (
        <div className="space-y-6">
          {/* Viral Hooks */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Flame className="h-4 w-4 text-orange-400" />
              <span>High-Retention Video Hooks</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.short_video_hooks?.map((h, i) => (
                <div key={i} className="rounded-xl border border-white/5 bg-slate-950 p-4 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-950/60 text-orange-300 border border-orange-500/30">
                        {h.style}
                      </span>
                      <span className="text-[10px] text-slate-400">{h.target_platform}</span>
                    </div>
                    <p className="text-xs text-slate-200 font-medium leading-relaxed">{h.hook}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <button
                      onClick={() => handleCopy(h.hook, `hook-${i}`)}
                      className="text-[11px] text-slate-400 hover:text-white flex items-center space-x-1"
                    >
                      {copiedSection === `hook-${i}` ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      <span>Copy Hook</span>
                    </button>
                    <button
                      onClick={() => onSeekTimestamp(84, h.hook)}
                      className="text-[11px] font-mono text-emerald-400 hover:underline flex items-center space-x-1"
                    >
                      <Play className="h-3 w-3 fill-current" />
                      <span>{h.source_timestamp}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Short-Form Video Script */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Video className="h-4 w-4 text-cyan-400" />
                  <span>{data.short_form_script?.title}</span>
                </h3>
                <p className="text-xs text-slate-400">
                  {data.short_form_script?.duration} • {data.short_form_script?.aspect_ratio}
                </p>
              </div>
              <button
                onClick={() => onNavigate('shorts')}
                className="rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-1.5 text-xs transition-colors"
              >
                Render in Shorts Studio
              </button>
            </div>

            <div className="space-y-3">
              {data.short_form_script?.sections?.map((sec, i) => (
                <div key={i} className="rounded-xl border border-white/5 bg-slate-950 p-3.5 space-y-2 text-xs">
                  <span className="font-mono text-[10px] text-cyan-400 font-bold">{sec.time}</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-2.5 rounded bg-slate-900/80 border border-white/5">
                      <span className="text-[10px] text-slate-400 block font-semibold">Visual Cue:</span>
                      <p className="text-slate-300 mt-0.5">{sec.visual}</p>
                    </div>
                    <div className="p-2.5 rounded bg-slate-900/80 border border-white/5">
                      <span className="text-[10px] text-slate-400 block font-semibold">Voiceover:</span>
                      <p className="text-emerald-300 font-medium mt-0.5">{sec.voiceover}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Posts Thread */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Share2 className="h-4 w-4 text-teal-400" />
              <span>Multi-Platform Social Copy</span>
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Twitter Thread */}
              <div className="rounded-xl border border-white/5 bg-slate-950 p-4 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="font-bold text-white">X / Twitter Thread</span>
                  <button
                    onClick={() => handleCopy(data.social_posts?.twitter_thread?.join('\n\n'), 'twitter')}
                    className="text-slate-400 hover:text-white"
                  >
                    {copiedSection === 'twitter' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  </button>
                </div>
                <div className="space-y-2 text-slate-300 font-mono text-[11px]">
                  {data.social_posts?.twitter_thread?.map((t, idx) => (
                    <p key={idx} className="bg-slate-900/50 p-2 rounded">{t}</p>
                  ))}
                </div>
              </div>

              {/* LinkedIn Breakdown */}
              <div className="rounded-xl border border-white/5 bg-slate-950 p-4 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="font-bold text-white">LinkedIn Executive Post</span>
                  <button
                    onClick={() => handleCopy(data.social_posts?.linkedin_post, 'linkedin')}
                    className="text-slate-400 hover:text-white"
                  >
                    {copiedSection === 'linkedin' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  </button>
                </div>
                <p className="text-slate-300 whitespace-pre-line leading-relaxed bg-slate-900/50 p-3 rounded text-[11px]">
                  {data.social_posts?.linkedin_post}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. BUSINESS LENS */}
      {currentAudience === 'business' && (
        <div className="space-y-6">
          {/* Executive Summary */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Briefcase className="h-4 w-4 text-emerald-400" />
              <span>Executive Strategic Summary</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-white/5">
              {data.executive_summary}
            </p>
          </div>

          {/* Key Insights & ROI Metrics */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-cyan-400" />
              <span>Quantitative Impact Metrics</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.key_insights?.map((ins, i) => (
                <div key={i} className="rounded-xl border border-white/5 bg-slate-950 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400">{ins.metric}</span>
                    <button
                      onClick={() => onSeekTimestamp(ins.source_timestamp === '01:24' ? 84 : 310, ins.description)}
                      className="font-mono text-[10px] text-slate-400 hover:text-emerald-300 flex items-center space-x-1"
                    >
                      <Play className="h-3 w-3 fill-current" />
                      <span>{ins.source_timestamp}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{ins.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 90-Day Implementation Roadmap */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white">90-Day Enterprise Execution Roadmap</h3>
            <div className="space-y-3">
              {data.action_points?.map((pt, i) => (
                <div key={i} className="rounded-xl border border-white/5 bg-slate-950 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <span className="font-mono font-bold text-emerald-400">{pt.phase}</span>
                    <p className="text-slate-300 leading-relaxed">{pt.action}</p>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 rounded bg-slate-900 text-slate-400 shrink-0 self-start sm:self-center border border-white/5">
                    Phase 0{i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. JOURNALIST LENS */}
      {currentAudience === 'journalist' && (
        <div className="space-y-6">
          {/* Neutral Summary */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Newspaper className="h-4 w-4 text-cyan-400" />
              <span>Objective Journalistic Briefing</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-white/5">
              {data.neutral_summary}
            </p>
          </div>

          {/* Audited Claims & Corroboration */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <FileCheck className="h-4 w-4 text-emerald-400" />
              <span>Fact-Checked Claims & Verification Status</span>
            </h3>
            <div className="space-y-3">
              {data.key_claims?.map((c, i) => (
                <div key={i} className="rounded-xl border border-white/5 bg-slate-950 p-4 space-y-2 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <p className="font-semibold text-slate-200">"{c.claim}"</p>
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold shrink-0 self-start sm:self-center ${
                      c.status.includes('Verified') 
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' 
                        : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                    }`}>
                      {c.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-white/5">
                    <span>Evidence Note: {c.notes}</span>
                    <button
                      onClick={() => onSeekTimestamp(c.source === '01:24' ? 84 : c.source === '05:10' ? 310 : 675, c.claim)}
                      className="font-mono text-emerald-400 hover:underline flex items-center space-x-1 shrink-0 ml-2"
                    >
                      <Play className="h-3 w-3 fill-current" />
                      <span>Timestamp: {c.source}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Primary Sources & Entities */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white">Entity Credentials & Attribution</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.people_and_entities?.map((ent, i) => (
                <div key={i} className="rounded-xl border border-white/5 bg-slate-950 p-4 space-y-1.5 text-xs">
                  <h4 className="font-bold text-slate-200">{ent.entity}</h4>
                  <p className="text-[11px] text-cyan-400 font-medium">{ent.title}</p>
                  <p className="text-[11px] text-slate-400 leading-relaxed pt-1">{ent.credibility}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. GENERAL LENS */}
      {currentAudience === 'general' && (
        <div className="space-y-6">
          {/* Simple Summary */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Globe2 className="h-4 w-4 text-emerald-400" />
              <span>Everyday Summary</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-white/5">
              {data.simple_summary}
            </p>
          </div>

          {/* Key Takeaways */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 space-y-3">
            <h3 className="text-sm font-bold text-white">Key Takeaways</h3>
            <div className="space-y-2">
              {data.key_takeaways?.map((item, idx) => (
                <div key={idx} className="rounded-xl border border-white/5 bg-slate-950 p-3.5 text-xs text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Why It Matters */}
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-6 space-y-2">
            <h3 className="text-sm font-bold text-emerald-300">Why It Matters To You</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {data.why_it_matters}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
