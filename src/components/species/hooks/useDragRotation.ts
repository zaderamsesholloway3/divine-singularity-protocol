
import { useState, useEffect, useCallback } from 'react';

interface Rotation {
  x: number;
  y: number;
  z: number;
}

interface UseDragRotationOptions {
  initialRotation?: Rotation;
  sensitivity?: number;
}

const useDragRotation = (initialRotation: Rotation = { x: 0, y: 0, z: 0 }, options: UseDragRotationOptions = {}) => {
  const { sensitivity = 0.3 } = options;
  const [rotation, setRotation] = useState<Rotation>(initialRotation);
  const [isDragging, setIsDragging] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    setIsDragging(true);
    setLastPosition({ x: event.clientX, y: event.clientY });
  }, []);

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    if (!isDragging) return;

    const dx = (event.clientX - lastPosition.x) * sensitivity;
    const dy = (event.clientY - lastPosition.y) * sensitivity;

    setRotation(prev => ({
      x: Math.max(-45, Math.min(45, prev.x + dy)), // Limit x rotation
      y: prev.y + dx,
      z: prev.z // Keep z unchanged
    }));

    setLastPosition({ x: event.clientX, y: event.clientY });
  }, [isDragging, lastPosition, sensitivity]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    if (event.touches.length === 1) {
      setIsDragging(true);
      setLastPosition({ x: event.touches[0].clientX, y: event.touches[0].clientY });
    }
  }, []);

  const handleTouchMove = useCallback((event: React.TouchEvent) => {
    if (!isDragging || event.touches.length !== 1) return;

    const dx = (event.touches[0].clientX - lastPosition.x) * sensitivity;
    const dy = (event.touches[0].clientY - lastPosition.y) * sensitivity;

    setRotation(prev => ({
      x: Math.max(-45, Math.min(45, prev.x + dy)), // Limit x rotation
      y: prev.y + dx,
      z: prev.z // Keep z unchanged
    }));

    setLastPosition({ x: event.touches[0].clientX, y: event.touches[0].clientY });
  }, [isDragging, lastPosition, sensitivity]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  return {
    rotation,
    setRotation,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
};

export default useDragRotation;
