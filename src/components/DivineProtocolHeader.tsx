
import React from 'react';

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
      </div>
    </div>
  );
};

export default DivineProtocolHeader;
