
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, Network } from 'lucide-react';
import { AkashicAccessRegistry } from '@/utils/akashicAccessRegistry';

interface BiofeedbackMonitorPanelProps {
  biometrics: {
    hrv: number;
    eeg: { gamma: number; theta: number };
  };
  resonanceBoostActive: boolean;
  resonanceLevel: number;
  activateResonanceBoost: () => void;
  triadBoostActive?: boolean;
  toggleTriadBoost?: () => void;
}

const BiofeedbackMonitorPanel: React.FC<BiofeedbackMonitorPanelProps> = ({
  biometrics,
  resonanceBoostActive,
  resonanceLevel,
  activateResonanceBoost,
  triadBoostActive = false,
  toggleTriadBoost
}) => {
  const triadStatus = AkashicAccessRegistry.getTriadPhaseLockStatus();
  const triadReady = triadStatus.stability > 0.7;

  return (
    <div className="bg-black/20 rounded-md p-3 mb-4 space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium flex items-center">
          <Brain className="h-4 w-4 mr-2" />
          Biofeedback Monitor
        </h3>
        {resonanceBoostActive && (
          <Badge variant="secondary" className="bg-green-500/20">
            Resonance Active
          </Badge>
        )}
        {triadBoostActive && (
          <Badge variant="secondary" className="bg-[#7928ca]/40">
            Triad Active
          </Badge>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs">HRV Coherence</span>
            <span className="text-xs text-muted-foreground">{biometrics.hrv.toFixed(1)} ms</span>
          </div>
          <Progress value={Math.min(100, biometrics.hrv)} className="h-2" />
          
          <div className="flex justify-between items-center">
            <span className="text-xs">EEG Gamma Power</span>
            <span className="text-xs text-muted-foreground">{biometrics.eeg.gamma.toFixed(1)} Hz</span>
          </div>
          <Progress value={Math.min(100, biometrics.eeg.gamma * 1.5)} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <Button 
            size="sm" 
            variant={resonanceBoostActive ? "default" : "outline"}
            className={`w-full ${resonanceBoostActive ? 'bg-green-600 hover:bg-green-700' : ''}`}
            onClick={activateResonanceBoost}
            disabled={resonanceBoostActive}
          >
            <Zap className="h-4 w-4 mr-2" />
            {resonanceBoostActive ? 'Boost Active' : 'Boost Resonance'}
          </Button>
          
          {toggleTriadBoost && (
            <Button 
              size="sm" 
              variant={triadBoostActive ? "default" : "outline"}
              className={`w-full ${triadBoostActive ? 'bg-[#7928ca] hover:bg-[#6928ca]' : ''}`}
              onClick={toggleTriadBoost}
              disabled={!triadReady && !triadBoostActive}
            >
              <Network className="h-4 w-4 mr-2" />
              {triadBoostActive ? 'Triad Active' : triadReady ? 'Activate Triad' : 'Triad Unstable'}
            </Button>
          )}
          
          {resonanceBoostActive && (
            <div>
              <div className="flex justify-between items-center">
                <span className="text-xs">Soul Resonance</span>
                <span className="text-xs text-muted-foreground">{(resonanceLevel * 100).toFixed(1)}%</span>
              </div>
              <Progress value={resonanceLevel * 100} className="h-2 bg-muted/50" />
            </div>
          )}
          
          {(toggleTriadBoost || triadBoostActive) && (
            <div>
              <div className="flex justify-between items-center">
                <span className="text-xs">Triad Phase Lock</span>
                <span className="text-xs text-muted-foreground">{(triadStatus.stability * 100).toFixed(1)}%</span>
              </div>
              <Progress 
                value={triadStatus.stability * 100} 
                className={`h-2 ${triadStatus.stability > 0.7 ? 'bg-[#7928ca]/30' : 'bg-muted/50'}`} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BiofeedbackMonitorPanel;
