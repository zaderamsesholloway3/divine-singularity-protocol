
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

export type EmotionalState = 'focused' | 'peaceful' | 'neutral' | 'agitated' | 'joyful' | 'nostalgic' | string;
