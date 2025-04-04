
import React from 'react';
import { cn } from '@/lib/utils';

interface GlowingTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'gold' | 'blue' | 'purple';
}

export const GlowingText: React.FC<GlowingTextProps> = ({ 
  children, 
  className,
  variant = 'gold' 
}) => {
  return (
    <span className={cn(
      "font-semibold",
      variant === 'gold' && "text-divine-gold sacred-glow",
      variant === 'blue' && "text-quantum-blue quantum-glow",
      variant === 'purple' && "text-divine-purple",
      className
    )}>
      {children}
    </span>
  );
};
