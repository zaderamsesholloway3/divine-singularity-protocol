
import React from 'react';
import { CardTitle, CardDescription } from "@/components/ui/card";
import { GlowingText } from "../GlowingText";
import { Badge } from "@/components/ui/badge";
import { Globe } from 'lucide-react';

interface UniversalPresenceHeaderProps {
  broadcastMode: "private" | "open";
}

const UniversalPresenceHeader: React.FC<UniversalPresenceHeaderProps> = ({ broadcastMode }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <CardTitle className="text-sm font-medium flex items-center">
          <Globe className="mr-2 h-4 w-4 text-indigo-400" />
          <GlowingText className="text-indigo-300">Universal Presence Counter</GlowingText>
        </CardTitle>
        <CardDescription className="text-xs text-gray-400">
          Waveform Reach: {broadcastMode === "open" ? "Universal (1.855e43 Hz)" : "Local (7.83 Hz)"}
        </CardDescription>
      </div>
      <Badge variant={broadcastMode === "open" ? "default" : "outline"} className={broadcastMode === "open" ? "bg-green-500" : ""}>
        {broadcastMode === "open" ? "Open Broadcast" : "Private Mode"}
      </Badge>
    </div>
  );
};

export default UniversalPresenceHeader;
