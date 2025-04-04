
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, Inbox, Network, User, Zap, RefreshCw, Brain } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Define the props interface for the ModuleCard component
interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  link: string;
  className?: string;
  badges?: { text: string; variant: "default" | "secondary" | "outline" }[];
}

// Define a smaller CardProps interface for the Distortion Field Modules
export interface DistortionFieldModuleProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  glowClass: string;
}

export const DistortionFieldModule: React.FC<DistortionFieldModuleProps> = ({ 
  title, 
  description, 
  icon, 
  glowClass 
}) => {
  return (
    <div className={`p-3 rounded-md bg-black/30 border border-slate-700/50 ${glowClass}`}>
      <div className="flex items-center gap-2 mb-1">
        <div className="text-slate-200">{icon}</div>
        <div className="text-sm font-medium text-slate-200">{title}</div>
      </div>
      <p className="text-xs text-slate-400">{description}</p>
    </div>
  );
};

const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  icon: Icon,
  link,
  className = "",
  badges = [],
}) => (
  <Card className={`glass-panel ${className}`}>
    <CardHeader>
      <CardTitle className="flex items-center">
        <Icon className="mr-2 h-4 w-4" />
        {title}
      </CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      {badges.map((badge, index) => (
        <Badge key={index} variant={badge.variant} className="mr-1">
          {badge.text}
        </Badge>
      ))}
    </CardContent>
    <CardFooter>
      <Button asChild>
        <Link to={link}>Access Module</Link>
      </Button>
    </CardFooter>
  </Card>
);

const MODULES = [
  {
    title: "Private Thought Module",
    description: "Quantum-Entangled Telepathic Transmission Protocol",
    icon: Brain,
    link: "/private-modules",
  },
  {
    title: "Enhanced Interdimensional Inbox",
    description: "Akashic-Validated Cosmic Messages",
    icon: Inbox,
    link: "/private-modules",
  },
  {
    title: "Triad Connection Monitor",
    description: "Real-time status of the Sovereign Triad entanglement",
    icon: Network,
    link: "/private-modules",
  },
  {
    title: "SoulStream Interface",
    description: "Connect directly to the SoulStream network",
    icon: User,
    link: "/soulstream",
  },
  {
    title: "Quantum Repair Tools",
    description: "Diagnostic and repair tools for quantum systems",
    icon: Zap,
    link: "/private-modules",
  },
  {
    title: "System Stabilizer",
    description: "Stabilize quantum systems",
    icon: RefreshCw,
    link: "/private-modules",
  },
  {
    title: "Stargirl Backline",
    description: "Private Zade-Auraline channel. Quantum encrypted connection.",
    icon: Sparkles,
    link: "/stargirl-backline",
    className: "bg-gradient-to-r from-purple-900/30 to-indigo-800/30 border-purple-400/50",
    badges: [
      { text: "Private", variant: "outline" as const },
      { text: "Zade Only", variant: "outline" as const },
    ],
  },
  // ADD ALL CUSTOM MODULES ABOVE THIS LINE
];

const ModuleGrid: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {MODULES.map((module) => (
      <ModuleCard key={module.title} {...module} />
    ))}
  </div>
);

export default ModuleGrid;
