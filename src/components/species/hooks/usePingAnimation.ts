
import { useState, useEffect } from 'react';

const usePingAnimation = (showPingTrail: boolean) => {
  const [pingAnimationProgress, setPingAnimationProgress] = useState(0);
  
  useEffect(() => {
    let animationFrame: number;
    let startTime: number;
    
    if (showPingTrail) {
      startTime = Date.now();
      const animatePing = () => {
        const elapsed = Date.now() - startTime;
        const duration = 10000; // 10 seconds
        const progress = Math.min(elapsed / duration, 1);
        
        setPingAnimationProgress(progress);
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animatePing);
        }
      };
      
      animationFrame = requestAnimationFrame(animatePing);
    } else {
      setPingAnimationProgress(0);
    }
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [showPingTrail]);
  
  return pingAnimationProgress;
};

export default usePingAnimation;
