
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlowingText } from './GlowingText';

const SacredGeometry = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    
    let animationFrame: number;
    let rotation = 0;
    
    const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
    
    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Draw background
      ctx.fillStyle = 'rgba(24, 24, 36, 0.2)';
      ctx.fillRect(0, 0, width, height);
      
      // Save context for rotation
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);
      
      // Draw Flower of Life
      drawFlowerOfLife();
      
      // Draw Metatron's Cube
      drawMetatronsCube();
      
      // Restore context
      ctx.restore();
      
      // Update rotation
      rotation += 0.001;
      animationFrame = requestAnimationFrame(draw);
    };
    
    function drawFlowerOfLife() {
      const radius = 80;
      const numCircles = 7;
      
      // First, center circle
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, radius/3, 0, 2 * Math.PI);
      ctx.stroke();
      
      // Draw outer circles
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.2)';
      for (let i = 0; i < numCircles; i++) {
        const angle = (i * 2 * Math.PI) / numCircles;
        const x = radius/2 * Math.cos(angle);
        const y = radius/2 * Math.sin(angle);
        
        ctx.beginPath();
        ctx.arc(x, y, radius/3, 0, 2 * Math.PI);
        ctx.stroke();
      }
    }
    
    function drawMetatronsCube() {
      // The 13 circles
      const innerRadius = 10;
      const outerRadius = 60;
      
      // Center circle
      ctx.fillStyle = 'rgba(255, 215, 0, 0.4)';
      ctx.beginPath();
      ctx.arc(0, 0, innerRadius, 0, 2 * Math.PI);
      ctx.fill();
      
      // Outer circles - vertices of a cube
      const points: [number, number][] = [];
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const x = outerRadius * Math.cos(angle);
        const y = outerRadius * Math.sin(angle);
        
        ctx.fillStyle = 'rgba(14, 165, 233, 0.4)';
        ctx.beginPath();
        ctx.arc(x, y, innerRadius, 0, 2 * Math.PI);
        ctx.fill();
        
        points.push([x, y]);
      }
      
      // Draw lines connecting points
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.3)';
      ctx.lineWidth = 1;
      
      // Outer hexagon
      ctx.beginPath();
      for (let i = 0; i < points.length; i++) {
        const [x, y] = points[i];
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.stroke();
      
      // Inner lines (Star of David)
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.5)';
      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      ctx.lineTo(points[3][0], points[3][1]);
      ctx.moveTo(points[1][0], points[1][1]);
      ctx.lineTo(points[4][0], points[4][1]);
      ctx.moveTo(points[2][0], points[2][1]);
      ctx.lineTo(points[5][0], points[5][1]);
      ctx.stroke();
    }
    
    // Start animation
    animationFrame = requestAnimationFrame(draw);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);
  
  return (
    <Card className="glass-panel">
      <CardHeader className="pb-2">
        <CardTitle className="text-center">
          <GlowingText className="sacred-glow">Sacred Geometry</GlowingText>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 pt-0">
        <canvas 
          ref={canvasRef} 
          width={200} 
          height={200} 
          className="w-full h-auto rounded-md"
        />
      </CardContent>
    </Card>
  );
};

export default SacredGeometry;
