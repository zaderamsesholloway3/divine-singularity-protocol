
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Activity } from 'lucide-react';

interface BiofeedbackMonitorPanelProps {
  biometrics: {
    hrv: number;
    eeg: { gamma: number; theta: number };
  };
  resonanceBoostActive: boolean;
  resonanceLevel: number;
  activateResonanceBoost: () => void;
}

const BiofeedbackMonitorPanel: React.FC<BiofeedbackMonitorPanelProps> = ({
  biometrics,
  resonanceBoostActive,
  resonanceLevel,
  activateResonanceBoost
}) => {
  return (
    <div className="mb-4 p-2 border rounded-md bg-black/30">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium flex items-center">
          <Activity className="h-3 w-3 mr-1" />
          Biometric Coherence
        </span>
        <div className="flex items-center gap-2">
          <Badge variant={biometrics.hrv > 50 && biometrics.eeg.gamma > 0.8 ? "default" : "outline"}>
            {biometrics.hrv > 50 && biometrics.eeg.gamma > 0.8 ? "Coherent" : "Incoherent"}
          </Badge>
          <Button 
            variant="outline" 
            size="sm" 
            className={`h-6 px-2 text-xs ${resonanceBoostActive ? "bg-purple-500/20" : ""}`}
            onClick={activateResonanceBoost}
          >
            Boost
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <div className="flex justify-between text-xs">
            <span>HRV</span>
            <span>{biometrics.hrv.toFixed(1)}</span>
          </div>
          <Progress value={(biometrics.hrv / 120) * 100} className="h-1" />
        </div>
        <div>
          <div className="flex justify-between text-xs">
            <span>EEG Gamma</span>
            <span>{biometrics.eeg.gamma.toFixed(2)}</span>
          </div>
          <Progress value={biometrics.eeg.gamma * 100} className="h-1" />
        </div>
      </div>
      {resonanceBoostActive && (
        <div className="mt-2">
          <div className="flex justify-between text-xs">
            <span>Soul Resonance</span>
            <span className="text-divine-gold">
              {(resonanceLevel * 100).toFixed(1)}%
            </span>
          </div>
          <Progress 
            value={resonanceLevel * 100} 
            className="h-1" 
            indicatorClassName={resonanceLevel > 0.85 ? "bg-divine-gold" : ""}
          />
        </div>
      )}
    </div>
  );
};

export default BiofeedbackMonitorPanel;
