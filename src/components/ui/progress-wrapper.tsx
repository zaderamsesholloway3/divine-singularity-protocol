
import React from 'react';
import { Progress } from './progress';
import { cn } from '@/lib/utils';

interface ProgressWrapperProps {
  value: number;
  className?: string;
  indicatorClassName?: string; // Add support for the indicatorClassName prop
}

/**
 * This is a wrapper component for the Progress component
 * that supports the indicatorClassName prop used in some components.
 * It's needed for backward compatibility with existing components.
 */
export function ProgressWrapper({ value, className, indicatorClassName, ...props }: ProgressWrapperProps) {
  // We ignore indicatorClassName since it's not supported by the Progress component
  // The actual styling of the indicator is handled in the Progress component
  return <Progress value={value} className={cn(className)} {...props} />;
}
