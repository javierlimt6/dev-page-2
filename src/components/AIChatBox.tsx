import { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../hooks/useAIChat';

interface AIChatBoxProps {
  onSendMessage: (message: string) => void;
  chatHistory: ChatMessage[];
  isLoading: boolean;
  isInitialized: boolean;
  voiceEnabled: boolean;
  initializationProgress?: string | null;
  themeColors: { [key: string]: string };
}

export default function AIChatBox({
  onSendMessage,
  chatHistory,
  isLoading,
  isInitialized,
  voiceEnabled,
  initializationProgress,
  themeColors
}: AIChatBoxProps) {
  const [message, setMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (message.trim() && isInitialized && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (voiceEnabled && chatHistory.length > 0) {
      const lastBotMessage = chatHistory[chatHistory.length - 1];
      if (lastBotMessage?.sender === 'bot') {
        const utterance = new SpeechSynthesisUtterance(lastBotMessage.message);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
      }
    }
  }, [chatHistory, voiceEnabled]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div 
      style={{ 
        position: 'absolute', 
        bottom: 20, 
        right: 20, 
        zIndex: 1, 
        background: 'rgba(0,0,0,0.8)', 
        padding: 15, 
        borderRadius: 10, 
        width: 350,
        maxHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        border: `2px solid ${themeColors.one}`,
        boxShadow: `0 0 20px ${themeColors.one}40`
      }}
    >
      {/* Header */}
      <div style={{ 
        color: themeColors.one, 
        fontWeight: 'bold', 
        marginBottom: 10,
        textAlign: 'center',
        fontSize: '14px'
      }}>
        AI Javier
        {initializationProgress && (
          <div style={{ 
            color: themeColors.two, 
            fontSize: '12px', 
            marginTop: 2 
          }}>
            {initializationProgress}
          </div>
        )}
      </div>

      {/* Chat History */}
      <div 
        ref={chatContainerRef}
        style={{ 
          height: 250, 
          overflowY: 'auto', 
          border: `1px solid ${themeColors.two}`, 
          padding: 10, 
          marginBottom: 10,
          backgroundColor: 'rgba(0,0,0,0.3)',
          borderRadius: 5
        }}
      >
        {chatHistory.length === 0 && isInitialized && (
          <div style={{ 
            color: themeColors.three, 
            fontSize: '12px',
            textAlign: 'center',
            marginTop: 20
          }}>
            Hello! I am a clone of Javier, built on Llama-3.2. Ask me about my projects, skills, or experiences!
          </div>
        )}
        
        {chatHistory.map((chat, i) => (
          <div key={i} style={{ 
            marginBottom: 8,
            padding: 8,
            borderRadius: 5,
            backgroundColor: chat.sender === 'user' 
              ? `${themeColors.one}20` 
              : `${themeColors.two}20`,
            borderLeft: `3px solid ${
              chat.sender === 'user' ? themeColors.one : themeColors.two
            }`
          }}>
            <div style={{ 
              color: chat.sender === 'user' ? themeColors.one : themeColors.two,
              fontWeight: 'bold',
              fontSize: '11px',
              marginBottom: 2,
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <span>{chat.sender === 'user' ? 'You' : 'AI Assistant'}</span>
              <span style={{ opacity: 0.7 }}>{formatTime(chat.timestamp)}</span>
            </div>
            <div style={{ 
              color: '#fff',
              fontSize: '13px',
              lineHeight: 1.4,
              whiteSpace: 'pre-wrap'
            }}>
              {chat.message}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div style={{ 
            color: themeColors.two, 
            fontSize: '12px',
            textAlign: 'center',
            padding: 10
          }}>
            <div style={{ 
              display: 'inline-block',
              animation: 'pulse 1.5s ease-in-out infinite'
            }}>
              Javier AI is thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div style={{ display: 'flex', gap: 8 }}>
        <input 
          type="text" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={isInitialized ? "Ask me anything..." : "Initializing..."}
          disabled={!isInitialized || isLoading}
          style={{ 
            flex: 1,
            background: 'rgba(255,255,255,0.1)', 
            color: '#fff', 
            border: `1px solid ${themeColors.two}`, 
            padding: 8, 
            borderRadius: 4,
            fontSize: '13px',
            outline: 'none'
          }} 
        />
        <button 
          onClick={handleSend}
          disabled={!isInitialized || isLoading || !message.trim()}
          style={{ 
            background: isInitialized && !isLoading && message.trim() 
              ? themeColors.one 
              : 'rgba(255,255,255,0.2)', 
            color: '#fff', 
            border: 'none', 
            padding: '8px 12px', 
            borderRadius: 4,
            cursor: isInitialized && !isLoading && message.trim() ? 'pointer' : 'not-allowed',
            fontSize: '13px',
            transition: 'background-color 0.2s'
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
