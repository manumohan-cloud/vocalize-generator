
import React from "react";
import { models, Model } from "../services/elevenlabs";

interface ModelSelectorProps {
  selectedModel: Model | null;
  onSelectModel: (model: Model) => void;
  className?: string;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModel,
  onSelectModel,
  className = "",
}) => {
  return (
    <div className={`w-full ${className}`}>
      <label className="block text-sm font-medium text-foreground mb-1.5">
        TTS Model
      </label>
      <div className="select-wrapper">
        <select
          value={selectedModel?.id || ""}
          onChange={(e) => {
            const model = models.find((m) => m.id === e.target.value);
            if (model) onSelectModel(model);
          }}
          className="w-full p-3 rounded-lg border border-input bg-white/90 backdrop-blur-sm
            transition-all duration-200 ease-in-out shadow-sm
            focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/60"
        >
          <option value="" disabled>
            Select a model
          </option>
          {models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>
      </div>
      {selectedModel && (
        <div className="mt-2 text-xs text-muted-foreground animate-fade-in">
          {selectedModel.description}
        </div>
      )}
    </div>
  );
};

export default ModelSelector;
