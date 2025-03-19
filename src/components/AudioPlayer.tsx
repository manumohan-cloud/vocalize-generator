
import React, { useRef, useState, useEffect } from "react";
import { Speaker, Pause, Play, RotateCcw, Volume1, Volume2, VolumeX } from "lucide-react";

interface AudioPlayerProps {
  audioData: ArrayBuffer | null;
  isLoading?: boolean;
  className?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioData,
  isLoading = false,
  className = "",
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  // Convert ArrayBuffer to Blob URL when audioData changes
  useEffect(() => {
    if (audioData) {
      // Revoke previous URL to prevent memory leaks
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }

      const blob = new Blob([audioData], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      
      // Reset state
      setIsPlaying(false);
      setProgress(0);
    }
    
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioData]);

  // Set up audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioRef.current]);

  // Play/pause logic
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Volume change
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  // Format time (seconds -> mm:ss)
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Handle seek when clicking on the progress bar
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !audioUrl) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  // Handle volume control
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  // Reset audio to beginning
  const handleReset = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    setProgress(0);
    setIsPlaying(false);
  };

  // Render volume icon based on level
  const renderVolumeIcon = () => {
    if (volume === 0) return <VolumeX size={16} />;
    if (volume < 0.5) return <Volume1 size={16} />;
    return <Volume2 size={16} />;
  };

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center h-20 ${className}`}>
        <div className="flex flex-col items-center justify-center">
          <Speaker size={24} className="text-primary/50 animate-pulse-subtle" />
          <span className="mt-2 text-xs text-muted-foreground">Generating audio...</span>
        </div>
      </div>
    );
  }

  if (!audioUrl) {
    return (
      <div className={`flex items-center justify-center h-20 ${className}`}>
        <div className="flex flex-col items-center justify-center">
          <Speaker size={24} className="text-muted-foreground/30" />
          <span className="mt-2 text-xs text-muted-foreground/70">No audio generated yet</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-lg border border-border bg-white/90 backdrop-blur-sm p-4 ${className}`}>
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      {/* Progress bar */}
      <div
        className="h-1.5 bg-secondary rounded-full mb-3 cursor-pointer relative"
        onClick={handleSeek}
      >
        <div
          className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-100"
          style={{ width: `${(progress / duration) * 100}%` }}
        />
      </div>
      
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          
          <button
            onClick={handleReset}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
            aria-label="Reset"
          >
            <RotateCcw size={14} />
          </button>
          
          <div className="relative">
            <button
              onMouseEnter={() => setShowVolumeControl(true)}
              onMouseLeave={() => setShowVolumeControl(false)}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
              aria-label="Volume"
            >
              {renderVolumeIcon()}
            </button>
            
            {showVolumeControl && (
              <div 
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-white shadow-md rounded-lg border border-border animate-fade-in"
                onMouseEnter={() => setShowVolumeControl(true)}
                onMouseLeave={() => setShowVolumeControl(false)}
              >
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-24 accent-primary cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>
        
        {/* Time display */}
        <div className="text-xs text-muted-foreground">
          {formatTime(progress)} / {formatTime(duration)}
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
