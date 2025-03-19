
import { toast } from "sonner";

// API key from environment or hardcoded (only for demo)
const API_KEY = "sk_14e09e0927d4a6815575cb003a80fd0f86897427f76d48bd";

// ElevenLabs API endpoints
const BASE_URL = "https://api.elevenlabs.io/v1";

// Model definitions with supported languages
export interface Model {
  id: string;
  name: string;
  description: string;
  supportedLanguages: Language[];
}

export interface Language {
  id: string;
  name: string;
}

export interface Voice {
  voice_id: string;
  name: string;
  preview_url?: string;
  category?: string;
}

// Models data with supported languages
export const models: Model[] = [
  {
    id: "eleven_multilingual_v2",
    name: "Eleven Multilingual v2",
    description: "Our most life-like, emotionally rich model in 29 languages. Best for voice overs, audiobooks, post-production.",
    supportedLanguages: [
      { id: "en", name: "English" },
      { id: "de", name: "German" },
      { id: "es", name: "Spanish" },
      { id: "fr", name: "French" },
      { id: "it", name: "Italian" },
      { id: "ja", name: "Japanese" },
      { id: "ko", name: "Korean" },
      { id: "pl", name: "Polish" },
      { id: "pt", name: "Portuguese" },
      { id: "ru", name: "Russian" },
      { id: "tr", name: "Turkish" },
      { id: "zh", name: "Chinese" },
      { id: "ar", name: "Arabic" },
      { id: "cs", name: "Czech" },
      { id: "da", name: "Danish" },
      { id: "fi", name: "Finnish" },
      { id: "el", name: "Greek" },
      { id: "he", name: "Hebrew" },
      { id: "hi", name: "Hindi" },
      { id: "hu", name: "Hungarian" },
      { id: "id", name: "Indonesian" },
      { id: "nl", name: "Dutch" },
      { id: "no", name: "Norwegian" },
      { id: "ro", name: "Romanian" },
      { id: "sk", name: "Slovak" },
      { id: "sv", name: "Swedish" },
      { id: "th", name: "Thai" },
      { id: "uk", name: "Ukrainian" },
      { id: "vi", name: "Vietnamese" },
    ]
  },
  {
    id: "eleven_turbo_v2_5",
    name: "Eleven Turbo v2.5",
    description: "Our high quality, low latency model in 32 languages. Best for developer use cases where speed matters.",
    supportedLanguages: [
      { id: "en", name: "English" },
      { id: "de", name: "German" },
      { id: "es", name: "Spanish" },
      { id: "fr", name: "French" },
      { id: "it", name: "Italian" },
      { id: "ja", name: "Japanese" },
      { id: "ko", name: "Korean" },
      { id: "pl", name: "Polish" },
      { id: "pt", name: "Portuguese" },
      { id: "ru", name: "Russian" },
      { id: "tr", name: "Turkish" },
      { id: "zh", name: "Chinese" },
      { id: "ar", name: "Arabic" },
      { id: "bg", name: "Bulgarian" },
      { id: "cs", name: "Czech" },
      { id: "da", name: "Danish" },
      { id: "fi", name: "Finnish" },
      { id: "el", name: "Greek" },
      { id: "he", name: "Hebrew" },
      { id: "hi", name: "Hindi" },
      { id: "hr", name: "Croatian" },
      { id: "hu", name: "Hungarian" },
      { id: "id", name: "Indonesian" },
      { id: "lt", name: "Lithuanian" },
      { id: "nl", name: "Dutch" },
      { id: "no", name: "Norwegian" },
      { id: "ro", name: "Romanian" },
      { id: "sk", name: "Slovak" },
      { id: "sl", name: "Slovenian" },
      { id: "sv", name: "Swedish" },
      { id: "th", name: "Thai" },
      { id: "uk", name: "Ukrainian" },
      { id: "vi", name: "Vietnamese" },
    ]
  },
  {
    id: "eleven_turbo_v2",
    name: "Eleven Turbo v2",
    description: "Our English-only, low latency model. Best for developer use cases where speed matters and you only need English.",
    supportedLanguages: [
      { id: "en", name: "English" },
    ]
  },
  {
    id: "eleven_multilingual_v1",
    name: "Eleven Multilingual v1",
    description: "Our first Multilingual model, capability of generating speech in 10 languages.",
    supportedLanguages: [
      { id: "en", name: "English" },
      { id: "de", name: "German" },
      { id: "es", name: "Spanish" },
      { id: "fr", name: "French" },
      { id: "hi", name: "Hindi" },
      { id: "it", name: "Italian" },
      { id: "ja", name: "Japanese" },
      { id: "ko", name: "Korean" },
      { id: "pl", name: "Polish" },
      { id: "pt", name: "Portuguese" },
    ]
  },
  {
    id: "eleven_multilingual_sts_v2",
    name: "Eleven Multilingual v2 (STS)",
    description: "Our cutting-edge, multilingual speech-to-speech model.",
    supportedLanguages: [
      { id: "en", name: "English" },
      { id: "de", name: "German" },
      { id: "es", name: "Spanish" },
      { id: "fr", name: "French" },
      { id: "it", name: "Italian" },
      { id: "ja", name: "Japanese" },
      { id: "pl", name: "Polish" },
      { id: "pt", name: "Portuguese" },
    ]
  },
  {
    id: "eleven_monolingual_v1",
    name: "Eleven English v1",
    description: "Our first ever text to speech model.",
    supportedLanguages: [
      { id: "en", name: "English" },
    ]
  },
  {
    id: "eleven_english_sts_v2",
    name: "Eleven English v2 (STS)",
    description: "Our state-of-the-art speech to speech model for English.",
    supportedLanguages: [
      { id: "en", name: "English" },
    ]
  }
];

// Voice constants (IDs only; we'll fetch actual voices from the API)
export const topVoices = {
  en: [
    { voice_id: "9BWtsMINqrJLrRacOk9x", name: "Aria" },
    { voice_id: "CwhRBWXzGAHq8TQ4Fs17", name: "Roger" },
    { voice_id: "EXAVITQu4vr4xnSDxMaL", name: "Sarah" },
    { voice_id: "FGY2WhTYpPnrIDTdsKH5", name: "Laura" },
    { voice_id: "IKne3meq5aSn9XLyUdCD", name: "Charlie" },
    { voice_id: "JBFqnCBsd6RMkjVDRZzb", name: "George" },
    { voice_id: "N2lVS1w4EtoT3dr4eOWO", name: "Callum" },
    { voice_id: "SAz9YHcvj6GT2YYXdXww", name: "River" },
    { voice_id: "TX3LPaxmHKxFdv7VOQHJ", name: "Liam" },
    { voice_id: "XB0fDUnXU5powFXDhCwa", name: "Charlotte" },
    { voice_id: "Xb7hH8MSUJpSbSDYk0k2", name: "Alice" },
    { voice_id: "XrExE9yKIg1WjnnlVkGX", name: "Matilda" },
    { voice_id: "bIHbv24MWmeRgasZH58o", name: "Will" },
    { voice_id: "cgSgspJ2msm6clMCkdW9", name: "Jessica" },
    { voice_id: "cjVigY5qzO86Huf0OWal", name: "Eric" },
    { voice_id: "iP95p4xoKVk53GoZ742B", name: "Chris" },
    { voice_id: "nPczCjzI2devNBz1zQrb", name: "Brian" },
    { voice_id: "onwK4e9ZLuTAKqWW03F9", name: "Daniel" },
    { voice_id: "pFZP5JQG7iQjIQuC4Bku", name: "Lily" },
    { voice_id: "pqHfZKP75CvOlQylNhV4", name: "Bill" },
  ]
};

// Helper functions
const handleApiError = (error: any): never => {
  console.error("API Error:", error);
  const message = error.response?.data?.message || error.message || "An error occurred";
  toast.error(`Error: ${message}`);
  throw error;
};

// Fetch voices from ElevenLabs API
export const fetchVoices = async (): Promise<Voice[]> => {
  try {
    // For demo purposes, we'll just use the predefined voices
    // In a real app, you'd fetch from the API
    return topVoices.en;
    
    /* Uncomment this to use the actual API
    const response = await fetch(`${BASE_URL}/voices`, {
      headers: {
        "xi-api-key": API_KEY,
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }
    
    const data = await response.json();
    return data.voices;
    */
  } catch (error) {
    return handleApiError(error);
  }
};

// Generate speech from text
export const generateSpeech = async (
  text: string,
  voiceId: string,
  modelId: string,
  options?: {
    stability?: number;
    similarity_boost?: number;
    style?: number;
    use_speaker_boost?: boolean;
  }
): Promise<ArrayBuffer> => {
  try {
    const response = await fetch(`${BASE_URL}/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        "xi-api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        model_id: modelId,
        voice_settings: {
          stability: options?.stability || 0.5,
          similarity_boost: options?.similarity_boost || 0.75,
          style: options?.style || 0,
          use_speaker_boost: options?.use_speaker_boost !== undefined ? options.use_speaker_boost : true,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    return await response.arrayBuffer();
  } catch (error) {
    return handleApiError(error);
  }
};
