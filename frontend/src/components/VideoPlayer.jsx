import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  ShieldCheck, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

const VideoPlayer = forwardRef(function VideoPlayer(
  {
    videoUrl,
    posterUrl,
    title,
    duration = 768,
    claims = [],
    activeClaim = null,
    onTimeUpdate = null,
    onSeek = null
  },
  ref
) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [seekFlash, setSeekFlash] = useState(null);

  useImperativeHandle(ref, () => ({
    seekTo: (seconds, claimText = '') => {
      if (videoRef.current) {
        videoRef.current.currentTime = seconds;
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
        setSeekFlash({
          seconds,
          text: claimText,
          timeFormatted: formatTime(seconds)
        });
        setTimeout(() => setSeekFlash(null), 3500);
      }
    },
    getCurrentTime: () => videoRef.current?.currentTime || 0,
    play: () => videoRef.current?.play(),
    pause: () => videoRef.current?.pause()
  }));

  const formatTime = (totalSeconds) => {
    const sec = Math.floor(totalSeconds || 0);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime;
      setCurrentTime(time);
      if (onTimeUpdate) onTimeUpdate(time);
    }
  };

  const handleScrubberChange = (e) => {
    const targetTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
      if (onSeek) onSeek(targetTime);
    }
  };

  const handleToggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-950 shadow-2xl group">
      {/* Video Element */}
      <div className="relative aspect-video w-full bg-black flex items-center justify-center">
        <video
          ref={videoRef}
          src={videoUrl || "https://res.cloudinary.com/demo/video/upload/q_auto,f_auto/docs/walking_talking.mp4"}
          poster={posterUrl || "https://res.cloudinary.com/demo/video/upload/so_2,c_fill,w_640,h_360/docs/walking_talking.jpg"}
          className="w-full h-full object-contain"
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          playsInline
        />

        {/* Cloudinary Authenticated Stream Pill */}
        <div className="absolute top-3 left-3 flex items-center space-x-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 px-2.5 py-1 text-[11px] font-medium text-slate-300 pointer-events-none">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
          <span>Cloudinary Stream</span>
        </div>

        {/* TruthTrace Seek Flash Overlay */}
        {seekFlash && (
          <div className="absolute inset-x-4 top-4 z-20 flex items-center justify-center animate-fade-in pointer-events-none">
            <div className="flex items-center space-x-2 rounded-xl bg-emerald-950/90 border border-emerald-500/50 backdrop-blur-md px-4 py-2.5 shadow-2xl text-emerald-300">
              <ShieldCheck className="h-4 w-4 text-emerald-400 animate-bounce" />
              <div>
                <p className="text-xs font-bold text-white flex items-center space-x-1">
                  <span>TruthTrace Verified:</span>
                  <span className="font-mono text-emerald-400">{seekFlash.timeFormatted}</span>
                </p>
                {seekFlash.text && (
                  <p className="text-[11px] text-emerald-200/90 max-w-sm truncate">
                    "{seekFlash.text}"
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Center Play Button Overlay when paused */}
        {!isPlaying && (
          <button
            onClick={handleTogglePlay}
            className="absolute z-10 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/90 text-slate-950 hover:scale-110 hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20"
          >
            <Play className="h-7 w-7 fill-current ml-1" />
          </button>
        )}
      </div>

      {/* Control Bar & Timeline Scrubber */}
      <div className="p-3 bg-gradient-to-t from-slate-950 via-slate-900/95 to-slate-900/80 border-t border-white/5 space-y-2">
        {/* Timeline Slider with TruthTrace Claim Pins */}
        <div className="relative w-full pt-2 pb-1">
          {/* Claim markers along the timeline */}
          <div className="absolute top-0 left-0 right-0 h-2 pointer-events-none">
            {claims.map((claim) => {
              const totalSec = duration || 768;
              const percent = Math.min(100, Math.max(0, (claim.timestamp_seconds / totalSec) * 100));
              const isSelected = activeClaim?.id === claim.id;

              return (
                <div
                  key={claim.id}
                  style={{ left: `${percent}%` }}
                  className={`absolute top-0 -translate-x-1/2 flex flex-col items-center group/pin cursor-pointer pointer-events-auto`}
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime = claim.timestamp_seconds;
                      videoRef.current.play().catch(() => {});
                      setIsPlaying(true);
                    }
                  }}
                  title={`[${claim.timestamp_formatted}] ${claim.text}`}
                >
                  <div
                    className={`h-2.5 w-2.5 rounded-full transition-all ${
                      isSelected
                        ? 'bg-emerald-400 ring-4 ring-emerald-500/40 scale-125'
                        : claim.verified
                          ? 'bg-teal-400 hover:scale-150 hover:bg-emerald-300'
                          : 'bg-amber-400 hover:scale-150'
                    }`}
                  />
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-5 hidden group-hover/pin:block z-30 whitespace-nowrap rounded-md bg-slate-900 border border-white/10 px-2 py-1 text-[10px] text-slate-200 shadow-xl">
                    <span className="font-mono text-emerald-400">[{claim.timestamp_formatted}]</span> {claim.category}
                  </div>
                </div>
              );
            })}
          </div>

          <input
            type="range"
            min={0}
            max={duration || 768}
            step={0.5}
            value={currentTime}
            onChange={handleScrubberChange}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none"
          />
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleTogglePlay}
              className="text-slate-200 hover:text-emerald-400 transition-colors p-1"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>

            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = 0;
                  videoRef.current.play().catch(() => {});
                  setIsPlaying(true);
                }
              }}
              className="text-slate-400 hover:text-white transition-colors p-1"
              title="Restart"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={handleToggleMute}
              className="text-slate-400 hover:text-white transition-colors p-1"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>

            <div className="font-mono text-xs text-slate-400 space-x-1">
              <span className="text-slate-200 font-semibold">{formatTime(currentTime)}</span>
              <span>/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              {title || "The Future of AI and Digital Media"}
            </span>

            <button
              onClick={handleFullscreen}
              className="text-slate-400 hover:text-white transition-colors p-1"
              title="Fullscreen"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default VideoPlayer;
