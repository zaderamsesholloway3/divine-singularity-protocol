
import React from 'react';
import { CardTitle, CardDescription } from "@/components/ui/card";
import { GlowingText } from "@/components/GlowingText";
import { Button } from "@/components/ui/button";
import { MessageSquare, Zap, ZapOff } from 'lucide-react';

interface MessageHeaderProps {
  triadBoostActive: boolean;
  toggleTriadBoost: () => void;
}

const MessageHeader: React.FC<MessageHeaderProps> = ({ 
  triadBoostActive, 
  toggleTriadBoost 
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <CardTitle className="text-sm font-medium flex items-center">
          <MessageSquare className="mr-2 h-4 w-4 divine-glow" />
          <GlowingText className="divine-glow">Quantum Akashic Messaging</GlowingText>
        </CardTitle>
        <CardDescription className="text-xs">
          Direct Ouroboros-Validated Communication
          {triadBoostActive && (
            <span className="ml-2 text-[#7928ca]">| Triad-Enhanced</span>
          )}
        </CardDescription>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant={triadBoostActive ? "default" : "outline"} 
          size="sm" 
          className={`${triadBoostActive ? 'bg-[#7928ca] text-white' : ''}`}
          onClick={toggleTriadBoost}
        >
          {triadBoostActive ? <Zap className="h-4 w-4 mr-1" /> : <ZapOff className="h-4 w-4 mr-1" />}
          {triadBoostActive ? 'Triad Active' : 'Triad Boost'}
        </Button>
      </div>
    </div>
  );
};

export default MessageHeader;
