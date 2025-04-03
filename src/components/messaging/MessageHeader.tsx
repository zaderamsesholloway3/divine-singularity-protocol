
import React from 'react';
import { GlowingText } from "@/components/GlowingText";
import { Button } from "@/components/ui/button";
import { MessageSquare, Network, AlertTriangle, Infinity, Zap } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface MessageHeaderProps {
  triadBoostActive: boolean;
  toggleTriadBoost: () => void;
  emergencyProtocolActive?: boolean;
  activateEmergencyProtocol?: () => void;
  faithQuotient?: number;
}

const MessageHeader: React.FC<MessageHeaderProps> = ({ 
  triadBoostActive, 
  toggleTriadBoost,
  emergencyProtocolActive = false,
  activateEmergencyProtocol,
  faithQuotient = 0
}) => {
  // Calculate the faith-based resonance enhancement based on FRC (Faith Resonance Coefficient)
  // Not using infinity as per instructions
  const faithEnhancement = faithQuotient > 0.95 ? 'Ultimate' : 
                          faithQuotient > 0.8 ? 'High' : 
                          faithQuotient > 0.6 ? 'Moderate' : 'Low';
  
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <MessageSquare className="mr-2 h-4 w-4 divine-glow" />
        <div>
          <GlowingText className="divine-glow text-sm font-medium">
            Quantum Messaging Interface
          </GlowingText>
          <div className="flex items-center gap-1">
            <p className="text-xs text-muted-foreground">
              Divine Quantum Backdoor 
              {triadBoostActive && <span className="text-purple-500">(Triad-Enhanced)</span>}
              {emergencyProtocolActive && <span className="text-amber-500">(Emergency Protocol Active)</span>}
            </p>
            {faithQuotient > 0.8 && (
              <Badge variant="outline" className="h-4 px-1 text-[0.6rem] bg-indigo-500/10 text-indigo-600 border-indigo-500">
                <Infinity className="h-2 w-2 mr-0.5" /> 
                <span>FRC: {faithEnhancement}</span>
              </Badge>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex gap-2">
        {emergencyProtocolActive ? (
          <Button 
            variant="outline" 
            size="sm"
            className="bg-amber-500/20 text-amber-700"
            disabled
          >
            <Zap className="h-3.5 w-3.5 mr-1" />
            Ouroboros Sync Active
          </Button>
        ) : (
          <>
            <Button 
              variant="outline" 
              size="sm"
              className={triadBoostActive ? "bg-purple-500/20" : ""}
              onClick={toggleTriadBoost}
            >
              <Network className="h-3.5 w-3.5 mr-1" />
              {triadBoostActive ? "Disable" : "Enable"} Triad Boost
            </Button>
            
            {activateEmergencyProtocol && (
              <Button 
                variant="outline" 
                size="sm"
                className="text-amber-700"
                onClick={activateEmergencyProtocol}
              >
                <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                Force Sync
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MessageHeader;
