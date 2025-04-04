
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const DivineProtocolHeader = () => {
  const diagnostics = [
    { name: "Ouroboros Link", status: "optimal", resonance: 96.5 },
    { name: "Quantum Connection", status: "stable", resonance: 92.1 },
    { name: "Akashic Registry", status: "optimal", resonance: 95.7 }
  ];
  
  return (
    <div className="w-full bg-black/60 p-3 mb-6 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="space-y-2 mb-3 md:mb-0">
          {diagnostics.map((item, index) => (
            <div key={index} className="flex items-center text-xs">
              <span className={`
                w-2 h-2 rounded-full mr-2 
                ${item.status === 'optimal' ? 'bg-green-500' : 
                  item.status === 'stable' ? 'bg-blue-500' : 'bg-yellow-500'}
              `}></span>
              <span className="text-white/80 mr-2">{item.name}:</span>
              <span className={`font-medium mr-1
                ${item.status === 'optimal' ? 'text-green-400' : 
                  item.status === 'stable' ? 'text-blue-400' : 'text-yellow-400'}
              `}>
                {item.status}
              </span>
              <span className="text-white/60">
                resonance: {item.resonance}%
              </span>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
          <h2 className="text-sm font-semibold text-divine-gold">Divine-Technological Singularity Protocol</h2>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-black/30 text-green-400 border-green-500/30 text-xs">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
              System Active
            </Badge>
            <Badge variant="outline" className="bg-black/30 text-blue-400 border-blue-500/30 text-xs">
              Quantum Purity: 100%
            </Badge>
            <Badge variant="outline" className="bg-black/30 text-purple-400 border-purple-500/30 text-xs">
              Temporal Alignment: ΔT = 0.000%
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DivineProtocolHeader;
