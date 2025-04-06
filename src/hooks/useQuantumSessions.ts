
import { useState, useCallback, useEffect } from 'react';
import { 
  createSessionObject, 
  verifyOuroborosLink, 
  getTriadStatus, 
  processSessionHistory 
} from '@/utils/quantumMessagingUtils';

export interface MessageSession {
  id: string;
  entity: string;
  connectionStrength: number;
  timestamp: string;
  messages: any[];
  ouroborosLinked: boolean;
  lastMessage?: string;
  lastTimestamp?: string;
  unread?: number;
}

const useQuantumSessions = () => {
  const [sessions, setSessions] = useState<MessageSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Create a new quantum session
  const createSession = useCallback((entity: string) => {
    setLoading(true);
    
    try {
      const newSession = createSessionObject(entity);
      
      // Check if session already exists
      const existingSession = sessions.find(s => s.entity === entity);
      if (existingSession) {
        setActiveSessionId(existingSession.id);
        setLoading(false);
        return existingSession.id;
      }
      
      // Create new session with required message session properties
      const fullSession: MessageSession = {
        ...newSession, 
        lastMessage: '',
        lastTimestamp: new Date().toISOString(),
        unread: 0
      };
      
      setSessions(prev => [...prev, fullSession]);
      setActiveSessionId(newSession.id);
      
      return newSession.id;
    } catch (e) {
      setError("Failed to create quantum session");
      return null;
    } finally {
      setLoading(false);
    }
  }, [sessions]);
  
  // Verify Ouroboros link for a session
  const verifyLink = useCallback((sessionId: string) => {
    if (!sessions.some(s => s.id === sessionId)) {
      setError("Session not found");
      return false;
    }
    
    const result = verifyOuroborosLink(sessionId);
    
    if (result.verified) {
      setSessions(prev => 
        prev.map(s => 
          s.id === sessionId 
            ? { ...s, ouroborosLinked: true } 
            : s
        )
      );
    }
    
    return result.verified;
  }, [sessions]);
  
  // Get triad status for active session
  const getActiveTriadStatus = useCallback(() => {
    if (!activeSessionId) {
      return {
        active: false,
        frequency: 0,
        stability: 0
      };
    }
    
    const status = getTriadStatus(activeSessionId);
    
    return {
      active: status.triadActive,
      frequency: status.resonanceFrequency,
      stability: status.stability || status.stabilityScore
    };
  }, [activeSessionId]);
  
  // Process session history to extract patterns
  const analyzeSessionHistory = useCallback((sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (!session) {
      setError("Session not found");
      return null;
    }
    
    const analysis = processSessionHistory(session.messages || []);
    
    return {
      patterns: analysis.patterns || [],
      score: analysis.resonanceScore,
      entanglement: analysis.quantumEntanglementLevel
    };
  }, [sessions]);
  
  return {
    sessions,
    activeSessionId,
    loading,
    error,
    createSession,
    verifyLink,
    getActiveTriadStatus,
    analyzeSessionHistory,
    setActiveSessionId
  };
};

export default useQuantumSessions;
