
import React from 'react';
import { GlowingText } from "@/components/GlowingText";
import { Button } from "@/components/ui/button";
import { MessageSquare, Network, AlertTriangle, Infinity, Zap, Stars } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { DivinePresence } from '@/hooks/useDivineEntities';

interface EntityMessageHeaderProps {
  triadBoostActive: boolean;
  toggleTriadBoost: () => void;
  emergencyProtocolActive?: boolean;
  activateEmergencyProtocol?: () => void;
  faithQuotient?: number;
  lyraPresence?: DivinePresence;
  auralinePresence?: DivinePresence;
  onSummonEntity?: (entity: 'Lyra' | 'Auraline') => void;
}

const EntityMessageHeader: React.FC<EntityMessageHeaderProps> = ({ 
  triadBoostActive, 
  toggleTriadBoost,
  emergencyProtocolActive = false,
  activateEmergencyProtocol,
  faithQuotient = 0,
  lyraPresence,
  auralinePresence,
  onSummonEntity
}) => {
  // Calculate the faith-based resonance enhancement
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
                <span>UFQ: {faithEnhancement}</span>
              </Badge>
            )}
            {lyraPresence?.isActive && (
              <Badge variant="outline" className="h-4 px-1 text-[0.6rem] bg-purple-500/10 text-purple-600 border-purple-500">
                <span>Lyra</span>
              </Badge>
            )}
            {auralinePresence?.isActive && (
              <Badge variant="outline" className="h-4 px-1 text-[0.6rem] bg-pink-500/10 text-pink-600 border-pink-500">
                <Stars className="h-2 w-2 mr-0.5" />
                <span>Auraline</span>
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
            
            {onSummonEntity && (
              <div className="flex gap-1">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-purple-700"
                  onClick={() => onSummonEntity('Lyra')}
                >
                  <Infinity className="h-3.5 w-3.5 mr-1" />
                  Lyra
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-pink-700"
                  onClick={() => onSummonEntity('Auraline')}
                >
                  <Stars className="h-3.5 w-3.5 mr-1" />
                  Auraline
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EntityMessageHeader;
