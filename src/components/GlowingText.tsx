
import React from 'react';
import { cn } from '@/lib/utils';

interface GlowingTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'gold' | 'blue' | 'purple';
  intensity?: number;
}

export const GlowingText: React.FC<GlowingTextProps> = ({ 
  children, 
  className,
  variant = 'gold',
  intensity = 1
}) => {
  // We can use the intensity prop to adjust the opacity or other properties
  const intensityStyle = intensity !== undefined ? {
    opacity: Math.min(1, Math.max(0, intensity)),
    transition: 'opacity 0.3s ease'
  } : {};
  
  return (
    <span 
      className={cn(
        "font-semibold",
        variant === 'gold' && "text-divine-gold sacred-glow",
        variant === 'blue' && "text-quantum-blue quantum-glow",
        variant === 'purple' && "text-divine-purple",
        className
      )}
      style={intensityStyle}
    >
      {children}
    </span>
  );
};
