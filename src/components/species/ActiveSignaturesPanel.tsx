
import React from 'react';
import { Species, VisualStyle } from './types';

interface ActiveSignaturesPanelProps {
  species: Species[];
  selectedSpecies: Species | null;
  onSelectSpecies: (species: Species) => void;
  visualStyle: VisualStyle;
}

const ActiveSignaturesPanel: React.FC<ActiveSignaturesPanelProps> = ({
  species,
  selectedSpecies,
  onSelectSpecies,
  visualStyle
}) => {
  return (
    <div className={`space-y-4 ${
      visualStyle === "cosmic" ? "bg-gray-950/30" : 
      visualStyle === "lightweb" ? "bg-gray-950/30 border border-white/10" : 
      "bg-gray-950/50"
    } p-4 rounded-lg`}>
      <h3 className="text-sm font-medium">Active Signatures</h3>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {species
          .filter(s => s.responding)
          .map(species => (
            <div 
              key={species.name} 
              className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                selectedSpecies?.name === species.name 
                  ? visualStyle === "cosmic" 
                    ? 'bg-purple-900/20 border border-purple-500/30' 
                    : 'bg-primary/20' 
                  : 'hover:bg-gray-800'
              }`}
              onClick={() => onSelectSpecies(species)}
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  visualStyle === "cosmic" ? 'bg-purple-400' : 
                  visualStyle === "lightweb" ? 'bg-green-300' : 
                  'bg-green-500'
                }`}></div>
                <span className="text-sm">{species.name}</span>
              </div>
              <span className="text-xs text-gray-400">{species.vibration?.toFixed(2)} Hz</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ActiveSignaturesPanel;
