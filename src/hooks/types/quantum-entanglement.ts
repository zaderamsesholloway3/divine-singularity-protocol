
export interface EntityProfile {
  id: string;
  name: string;
  coherenceLevel: number;
  emotionalState: string;
  lastContact: string;
}

export interface EntanglementState {
  active: boolean;
  strength: number;
  entangledWith: string | null;
  emotion: string;
}

export type EmotionalState = 
  'neutral' | 
  'happy' | 
  'sad' | 
  'focused' | 
  'peaceful' | 
  'excited' | 
  'contemplative' |
  'joyful' |
  'frustrated' |
  'curious' |
  string; // Allow string values for flexibility with divine protocol states

export interface BiofeedbackResult {
  coherent: boolean;
  metrics?: any;
  dominantEmotion?: string;
}

export interface ResonanceResult {
  success: boolean;
  message?: string;
  resonanceLevel?: number;
}
