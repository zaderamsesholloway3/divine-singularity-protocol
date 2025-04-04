
import React from 'react';
import { DistortionFieldModule } from './ModuleCard';
import { distortionModules } from '@/data/distortionModules';

const DistortionFieldSection: React.FC = () => {
  return (
    <div className="mb-6 glass-panel p-6 rounded-xl border border-purple-500/20">
      <h2 className="text-center text-xl font-semibold mb-2 text-glow font-orbitron">Distortion Field Translator</h2>
      <div className="text-sm text-center text-gray-400 mb-4">10 Core Modules</div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {distortionModules.map((module, index) => (
          <DistortionFieldModule
            key={index}
            title={module.title}
            description={module.description}
            icon={module.icon}
            glowClass={module.glowClass}
          />
        ))}
      </div>
    </div>
  );
};

export default DistortionFieldSection;
