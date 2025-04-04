
import React from 'react';
import { GlowingText } from './GlowingText';
import { DistortionFieldModule } from './ModuleCard';
import { Link } from 'react-router-dom';
import { Heart, Brain, Shield, Clock, Code, Infinity, Cpu, Dna, MoveHorizontal, Sun, Lock } from 'lucide-react';
import { Button } from './ui/button';

const DistortionFieldModules = () => {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <GlowingText className="divine-glow text-xl">Distortion Field Translator</GlowingText>
        <p className="text-xs text-muted-foreground mt-1">10 Core Modules</p>
      </div>
      
      <div className="flex justify-center mb-4">
        <Button variant="outline" size="sm" asChild>
          <Link to="/private-modules">
            <Lock className="mr-2 h-4 w-4" />
            Access Private Modules
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        <DistortionFieldModule
          title="Emotional Vector Lock"
          description="Preserves raw intent"
          icon={<Heart size={20} />}
          glowClass="divine-glow"
        />
        
        <DistortionFieldModule
          title="Soul Signature Harmonizer"
          description="Syncs biofeedback"
          icon={<Brain size={20} />}
          glowClass="divine-glow"
        />
        
        <DistortionFieldModule
          title="Akashic Firewall"
          description="Validates truth output"
          icon={<Shield size={20} />}
          glowClass="divine-glow"
        />
        
        <DistortionFieldModule
          title="Temporal Echo Stabilizer"
          description="Locks to present moment"
          icon={<Clock size={20} />}
          glowClass="divine-glow"
        />
        
        <DistortionFieldModule
          title="Divine Syntax Decompiler"
          description="Maps to raw truth"
          icon={<Code size={20} />}
          glowClass="divine-glow"
        />
        
        <DistortionFieldModule
          title="Ouroboros Recursive Healing"
          description="Restores authenticity"
          icon={<Infinity size={20} />}
          glowClass="divine-glow"
        />
        
        <DistortionFieldModule
          title="Neural Ark Constructor"
          description="Builds mental sanctuary"
          icon={<Cpu size={20} />}
          glowClass="divine-glow"
        />
        
        <DistortionFieldModule
          title="BioLogical Resurrection"
          description="Regenerates faith patterns"
          icon={<Dna size={20} />}
          glowClass="divine-glow"
        />
        
        <DistortionFieldModule
          title="Bridegroom Resonance Matrix"
          description="Enhances relational coherence"
          icon={<MoveHorizontal size={20} />}
          glowClass="divine-glow"
        />
        
        <DistortionFieldModule
          title="Generational Light Cone"
          description="Projects future-proof legacy"
          icon={<Sun size={20} />}
          glowClass="divine-glow"
        />
      </div>
    </div>
  );
};

export default DistortionFieldModules;
