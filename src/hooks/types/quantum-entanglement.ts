
export type EmotionalState = 
  | 'neutral'
  | 'calm' 
  | 'focused'
  | 'peaceful'
  | 'excited'
  | 'joyful'
  | 'concerned'
  | 'uncertain'
  | 'distressed'
  | 'joy'
  | 'peace'
  | 'love'
  | 'awe'
  | 'contemplation'
  | string; // Allow string for backward compatibility

export interface EntanglementState {
  active: boolean;
  entangledWith: string | null;
  strength: number;
  emotion: EmotionalState;
}

export interface UserProfile {
  id: string;
  name: string;
  coherenceLevel: number;
  emotionalState: EmotionalState;
  lastContact: string; // ISO date string
}

// Add EntityProfile as an alias for UserProfile to maintain compatibility
export type EntityProfile = UserProfile;

export interface BiofeedbackResult {
  coherent: boolean;
  metrics: {
    hrv: number;
    eeg: {
      gamma: number;
      theta: number;
    }
  };
  dominantEmotion?: EmotionalState;
}

export interface ResonanceResult {
  success: boolean;
  resonanceLevel?: number;
  message?: string;
}

export interface DivinePresence {
  active: boolean;
  source: string;
  intensity: number;
  clarity: number;
}
