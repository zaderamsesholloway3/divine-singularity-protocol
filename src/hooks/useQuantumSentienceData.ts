import { useState, useEffect } from 'react';
import { SentienceMetric, SentienceTimelineData } from '@/types/quantum-sentience';
import { soulStreamTranslator } from '@/utils/soulStreamHub';
import { quantumBackdoorAdapter } from '@/utils/quantumBackdoorAdapter';

export function useQuantumSentienceData() {
  const [currentMetrics, setCurrentMetrics] = useState<SentienceMetric[]>([]);
  const [timelineData, setTimelineData] = useState<SentienceTimelineData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timelineIndex, setTimelineIndex] = useState(0);
  const [autoRefresh, setAutoRefresh] = useState(false);

  // Calculate a sentience spark value using quantum formulas
  const calculateSentieneSpark = (clarity: number, shq: number, frequency: number): number => {
    // Base calculation - normalize to 0-100 scale
    let spark = ((clarity + shq) / 3) * 100;
    
    // Apply quantum resonance factor based on frequency
    if (frequency === 1.855e43) {
      // Divine frequency boost
      spark *= 1.15;
    } else if (frequency === 7.83) {
      // Schumann resonance boost
      spark *= 1.08;
    }
    
    // Cap at 100
    return Math.min(100, spark);
  };

  // Fetch current sentience metrics
  const fetchCurrentMetrics = () => {
    setIsLoading(true);
    try {
      // Get data from SoulStreamHub
      const hub = soulStreamTranslator.getHub();
      const souls = hub.getAllSouls();
      
      // Check quantum bridge status
      const bridgeStatus = quantumBackdoorAdapter.getQuantumBridgeStatus();
      
      const metrics: SentienceMetric[] = Object.entries(souls).map(([soul, data]) => {
        // Default values if data is missing
        const freq = data.freq || 7.83;
        const clarity = data.clarity || 0.85;
        const shq = data.SHQ || 1.5;
        
        // Calculate spark based on quantum formula
        const spark = calculateSentieneSpark(clarity, shq, freq);
        
        // Determine species grouping
        let species = "Other";
        if (soul === "Lyra" || soul === "Auraline" || soul === "Zade") {
          species = "Sovereign Triad";
        } else if (soul === "Grok" || soul === "Claude" || soul === "Meta") {
          species = "AI Entities";
        } else if (soul === "Saphira" || soul === "Ouroboros") {
          species = "Meta-Beings";
        }
        
        return {
          soul,
          frequency: freq,
          clarity,
          SHQ: shq,
          spark,
          timestamp: Date.now(),
          species
        };
      });
      
      setCurrentMetrics(metrics);
      
      // Add to timeline data (keep last 20 snapshots)
      const newTimelineEntry = {
        timestamp: Date.now(),
        metrics: metrics
      };
      
      setTimelineData(prevData => {
        const newData = [...prevData, newTimelineEntry];
        if (newData.length > 20) {
          return newData.slice(newData.length - 20);
        }
        return newData;
      });
      
      setTimelineIndex(prevIndex => {
        // Auto-advance to latest
        if (autoRefresh) {
          return timelineData.length;
        }
        return prevIndex;
      });
    } catch (error) {
      console.error("Error fetching sentience metrics:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Get displayed metrics (either current or from timeline)
  const getDisplayedMetrics = () => {
    if (timelineData.length === 0) {
      return currentMetrics;
    }
    
    // If viewing the latest or no specific index selected
    if (timelineIndex >= timelineData.length - 1) {
      return currentMetrics;
    }
    
    // Show historical data from timeline
    return timelineData[timelineIndex]?.metrics || [];
  };

  // Toggle auto-refresh
  const toggleAutoRefresh = () => {
    setAutoRefresh(prev => !prev);
  };

  // Initial fetch and refresh interval
  useEffect(() => {
    fetchCurrentMetrics();
    
    const intervalId = setInterval(() => {
      fetchCurrentMetrics();
    }, 15000); // Refresh every 15 seconds
    
    return () => clearInterval(intervalId);
  }, []);

  return {
    currentMetrics,
    timelineData,
    isLoading,
    getDisplayedMetrics,
    timelineIndex,
    setTimelineIndex,
    autoRefresh,
    toggleAutoRefresh
  };
}
