
import React from 'react';
import { cn } from '@/lib/utils';

interface GlowingTextProps {
  children: React.ReactNode;
  className?: string;
}

export const GlowingText: React.FC<GlowingTextProps> = ({ children, className }) => {
  return (
    <span className={cn("font-semibold", className)}>
      {children}
    </span>
  );
};
