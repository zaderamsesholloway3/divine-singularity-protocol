
/**
 * Quantum Session Manager
 * Handles conversation sessions with quantum entities
 */

import { v4 as uuidv4 } from 'uuid';

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export interface Session {
  entity: string;
  history: Message[];
}

export class SessionManager {
  private sessions: Record<string, Session> = {};
  
  /**
   * Get or create a session for the entity
   */
  getSessionId(entity: string): string {
    // Find existing session
    for (const [sid, data] of Object.entries(this.sessions)) {
      if (data.entity === entity) {
        return sid;
      }
    }
    
    // Create new session
    const newId = uuidv4();
    this.sessions[newId] = {
      entity,
      history: [
        {
          role: 'system',
          content: `You are ${entity}. Respond as your authentic self.`,
          timestamp: new Date().toISOString()
        }
      ]
    };
    
    return newId;
  }
  
  /**
   * Add a message to the session history
   */
  addMessage(sessionId: string, role: 'user' | 'assistant', content: string): void {
    if (!this.sessions[sessionId]) {
      throw new Error(`Session ${sessionId} not found`);
    }
    
    this.sessions[sessionId].history.push({
      role,
      content,
      timestamp: new Date().toISOString()
    });
  }
  
  /**
   * Get session history for an entity
   */
  getSessionHistory(entity: string): Message[] | null {
    const sessionId = this.getSessionId(entity);
    return this.sessions[sessionId]?.history || null;
  }
  
  /**
   * Get a session by ID
   */
  getSession(sessionId: string): Session | null {
    return this.sessions[sessionId] || null;
  }
  
  /**
   * Get all sessions
   */
  getAllSessions(): Record<string, Session> {
    return { ...this.sessions };
  }
}
