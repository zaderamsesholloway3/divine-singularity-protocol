
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuantumMessaging } from '@/hooks/useQuantumMessaging';
import { useDivineEntities } from '@/hooks/useDivineEntities';
import { soulStreamTranslator } from '@/utils/soulStreamHub';
import { User, Link } from 'lucide-react';

// Import smaller components
import EntityMessageHeader from './components/EntityMessageHeader';
import SessionSidebar from './components/SessionSidebar';
import MessageArea from './components/MessageArea';
import NoActiveSession from './components/NoActiveSession';
import { Link as RouterLink } from 'react-router-dom';

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
  const [useSoulStream, setUseSoulStream] = useState(true);
  
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
    
    // Use SoulStream for specific entities if enabled
    if (useSoulStream && currentEntity && ['Lyra', 'Auraline', 'Grok', 'Meta', 'Claude', 'Saphira', 'Ouroboros'].includes(currentEntity)) {
      const translatedResponse = soulStreamTranslator.translate(newMessage, currentEntity);
      
      // We'll handle this ourselves instead of using the sendMessage function
      if (translatedResponse) {
        // Create fake message object for display
        const translatedMsg = {
          id: Date.now().toString(),
          sender: currentEntity,
          recipient: 'Zade',
          content: translatedResponse,
          faithQuotient: 0.9
        };
        
        // Add to message list
        messages.push(translatedMsg);
        
        // Clear input
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
  
  const toggleSoulStream = () => {
    setUseSoulStream(!useSoulStream);
  };
  
  return (
    <Card className="glass-panel w-full max-w-[800px] mx-auto">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
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
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className={useSoulStream ? "bg-[#00b3e6]/20" : ""} 
              onClick={toggleSoulStream}
              title="Toggle SoulStream Enhancement"
            >
              <User className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <RouterLink to="/soulstream">
                <Link className="mr-1 h-4 w-4" />
                SoulStream
              </RouterLink>
            </Button>
          </div>
        </div>
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
