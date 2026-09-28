import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AccessibilityModal from './components/AccessibilityModal';
import DashboardView from './views/DashboardView';
import UploadView from './views/UploadView';
import StoryGraphView from './views/StoryGraphView';
import AudienceLensView from './views/AudienceLensView';
import TruthTraceView from './views/TruthTraceView';
import ShortsStudioView from './views/ShortsStudioView';
import GeneratedContentView from './views/GeneratedContentView';
import SettingsView from './views/SettingsView';
import { INITIAL_DEMO_DATA } from './data/mockData';
import { 
  LayoutDashboard, 
  UploadCloud, 
  Network, 
  Users, 
  ShieldCheck, 
  Film, 
  FileText 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentAudience, setAudience] = useState('student');
  const [currentLanguage, setLanguage] = useState('en');
  const [projectData, setProjectData] = useState(INITIAL_DEMO_DATA);
  const [activeClaim, setActiveClaim] = useState(INITIAL_DEMO_DATA.claims[0]);
  const [cloudinaryStatus, setCloudinaryStatus] = useState({ configured: false, cloud_name: 'demo' });
  const [aiStatus, setAiStatus] = useState({ gemini_configured: false, engine: 'Deterministic Core' });
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    largeText: false,
    highContrast: false,
    simpleLanguage: false,
    alwaysShowTimestamps: true
  });

  const videoPlayerRef = useRef(null);

  // Fetch initial health and demo data from FastAPI backend
  useEffect(() => {
    async function initData() {
      try {
        const healthRes = await fetch('/api/health');
        if (healthRes.ok && healthRes.headers.get('content-type')?.includes('application/json')) {
          const health = await healthRes.json();
          if (health.cloudinary) setCloudinaryStatus(health.cloudinary);
          if (health.ai) setAiStatus(health.ai);
        }

        const demoRes = await fetch('/api/demo');
        if (demoRes.ok && demoRes.headers.get('content-type')?.includes('application/json')) {
          const demo = await demoRes.json();
          setProjectData(demo);
          if (demo.claims && demo.claims.length > 0) {
            setActiveClaim(demo.claims[0]);
          }
        }
      } catch (err) {
        console.info("Running with bundled autonomous demo engine:", err);
      }
    }
    initData();
  }, []);

  // Update root element classes when accessibility settings change
  useEffect(() => {
    const root = document.documentElement;
    if (accessibilitySettings.largeText) {
      root.classList.add('text-lg');
    } else {
      root.classList.remove('text-lg');
    }

    if (accessibilitySettings.highContrast) {
      root.classList.add('contrast-125');
    } else {
      root.classList.remove('contrast-125');
    }
  }, [accessibilitySettings]);

  const handleUpdateSetting = (key, val) => {
    setAccessibilitySettings(prev => ({ ...prev, [key]: val }));
  };

  const handleResetSettings = () => {
    setAccessibilitySettings({
      largeText: false,
      highContrast: false,
      simpleLanguage: false,
      alwaysShowTimestamps: true
    });
  };

  const handleSeekTimestamp = (seconds, label = '') => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current.seekTo(seconds, label);
    }
    const matchingClaim = projectData.claims.find(c => Math.abs(c.timestamp_seconds - seconds) < 5);
    if (matchingClaim) {
      setActiveClaim(matchingClaim);
    }
  };

  const handleLoadDemo = () => {
    setProjectData(INITIAL_DEMO_DATA);
    setActiveClaim(INITIAL_DEMO_DATA.claims[0]);
  };

  const handleUploadComplete = (uploadRes, transcript) => {
    if (uploadRes) {
      setProjectData(prev => ({
        ...prev,
        source: {
          ...prev.source,
          title: uploadRes.title || prev.source.title,
          cloudinary_url: uploadRes.secure_url || prev.source.cloudinary_url,
          public_id: uploadRes.public_id || prev.source.public_id,
          duration: uploadRes.duration || prev.source.duration,
          poster_url: uploadRes.poster_url || prev.source.poster_url
        }
      }));
    }
    setActiveTab('truthtrace');
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950 ${accessibilitySettings.highContrast ? 'border-white/30' : ''}`}>
      {/* Top Navbar */}
      <Navbar
        currentAudience={currentAudience}
        setAudience={setAudience}
        currentLanguage={currentLanguage}
        setLanguage={setLanguage}
        openAccessibility={() => setIsAccessibilityOpen(true)}
        currentProjectTitle={projectData?.source?.title}
        cloudinaryStatus={cloudinaryStatus}
        onResetDemo={handleLoadDemo}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          claimsCount={projectData?.claims?.length}
          currentAudience={currentAudience}
        />

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && (
            <DashboardView
              onNavigate={setActiveTab}
              onLoadDemo={handleLoadDemo}
              projectData={projectData}
              currentAudience={currentAudience}
              onSeekClaim={handleSeekTimestamp}
            />
          )}

          {activeTab === 'upload' && (
            <UploadView
              onUploadComplete={handleUploadComplete}
              onLoadDemo={handleLoadDemo}
              projectData={projectData}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'graph' && (
            <StoryGraphView
              graphData={projectData?.story_graph}
              onSeekTimestamp={handleSeekTimestamp}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'audience' && (
            <AudienceLensView
              currentAudience={currentAudience}
              setAudience={setAudience}
              audienceData={projectData?.audiences || {}}
              onSeekTimestamp={handleSeekTimestamp}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'truthtrace' && (
            <TruthTraceView
              claims={projectData?.claims || []}
              sourceMetadata={projectData?.source}
              activeClaim={activeClaim}
              setActiveClaim={setActiveClaim}
              videoPlayerRef={videoPlayerRef}
              onSeekClaim={handleSeekTimestamp}
            />
          )}

          {activeTab === 'shorts' && (
            <ShortsStudioView
              sourceMetadata={projectData?.source}
              shortsPresets={projectData?.shorts_presets || []}
              onSeekVideo={handleSeekTimestamp}
            />
          )}

          {activeTab === 'content' && (
            <GeneratedContentView
              projectData={projectData}
              currentAudience={currentAudience}
              currentLanguage={currentLanguage}
              translations={INITIAL_DEMO_DATA.translations}
              onSeekTimestamp={handleSeekTimestamp}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              cloudinaryStatus={cloudinaryStatus}
              aiStatus={aiStatus}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-lg px-2 py-2 flex items-center justify-around z-30 sticky bottom-0">
        {[
          { id: 'dashboard', label: 'Dash', icon: LayoutDashboard },
          { id: 'upload', label: 'Upload', icon: UploadCloud },
          { id: 'graph', label: 'Graph', icon: Network },
          { id: 'audience', label: 'Audience', icon: Users },
          { id: 'truthtrace', label: 'TruthTrace', icon: ShieldCheck, highlight: true },
          { id: 'shorts', label: 'Shorts', icon: Film },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center p-1 text-[10px] ${
                isActive 
                  ? item.highlight ? 'text-emerald-400 font-bold' : 'text-white font-bold'
                  : 'text-slate-400'
              }`}
            >
              <Icon className="h-4 w-4 mb-0.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Accessibility Modal */}
      <AccessibilityModal
        isOpen={isAccessibilityOpen}
        onClose={() => setIsAccessibilityOpen(false)}
        settings={accessibilitySettings}
        updateSetting={handleUpdateSetting}
        resetSettings={handleResetSettings}
      />
    </div>
  );
}
