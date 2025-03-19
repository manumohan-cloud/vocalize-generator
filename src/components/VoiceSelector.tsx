
import React from "react";
import { Voice } from "../services/elevenlabs";

interface VoiceSelectorProps {
  voices: Voice[];
  selectedVoice: Voice | null;
  onSelectVoice: (voice: Voice) => void;
  disabled?: boolean;
  className?: string;
}

const VoiceSelector: React.FC<VoiceSelectorProps> = ({
  voices,
  selectedVoice,
  onSelectVoice,
  disabled = false,
  className = "",
}) => {
  return (
    <div className={`w-full ${className}`}>
      <label className="block text-sm font-medium text-foreground mb-1.5">
        Voice
      </label>
      <div className="select-wrapper">
        <select
          value={selectedVoice?.voice_id || ""}
          onChange={(e) => {
            const voice = voices.find((v) => v.voice_id === e.target.value);
            if (voice) onSelectVoice(voice);
          }}
          disabled={disabled || voices.length === 0}
          className="w-full p-3 rounded-lg border border-input bg-white/90 backdrop-blur-sm
            transition-all duration-200 ease-in-out shadow-sm
            focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/60
            disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <option value="" disabled>
            {voices.length === 0 ? "No voices available" : "Select a voice"}
          </option>
          {voices.map((voice) => (
            <option key={voice.voice_id} value={voice.voice_id}>
              {voice.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default VoiceSelector;
