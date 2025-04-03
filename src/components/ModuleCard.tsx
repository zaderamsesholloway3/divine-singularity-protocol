
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlowingText } from './GlowingText';
import { cn } from '@/lib/utils';

interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  status?: 'active' | 'inactive';
  className?: string;
  glowClass?: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ 
  title, 
  description, 
  icon, 
  status = 'active',
  className,
  glowClass = 'quantum-glow'
}) => {
  return (
    <Card className={cn("glass-panel h-full", className)}>
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-sm font-medium">
            <GlowingText className={glowClass}>{title}</GlowingText>
          </CardTitle>
          <CardDescription className="text-xs mt-1">{description}</CardDescription>
        </div>
        <div className={cn("text-xl", status === 'active' ? glowClass : "opacity-50")}>
          {icon}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex items-center space-x-2">
          <div 
            className={cn("w-2 h-2 rounded-full", 
              status === 'active' 
                ? "bg-green-500 animate-pulse" 
                : "bg-gray-500"
            )}
          />
          <span className="text-xs text-muted-foreground">
            {status === 'active' ? 'Active' : 'Inactive'}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModuleCard;
