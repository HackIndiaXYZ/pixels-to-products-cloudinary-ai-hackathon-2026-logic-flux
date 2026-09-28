import React from 'react';
import { 
  LayoutDashboard, 
  UploadCloud, 
  Network, 
  Users, 
  ShieldCheck, 
  FileText, 
  Film, 
  Settings,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'upload', label: 'Upload Workspace', icon: UploadCloud, badge: 'Cloudinary' },
  { id: 'graph', label: 'Story Graph', icon: Network },
  { id: 'audience', label: 'Audience Lens', icon: Users, badge: '5 Personas' },
  { id: 'truthtrace', label: 'TruthTrace', icon: ShieldCheck, highlight: true, badge: 'Core' },
  { id: 'content', label: 'Generated Content', icon: FileText },
  { id: 'shorts', label: 'Create Short', icon: Film, badge: 'Cloudinary' },
  { id: 'settings', label: 'Architecture & Keys', icon: Settings },
];

export default function Sidebar({ activeTab, setActiveTab, claimsCount, currentAudience }) {
  return (
    <aside className="w-64 shrink-0 border-r border-white/10 bg-slate-950/70 backdrop-blur-xl flex flex-col justify-between hidden md:flex">
      <div className="p-4 space-y-6">
        {/* Navigation Section */}
        <div>
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Navigation
          </p>
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                    isActive
                      ? item.highlight
                        ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/15 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/10'
                        : 'bg-slate-900 text-white border border-white/10 shadow-sm'
                      : item.highlight
                        ? 'text-emerald-400 hover:bg-emerald-950/40 hover:text-emerald-300'
                        : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`h-4 w-4 transition-transform group-hover:scale-110 ${
                      isActive 
                        ? (item.highlight ? 'text-emerald-400' : 'text-slate-200')
                        : (item.highlight ? 'text-emerald-400/80' : 'text-slate-400')
                    }`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold tracking-wide ${
                      item.highlight 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-800 text-slate-300 border border-white/5'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Feature Spotlight Card */}
        <div className="rounded-xl border border-emerald-500/20 bg-gradient-to-b from-emerald-950/30 to-slate-950/60 p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-emerald-400 flex items-center space-x-1">
              <ShieldCheck className="h-3.5 w-3.5 mr-1" />
              TruthTrace Active
            </span>
            <span className="text-[10px] text-emerald-300/80 bg-emerald-900/40 px-1.5 py-0.2 rounded">
              {claimsCount || 6} Anchors
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Every synthesized claim is tethered to verifiable audio-visual milliseconds on Cloudinary.
          </p>
          <button
            onClick={() => setActiveTab('truthtrace')}
            className="w-full flex items-center justify-center space-x-1 text-[11px] font-medium text-emerald-300 hover:text-emerald-200 pt-1"
          >
            <span>Jump to Timeline</span>
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-white/10 space-y-2 bg-slate-950/40">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>Cloudinary Media Engine</span>
          <span className="text-emerald-400 font-mono text-[10px]">v2.4 CDN</span>
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>Active Lens</span>
          <span className="capitalize font-semibold text-slate-200">{currentAudience}</span>
        </div>
      </div>
    </aside>
  );
}
