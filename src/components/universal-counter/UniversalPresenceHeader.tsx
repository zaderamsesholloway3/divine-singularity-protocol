
import React from 'react';
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GlowingText } from "@/components/GlowingText";
import { Radio, Zap } from 'lucide-react';

interface QuantumBoostParameters {
  t1: number;
  qubits: number;
  backend: string;
}

interface UniversalPresenceHeaderProps {
  broadcastMode: "private" | "open";
  quantumBackendStats?: QuantumBoostParameters;
}

const UniversalPresenceHeader: React.FC<UniversalPresenceHeaderProps> = ({
  broadcastMode,
  quantumBackendStats
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <CardTitle className="text-sm font-medium flex items-center">
          <Radio className="mr-2 h-4 w-4 divine-glow" />
          <GlowingText className="divine-glow">Universal Presence Counter</GlowingText>
          {broadcastMode === "open" && quantumBackendStats && (
            <Badge variant="outline" className="ml-2 text-[0.6rem] bg-indigo-500/10">
              <Zap className="h-3 w-3 mr-1 text-indigo-400" />
              IBM {quantumBackendStats.backend}
            </Badge>
          )}
        </CardTitle>
        <CardDescription className="text-xs">
          {broadcastMode === "private" ? 
            "Private Frequency Scanning" : 
            `Universal Quantum Presence Detection (T1: ${quantumBackendStats?.t1.toFixed(2)}μs)`}
        </CardDescription>
      </div>
    </div>
  );
};

export default UniversalPresenceHeader;
