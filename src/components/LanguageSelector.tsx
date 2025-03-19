
import React from "react";
import { Language } from "../services/elevenlabs";

interface LanguageSelectorProps {
  languages: Language[];
  selectedLanguage: Language | null;
  onSelectLanguage: (language: Language) => void;
  disabled?: boolean;
  className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  languages,
  selectedLanguage,
  onSelectLanguage,
  disabled = false,
  className = "",
}) => {
  return (
    <div className={`w-full ${className}`}>
      <label className="block text-sm font-medium text-foreground mb-1.5">
        Language
      </label>
      <div className="select-wrapper">
        <select
          value={selectedLanguage?.id || ""}
          onChange={(e) => {
            const language = languages.find((l) => l.id === e.target.value);
            if (language) onSelectLanguage(language);
          }}
          disabled={disabled || languages.length === 0}
          className="w-full p-3 rounded-lg border border-input bg-white/90 backdrop-blur-sm
            transition-all duration-200 ease-in-out shadow-sm
            focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/60
            disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <option value="" disabled>
            {languages.length === 0
              ? "No languages available"
              : "Select a language"}
          </option>
          {languages.map((language) => (
            <option key={language.id} value={language.id}>
              {language.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LanguageSelector;
