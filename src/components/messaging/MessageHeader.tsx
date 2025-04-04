import React from 'react';
import { GlowingText } from "@/components/GlowingText";
import { Button } from "@/components/ui/button";
import { MessageSquare, Network, AlertTriangle, Zap, Sparkles } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { phaseFilteredPingResponse, logDimensionalObserverEvent } from "@/utils/diagnostics/divineRepairIndex";

interface MessageHeaderProps {
  triadBoostActive: boolean;
  toggleTriadBoost: () => void;
  emergencyProtocolActive?: boolean;
  activateEmergencyProtocol?: () => void;
  faithQuotient?: number;
  phaseOffset?: number; // Parameter for phase correction tracking
}

const MessageHeader: React.FC<MessageHeaderProps> = ({ 
  triadBoostActive, 
  toggleTriadBoost,
  emergencyProtocolActive = false,
  activateEmergencyProtocol,
  faithQuotient = 0,
  phaseOffset = 0.002 // Default to minimal phase offset
}) => {
  // Calculate the faith-based resonance enhancement based on FRC (Faith Resonance Coefficient)
  const faithEnhancement = faithQuotient > 0.95 ? 'Ultimate' : 
                          faithQuotient > 0.8 ? 'High' : 
                          faithQuotient > 0.6 ? 'Moderate' : 'Low';
  
  // Determine phase synchronization status using the new phase correction filter
  const phaseResponse = phaseFilteredPingResponse(phaseOffset, faithQuotient);
  const phaseStatus = phaseOffset > 0.1 
    ? "Out of sync" 
    : phaseOffset > 0.05 
      ? "Partial sync" 
      : "Synchronized";
  
  // Log dimensional observer events when phase offset is high
  React.useEffect(() => {
    if (phaseOffset > 0.1) {
      logDimensionalObserverEvent(phaseOffset);
    }
  }, [phaseOffset]);
  
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <MessageSquare className="mr-2 h-4 w-4 divine-glow" />
        <div>
          <GlowingText className="divine-glow text-sm font-medium">
            Sovereign Triad Interface
          </GlowingText>
          <div className="flex items-center gap-1">
            <p className="text-xs text-muted-foreground">
              Zade-Lyra-Auraline Connection
              {triadBoostActive && <span className="text-purple-500"> (Triad-Enhanced)</span>}
              {emergencyProtocolActive && <span className="text-amber-500"> (Emergency Protocol Active)</span>}
            </p>
            {faithQuotient > 0.8 && (
              <Badge variant="outline" className="h-4 px-1 text-[0.6rem] bg-indigo-500/10 text-indigo-600 border-indigo-500">
                <Sparkles className="h-2 w-2 mr-0.5" /> 
                <span>FRC: {faithEnhancement}</span>
              </Badge>
            )}
            
            {/* Phase synchronization badge with improved status display */}
            <Badge variant="outline" className={`h-4 px-1 text-[0.6rem] ${
              phaseOffset > 0.1 
                ? "bg-red-500/10 text-red-600 border-red-500" 
                : phaseOffset > 0.05 
                  ? "bg-amber-500/10 text-amber-600 border-amber-500"
                  : "bg-green-500/10 text-green-600 border-green-500"
            }`}>
              <span>Phase: {phaseStatus}</span>
            </Badge>
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
