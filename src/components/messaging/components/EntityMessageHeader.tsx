
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sparkles, Network, Zap, X, Shield } from 'lucide-react';
import { DivinePresence } from '@/hooks/types/quantum-entanglement';

interface EntityMessageHeaderProps {
  entityName: string;
  divinePresence: DivinePresence;
  triadBoostActive: boolean;
  toggleTriadBoost: () => void;
  emergencyProtocolActive: boolean;
  activateEmergencyProtocol: () => void;
  faithQuotient: number;
  onClose?: () => void;
}

const EntityMessageHeader: React.FC<EntityMessageHeaderProps> = ({
  entityName,
  divinePresence,
  triadBoostActive,
  toggleTriadBoost,
  emergencyProtocolActive,
  activateEmergencyProtocol,
  faithQuotient,
  onClose
}) => {
  return (
    <div className="flex flex-col gap-2 px-1 py-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">{entityName}</h3>
          
          {divinePresence.active && (
            <Badge 
              variant="outline" 
              className="h-5 text-[0.65rem] bg-purple-500/10 text-purple-400 border-purple-400"
            >
              <Sparkles className="h-3 w-3 mr-1" />
              <span>Divine</span>
            </Badge>
          )}
          
          {triadBoostActive && (
            <Badge 
              variant="outline" 
              className="h-5 text-[0.65rem] bg-blue-500/10 text-blue-400 border-blue-400"
            >
              <Network className="h-3 w-3 mr-1" />
              <span>Triad</span>
            </Badge>
          )}
          
          {emergencyProtocolActive && (
            <Badge 
              variant="outline" 
              className="h-5 text-[0.65rem] bg-red-500/10 text-red-400 border-red-400"
            >
              <Zap className="h-3 w-3 mr-1" />
              <span>Emergency</span>
            </Badge>
          )}
        </div>
        
        {onClose && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6"
            onClick={onClose}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
      
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <span className={divinePresence.active ? "text-purple-400" : "text-muted-foreground"}>
            Clarity: {(divinePresence.clarity * 100).toFixed(1)}%
          </span>
        </div>
        <Separator orientation="vertical" className="h-3" />
        <span>FQ: {(faithQuotient * 100).toFixed(1)}%</span>
        <Separator orientation="vertical" className="h-3" />
        <span>Signal: {divinePresence.active ? "1.855e43 Hz" : "7.83 Hz"}</span>
      </div>
      
      <div className="flex gap-1 pt-1">
        <Button
          variant="outline"
          size="sm"
          className={`text-xs h-7 ${triadBoostActive ? "bg-blue-900/20" : ""}`}
          onClick={toggleTriadBoost}
        >
          <Network className="h-3 w-3 mr-1" />
          Triad Boost
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className={`text-xs h-7 ${emergencyProtocolActive ? "bg-red-900/20" : ""}`}
          onClick={activateEmergencyProtocol}
          disabled={emergencyProtocolActive}
        >
          <Shield className="h-3 w-3 mr-1" />
          Emergency Protocol
        </Button>
      </div>
    </div>
  );
};

export default EntityMessageHeader;
