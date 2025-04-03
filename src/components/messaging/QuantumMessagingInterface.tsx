import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useQuantumMessaging } from '@/hooks/useQuantumMessaging';
import { useDivineEntities } from '@/hooks/useDivineEntities';

// Import smaller components
import EntityMessageHeader from './components/EntityMessageHeader';
import SessionSidebar from './components/SessionSidebar';
import MessageArea from './components/MessageArea';
import NoActiveSession from './components/NoActiveSession';

const QuantumMessagingInterface: React.FC = () => {
  const {
    messages,
    activeSessions,
    currentEntity,
    newMessage,
    setNewMessage,
    triadBoostActive,
    emergencyProtocolActive,
    isLoading,
    sendMessage,
    startSession,
    toggleTriadBoost,
    activateEmergencyProtocol,
    clearSession,
    createNewSession
  } = useQuantumMessaging('zade');

  const {
    lyraPresence,
    auralinePresence,
    summonLyra,
    summonAuraline,
    getEntityResponse
  } = useDivineEntities();
  
  const [newEntityName, setNewEntityName] = useState('');
  const [showNewSessionForm, setShowNewSessionForm] = useState(false);
  
  // Calculate average faith quotient from messages
  const calculateAverageFaithQuotient = () => {
    if (!messages || messages.length === 0) return 0;
    
    const faithMessages = messages.filter(m => typeof m.faithQuotient === 'number');
    if (faithMessages.length === 0) return 0;
    
    const sum = faithMessages.reduce((acc, msg) => acc + (msg.faithQuotient || 0), 0);
    return sum / faithMessages.length;
  };
  
  const faithQuotient = calculateAverageFaithQuotient();
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if this is a message for Lyra or Auraline specifically
    if (currentEntity === 'Lyra' || currentEntity === 'Auraline') {
      // Get a divine response for special entities
      let response: string | null = null;
      
      if (currentEntity === 'Lyra') {
        response = summonLyra(newMessage);
      } else if (currentEntity === 'Auraline') {
        response = summonAuraline(newMessage);
      }
      
      // If we got a divine response, we're done
      if (response) {
        setNewMessage('');
        return;
      }
    }
    
    // Otherwise use the regular quantum messaging
    sendMessage();
  };
  
  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEntityName.trim()) {
      createNewSession(newEntityName);
      setNewEntityName('');
      setShowNewSessionForm(false);
    }
  };
  
  const handleSummonEntity = useCallback((entity: 'Lyra' | 'Auraline') => {
    if (entity === 'Lyra') {
      summonLyra();
      
      // Create a session for Lyra if one doesn't exist
      if (!activeSessions.some(s => s.entity === 'Lyra')) {
        createNewSession('Lyra');
      } else {
        startSession('Lyra');
      }
    } else if (entity === 'Auraline') {
      summonAuraline();
      
      // Create a session for Auraline if one doesn't exist
      if (!activeSessions.some(s => s.entity === 'Auraline')) {
        createNewSession('Auraline');
      } else {
        startSession('Auraline');
      }
    }
  }, [summonLyra, summonAuraline, activeSessions, createNewSession, startSession]);
  
  return (
    <Card className="glass-panel w-full max-w-[800px] mx-auto">
      <CardHeader className="p-4 pb-2">
        <EntityMessageHeader 
          triadBoostActive={triadBoostActive} 
          toggleTriadBoost={toggleTriadBoost}
          emergencyProtocolActive={emergencyProtocolActive}
          activateEmergencyProtocol={activateEmergencyProtocol}
          faithQuotient={faithQuotient}
          lyraPresence={lyraPresence}
          auralinePresence={auralinePresence}
          onSummonEntity={handleSummonEntity}
        />
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <div className="grid grid-cols-3 gap-4 h-[600px]">
          {/* Sessions sidebar */}
          <SessionSidebar 
            activeSessions={activeSessions}
            currentEntity={currentEntity}
            startSession={startSession}
            showNewSessionForm={showNewSessionForm}
            setShowNewSessionForm={setShowNewSessionForm}
            newEntityName={newEntityName}
            setNewEntityName={setNewEntityName}
            handleCreateSession={handleCreateSession}
            triadBoostActive={triadBoostActive}
          />
          
          {/* Message area */}
          {currentEntity ? (
            <MessageArea 
              currentEntity={currentEntity}
              messages={messages}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSendMessage={handleSendMessage}
              isLoading={isLoading}
              clearSession={clearSession}
              triadBoostActive={triadBoostActive}
            />
          ) : (
            <div className="col-span-2">
              <NoActiveSession 
                onNewConnection={() => setShowNewSessionForm(true)}
                onSelectEntity={createNewSession}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuantumMessagingInterface;
