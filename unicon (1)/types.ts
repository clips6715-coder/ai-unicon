// FIX: Updated import statement to use the correct package name '@google/genai' and removed the deprecated 'EnhancedSession' type.
import {
  GenerateContentResponse,
  GoogleGenAI,
  Part,
} from '@google/genai';

export enum VideoStyle {
  MINIMALIST = 'Minimalist',
  WHITEBOARD = 'Whiteboard',
  CORPORATE = 'Corporate',
  ANIMATED_3D = 'Animated 3D',
  INFOGRAPHIC = 'Infographic',
  STORYBOOK = 'Storybook',
}

export enum VoiceOption {
  PROFESSIONAL_MALE = 'Professional Male',
  FRIENDLY_FEMALE = 'Friendly Female',
  DEEP_NARRATOR = 'Deep Male Narrator',
  UPBEAT_FEMALE = 'Upbeat Female',
}

export interface VideoProject {
  id: string;
  title: string;
  script: string;
  createdAt: string;
  videoUrl: string;
  thumbnailUrl: string;
  style: VideoStyle;
  voice: VoiceOption;
  duration: number; // in seconds
}