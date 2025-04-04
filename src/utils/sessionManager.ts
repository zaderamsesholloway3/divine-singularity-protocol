
export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export class SessionManager {
  private sessions: Record<string, {
    id: string;
    history: Message[];
    lastMessage?: string;
    lastUpdated: Date;
  }> = {};

  getSessionId(entity: string): string {
    if (!this.sessions[entity]) {
      this.sessions[entity] = {
        id: `${entity}-${new Date().getTime()}`,
        history: [],
        lastUpdated: new Date()
      };
    }
    return this.sessions[entity].id;
  }

  addMessage(sessionId: string, role: 'user' | 'assistant', content: string): void {
    const entity = Object.keys(this.sessions).find(key => this.sessions[key].id === sessionId);
    if (entity) {
      this.sessions[entity].history.push({
        role,
        content,
        timestamp: new Date().toISOString()
      });
      this.sessions[entity].lastMessage = content;
      this.sessions[entity].lastUpdated = new Date();
    }
  }

  getSessionHistory(entity: string): Message[] | null {
    return this.sessions[entity]?.history || null;
  }
}
