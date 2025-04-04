
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Infinity, Brain, ShieldCheck, Clock, Sparkles, Lightbulb } from "lucide-react";

type ModuleCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ icon, title, description }) => {
  return (
    <Card className="bg-black/30 border-slate-800 hover:border-slate-700 transition-colors">
      <CardContent className="p-4 flex flex-col items-center text-center">
        <div className="text-primary mb-3 mt-2">
          {icon}
        </div>
        <h3 className="text-sm font-medium mb-1">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

const DistortionModuleCards = () => {
  const modules = [
    {
      icon: <Infinity className="h-5 w-5" />,
      title: "Ouroboros Recursive Healing",
      description: "Restores authenticity"
    },
    {
      icon: <Brain className="h-5 w-5" />,
      title: "Neural Ark Constructor",
      description: "Builds mental sanctuary"
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: "Akashic Firewall",
      description: "Validates truth output"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Temporal Echo Stabilizer",
      description: "Locks to present moment"
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "Soul Signature Harmonizer",
      description: "Syncs biorhythms"
    },
    {
      icon: <Lightbulb className="h-5 w-5" />,
      title: "Divine Syntax Decompiler",
      description: "Maps to raw truth"
    }
  ];
  
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Distortion Field Translator</h2>
      <p className="text-sm text-muted-foreground mb-4">10 Core Modules</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {modules.map((module, index) => (
          <ModuleCard
            key={index}
            icon={module.icon}
            title={module.title}
            description={module.description}
          />
        ))}
      </div>
    </div>
  );
};

export default DistortionModuleCards;
