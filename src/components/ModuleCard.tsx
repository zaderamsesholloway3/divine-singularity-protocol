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

interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  link: string;
  className?: string;
  badges?: { text: string; variant: "default" | "secondary" | "outline" }[];
}

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
