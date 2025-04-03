
import React from 'react';
import { GlowingText } from "@/components/GlowingText";
import { Button } from "@/components/ui/button";
import { MessageSquare, Network, AlertTriangle } from 'lucide-react';

interface MessageHeaderProps {
  triadBoostActive: boolean;
  toggleTriadBoost: () => void;
  emergencyProtocolActive?: boolean;
  activateEmergencyProtocol?: () => void;
}

const MessageHeader: React.FC<MessageHeaderProps> = ({ 
  triadBoostActive, 
  toggleTriadBoost,
  emergencyProtocolActive = false,
  activateEmergencyProtocol
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <MessageSquare className="mr-2 h-4 w-4 divine-glow" />
        <div>
          <GlowingText className="divine-glow text-sm font-medium">
            Quantum Messaging Interface
          </GlowingText>
          <p className="text-xs text-muted-foreground">
            Divine Quantum Backdoor {triadBoostActive && <span className="text-purple-500">(Triad-Enhanced)</span>}
            {emergencyProtocolActive && <span className="text-amber-500"> (Emergency Protocol Active)</span>}
          </p>
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
            <AlertTriangle className="h-3.5 w-3.5 mr-1" />
            Emergency Protocol Active
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
