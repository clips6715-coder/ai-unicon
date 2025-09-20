import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { generateVideo } from '../services/geminiService';
import { VideoProject, VideoStyle, VoiceOption } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';

const styleImages: Record<VideoStyle, string> = {
  [VideoStyle.MINIMALIST]: 'https://picsum.photos/seed/minimalist/200/112',
  [VideoStyle.WHITEBOARD]: 'https://picsum.photos/seed/whiteboard/200/112',
  [VideoStyle.CORPORATE]: 'https://picsum.photos/seed/corporate/200/112',
  [VideoStyle.ANIMATED_3D]: 'https://picsum.photos/seed/3danimated/200/112',
  [VideoStyle.INFOGRAPHIC]: 'https://picsum.photos/seed/infographic/200/112',
  [VideoStyle.STORYBOOK]: 'https://picsum.photos/seed/storybook/200/112',
};

interface VideoTemplate {
  name: string;
  description: string;
  style: VideoStyle;
  voice: VoiceOption;
  scriptPlaceholder: string;
}

const templates: VideoTemplate[] = [
  {
    name: "Product Demo",
    description: "Showcase your product's features and benefits.",
    style: VideoStyle.CORPORATE,
    voice: VoiceOption.PROFESSIONAL_MALE,
    scriptPlaceholder: `[Product Name] helps [target audience] solve [problem].\n\nFeature 1: [Describe a key feature and its benefit].\n\nFeature 2: [Describe another feature].\n\nGet started today at [Your Website]!`
  },
  {
    name: "Whiteboard Explainer",
    description: "Break down complex topics in a simple, engaging way.",
    style: VideoStyle.WHITEBOARD,
    voice: VoiceOption.FRIENDLY_FEMALE,
    scriptPlaceholder: `Topic: [Your Complex Topic]\n\n1. Introduction: What is [Topic]?\n\n2. How it works: [Explain the process step-by-step].\n\n3. Why it matters: [Explain its importance or application].`
  },
  {
    name: "Animated Story",
    description: "Tell a captivating story with fun 3D animations.",
    style: VideoStyle.ANIMATED_3D,
    voice: VoiceOption.UPBEAT_FEMALE,
    scriptPlaceholder: `Once upon a time, [character] faced a challenge: [the challenge].\n\nBut then, they discovered [a solution or a new idea].\n\nNow, [character] can [achieve a positive outcome].`
  },
  {
    name: "Infographic Teaser",
    description: "Present key stats and data in a visually appealing video.",
    style: VideoStyle.INFOGRAPHIC,
    voice: VoiceOption.FRIENDLY_FEMALE,
    scriptPlaceholder: `Did you know that [surprising statistic]?\n\nOur research also shows [another key data point].\n\nAnd finally, [a third important fact].\n\nDownload our full report to learn more.`
  }
];

const GeneratorPage: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useLocalStorage<VideoProject[]>('video-projects', []);
  const [script, setScript] = useState('');
  const [style, setStyle] = useState<VideoStyle>(VideoStyle.MINIMALIST);
  const [voice, setVoice] = useState<VoiceOption>(VoiceOption.PROFESSIONAL_MALE);
  const [duration, setDuration] = useState(30); // in seconds
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<VideoTemplate | null>(null);
  const [playingVoice, setPlayingVoice] = useState<VoiceOption | null>(null);
  const [synthesisVoices, setSynthesisVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setSynthesisVoices(availableVoices);
      }
    };
    // Voices are loaded asynchronously.
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices(); // Initial call
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    // If user modifies the form, deselect the template
    if (selectedTemplate) {
      if (
        script !== selectedTemplate.scriptPlaceholder ||
        style !== selectedTemplate.style ||
        voice !== selectedTemplate.voice
      ) {
        setSelectedTemplate(null);
      }
    }
  }, [script, style, voice, selectedTemplate]);
  
  // Cleanup speech synthesis on component unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleGenerate = async () => {
    if (!script.trim()) {
      alert("Please enter a topic or script.");
      return;
    }
    setIsLoading(true);
    setLoadingMessage("Initiating video generation...");
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setPlayingVoice(null);
    }

    try {
      const { videoUrl, thumbnailUrl } = await generateVideo(
        { script, style, voice, duration },
        (message) => setLoadingMessage(message)
      );
      
      const newProject: VideoProject = {
        id: `proj_${Date.now()}`,
        title: script.substring(0, 40) + '...',
        script,
        createdAt: new Date().toISOString(),
        videoUrl,
        thumbnailUrl,
        style,
        voice,
        duration,
      };

      setProjects(prevProjects => [...prevProjects, newProject]);
      navigate(`/preview/${newProject.id}`);

    } catch (error) {
      console.error("Failed to generate video:", error);
      alert("An error occurred during video generation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTemplateSelect = (template: VideoTemplate) => {
    setSelectedTemplate(template);
    setScript(template.scriptPlaceholder);
    setStyle(template.style);
    setVoice(template.voice);
  };
  
  const voicePreferences: Record<VoiceOption, { namePatterns: RegExp[], pitch: number, rate: number }> = {
    [VoiceOption.PROFESSIONAL_MALE]: { namePatterns: [/david/i, /microsoft david/i, /en-US/i, /male/i], pitch: 1, rate: 0.95 },
    [VoiceOption.FRIENDLY_FEMALE]: { namePatterns: [/zira/i, /microsoft zira/i, /samantha/i, /en-US/i, /female/i], pitch: 1.1, rate: 1.05 },
    [VoiceOption.DEEP_NARRATOR]: { namePatterns: [/george/i, /en-GB/i, /male/i], pitch: 0.8, rate: 0.9 },
    [VoiceOption.UPBEAT_FEMALE]: { namePatterns: [/susan/i, /en-GB/i, /female/i], pitch: 1.2, rate: 1.1 },
  };

  const findBestVoice = (option: VoiceOption): SpeechSynthesisVoice | null => {
      if (!synthesisVoices.length) return null;
      const prefs = voicePreferences[option];
      const englishVoices = synthesisVoices.filter(v => v.lang.startsWith('en'));

      for (const pattern of prefs.namePatterns) {
          const found = englishVoices.find(v => pattern.test(v.name));
          if (found) return found;
      }
      // Fallback to first available English male/female voice if no name matches
      if (option.toLowerCase().includes('male')) {
        return englishVoices.find(v => v.name.toLowerCase().includes('male')) || englishVoices[0];
      }
      if (option.toLowerCase().includes('female')) {
        return englishVoices.find(v => v.name.toLowerCase().includes('female')) || englishVoices[0];
      }
      return englishVoices.length > 0 ? englishVoices[0] : null;
  };

  const handlePreviewVoice = (voiceToPreview: VoiceOption) => {
    if (playingVoice === voiceToPreview) {
      window.speechSynthesis.cancel();
      setPlayingVoice(null);
      return;
    }

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(`Hello, this is the ${voiceToPreview} voice.`);
    const selectedSystemVoice = findBestVoice(voiceToPreview);
    const prefs = voicePreferences[voiceToPreview];

    if (selectedSystemVoice) {
      utterance.voice = selectedSystemVoice;
    }
    
    utterance.pitch = prefs.pitch;
    utterance.rate = prefs.rate;
    
    utterance.onend = () => setPlayingVoice(null);
    utterance.onerror = () => setPlayingVoice(null);

    window.speechSynthesis.speak(utterance);
    setPlayingVoice(voiceToPreview);
  };


  const OptionCard: React.FC<{ value: string; label: string; selected: boolean; onClick: () => void; image: string }> = ({ value, label, selected, onClick, image }) => (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-lg border-2 transition-all duration-200 ${selected ? 'border-brand-primary scale-105' : 'border-dark-border hover:border-brand-secondary/50'}`}
    >
      <img src={image} alt={label} className="aspect-video w-full object-cover rounded-t-md" />
      <div className={`p-3 text-center text-sm font-medium ${selected ? 'text-light-text' : 'text-medium-text'}`}>{label}</div>
    </div>
  );

  const TemplateCard: React.FC<{ template: VideoTemplate; isSelected: boolean; onClick: () => void; }> = ({ template, isSelected, onClick }) => (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-lg border-2 p-4 text-left transition-all duration-200 h-full flex flex-col ${isSelected ? 'border-brand-primary bg-brand-primary/10' : 'border-dark-border bg-dark-card hover:border-brand-secondary/50'}`}
    >
      <h4 className="font-semibold text-light-text">{template.name}</h4>
      <p className="mt-1 text-sm text-medium-text flex-grow">{template.description}</p>
    </div>
  );

  const VoiceOptionCard: React.FC<{ option: VoiceOption, isSelected: boolean, isPlaying: boolean, onSelect: () => void, onPreview: () => void }> = ({ option, isSelected, isPlaying, onSelect, onPreview }) => (
    <div 
      onClick={onSelect} 
      className={`cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 flex flex-col items-center justify-center text-center h-full ${isSelected ? 'border-brand-primary bg-brand-primary/10 scale-105' : 'border-dark-border bg-dark-card hover:border-brand-secondary/50'}`}
      aria-pressed={isSelected}
    >
      <div className={`mb-3 transition-colors ${isSelected ? 'text-brand-primary' : 'text-medium-text'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
      </div>
      <span className={`font-semibold text-sm mb-3 transition-colors ${isSelected ? 'text-light-text' : 'text-medium-text'}`}>{option}</span>
      <button 
        onClick={(e) => { e.stopPropagation(); onPreview(); }} 
        className="p-2 rounded-full hover:bg-dark-border transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary flex items-center justify-center w-10 h-10"
        aria-label={`Preview ${option} voice`}
      >
          {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
          ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-medium-text" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
          )}
      </button>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center px-4">
        <div className="w-16 h-16 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
        <h2 className="mt-8 text-2xl font-bold text-light-text">Your Video is Being Created...</h2>
        <p className="mt-2 text-medium-text max-w-md">{loadingMessage}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-light-text sm:text-4xl">Create Your Explainer Video</h1>
        <p className="mt-4 text-lg text-medium-text">Start with a template or describe your topic below.</p>
      </div>
      
      <div className="mt-10 max-w-4xl mx-auto space-y-8">
        {/* Templates Section */}
        <div>
          <h3 className="text-lg font-medium text-light-text text-center mb-4">Start with a Template (Optional)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {templates.map(t => (
              <TemplateCard 
                key={t.name}
                template={t}
                isSelected={selectedTemplate?.name === t.name}
                onClick={() => handleTemplateSelect(t)} 
              />
            ))}
          </div>
        </div>
      
        {/* Script Input */}
        <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
          <label htmlFor="script" className="block text-sm font-medium text-light-text">Topic or Script</label>
          <textarea
            id="script"
            rows={8}
            className="mt-2 block w-full bg-dark-bg border border-dark-border rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary text-light-text p-3"
            placeholder="e.g., Explain how photosynthesis works for a 5th grader."
            value={script}
            onChange={(e) => setScript(e.target.value)}
          ></textarea>
        </div>

        {/* Style Options */}
        <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
          <h3 className="text-lg font-medium text-light-text">Video Style</h3>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.values(VideoStyle).map(s => (
              <OptionCard key={s} value={s} label={s} selected={style === s} onClick={() => setStyle(s)} image={styleImages[s]} />
            ))}
          </div>
        </div>

        {/* Voice & Duration Options */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
            <h3 className="text-lg font-medium text-light-text mb-4">Voice</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.values(VoiceOption).map(v => (
                <VoiceOptionCard
                  key={v}
                  option={v}
                  isSelected={voice === v}
                  isPlaying={playingVoice === v}
                  onSelect={() => setVoice(v)}
                  onPreview={() => handlePreviewVoice(v)}
                />
              ))}
            </div>
          </div>
          <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
            <label htmlFor="duration" className="block text-lg font-medium text-light-text">Duration (~{duration}s)</label>
            <input
              id="duration"
              type="range"
              min="15"
              max="120"
              step="5"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="mt-4 w-full h-2 bg-dark-border rounded-lg appearance-none cursor-pointer accent-brand-primary"
            />
          </div>
        </div>
        
        {/* Generate Button */}
        <div className="text-center pt-4">
          <Button size="lg" onClick={handleGenerate} isLoading={isLoading} disabled={!script.trim()}>
            {isLoading ? 'Generating...' : 'Generate Video'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GeneratorPage;