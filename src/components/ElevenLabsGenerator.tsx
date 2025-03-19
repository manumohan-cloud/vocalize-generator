
import React, { useState, useEffect } from "react";
import { Play, Sparkles } from "lucide-react";
import TextArea from "./TextArea";
import ModelSelector from "./ModelSelector";
import LanguageSelector from "./LanguageSelector";
import VoiceSelector from "./VoiceSelector";
import AudioPlayer from "./AudioPlayer";
import Spinner from "./ui-elements/Spinner";
import { 
  Model, 
  Language, 
  Voice, 
  models, 
  topVoices,
  fetchVoices,
  generateSpeech
} from "../services/elevenlabs";
import { toast } from "sonner";

const ElevenLabsGenerator: React.FC = () => {
  // State
  const [text, setText] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [audioData, setAudioData] = useState<ArrayBuffer | null>(null);
  const [voices, setVoices] = useState<Voice[]>([]);

  // Reset language when model changes
  useEffect(() => {
    if (selectedModel) {
      setSelectedLanguage(selectedModel.supportedLanguages[0] || null);
    } else {
      setSelectedLanguage(null);
    }
  }, [selectedModel]);

  // Set voices based on language
  useEffect(() => {
    if (selectedLanguage) {
      // Get voices for the selected language or fall back to English
      const languageVoices = topVoices[selectedLanguage.id] || topVoices.en;
      setVoices(languageVoices);
      setSelectedVoice(languageVoices[0] || null);
    } else {
      setVoices([]);
      setSelectedVoice(null);
    }
  }, [selectedLanguage]);

  // Generate speech
  const handleGenerate = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text to generate speech.");
      return;
    }

    if (!selectedModel) {
      toast.error("Please select a model.");
      return;
    }

    if (!selectedVoice) {
      toast.error("Please select a voice.");
      return;
    }

    try {
      setIsGenerating(true);
      
      const result = await generateSpeech(
        text,
        selectedVoice.voice_id,
        selectedModel.id
      );
      
      setAudioData(result);
      toast.success("Audio generated successfully!");
    } catch (error) {
      console.error("Failed to generate speech:", error);
      toast.error("Failed to generate speech. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-8 text-center animate-slide-down">
        <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium mb-3">
          Text-to-Speech
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
          ElevenLabs Generator
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Transform your text into natural-sounding speech with ElevenLabs' advanced AI technology.
        </p>
      </div>

      <div className="space-y-6 appear stagger-1">
        {/* Text input */}
        <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-border shadow-sm">
          <h2 className="text-lg font-medium mb-4 flex items-center">
            <Sparkles size={18} className="mr-2 text-primary" />
            Enter Your Text
          </h2>
          <TextArea 
            value={text} 
            onChange={setText} 
            placeholder="Type or paste your text here..." 
            maxLength={2000}
          />
        </div>

        {/* Options */}
        <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-border shadow-sm appear stagger-2">
          <h2 className="text-lg font-medium mb-4">Voice Selection</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ModelSelector 
              selectedModel={selectedModel} 
              onSelectModel={setSelectedModel} 
            />
            
            <LanguageSelector 
              languages={selectedModel?.supportedLanguages || []} 
              selectedLanguage={selectedLanguage} 
              onSelectLanguage={setSelectedLanguage} 
              disabled={!selectedModel}
            />
            
            <VoiceSelector 
              voices={voices}
              selectedVoice={selectedVoice}
              onSelectVoice={setSelectedVoice}
              disabled={!selectedLanguage}
            />
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !selectedModel || !selectedVoice || !text.trim()}
              className="
                flex items-center gap-2 px-6 py-2.5 rounded-lg 
                bg-primary text-white font-medium shadow-sm
                hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200
              "
            >
              {isGenerating ? (
                <>
                  <Spinner size="sm" className="border-white" />
                  Generating...
                </>
              ) : (
                <>
                  <Play size={16} />
                  Generate Speech
                </>
              )}
            </button>
          </div>
        </div>

        {/* Audio player */}
        <div className="appear stagger-3">
          <AudioPlayer 
            audioData={audioData} 
            isLoading={isGenerating} 
          />
        </div>
      </div>
    </div>
  );
};

export default ElevenLabsGenerator;
