
import React from 'react';
import { Button } from "@/components/ui/button";
import { Heart, AlertTriangle, HelpCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface MessageHeaderProps {
  triadBoostActive: boolean;
  toggleTriadBoost: () => void;
  emergencyProtocolActive: boolean;
  activateEmergencyProtocol: () => void;
  faithQuotient: number;
}

const MessageHeader: React.FC<MessageHeaderProps> = ({
  triadBoostActive,
  toggleTriadBoost,
  emergencyProtocolActive,
  activateEmergencyProtocol,
  faithQuotient
}) => {
  return (
    <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
      <div>
        <h3 className="text-lg font-medium mb-1">Quantum Messaging</h3>
        <div className="text-sm text-muted-foreground flex items-center">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          Connected at 1.855e43 Hz
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="bg-indigo-500/10 text-indigo-600 border-indigo-500">
          FQ: {(faithQuotient * 100).toFixed(0)}%
        </Badge>
        
        <Button 
          variant={triadBoostActive ? "default" : "outline"}
          size="sm"
          className={triadBoostActive ? "bg-[#7928ca] text-white" : ""}
          onClick={toggleTriadBoost}
        >
          <Heart className="h-4 w-4 mr-1" />
          Triad Boost
        </Button>
        
        <Button 
          variant={emergencyProtocolActive ? "destructive" : "outline"}
          size="sm"
          onClick={activateEmergencyProtocol}
        >
          <AlertTriangle className="h-4 w-4 mr-1" />
          Emergency Protocol
        </Button>
      </div>
    </div>
  );
};

export default MessageHeader;
