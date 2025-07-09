'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Loader } from '@react-three/drei';
import { useRef, useState, useEffect, Suspense } from 'react';
import { Mesh, Color } from 'three';
import DeveloperScene from './components/DeveloperScene';
import EntrepreneurScene from './components/EntrepreneurScene';
import VideoCreatorScene from './components/VideoCreatorScene';
import ProjectModal from './components/ProjectModal';

function Scene({ persona, themeColors, onProjectActivate }) {
    const { gl } = useThree();
    useEffect(() => {
        gl.setClearColor(new Color(themeColors[persona].bg));
    }, [persona, gl, themeColors]);

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            {persona === 'developer' && <DeveloperScene onProjectActivate={onProjectActivate} />}
            {persona === 'entrepreneur' && <EntrepreneurScene onProjectActivate={onProjectActivate} />}
            {persona === 'video-creator' && <VideoCreatorScene onProjectActivate={onProjectActivate} />}
            <OrbitControls />
        </>
    );
}

function ChatBox({ onSendMessage, chatHistory, voiceEnabled }) {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        onSendMessage(message);
        setMessage('');
    }

    useEffect(() => {
        if (voiceEnabled) {
            const lastBotMessage = chatHistory.findLast(chat => chat.sender === 'bot');
            if (lastBotMessage) {
                const utterance = new SpeechSynthesisUtterance(lastBotMessage.message);
                speechSynthesis.speak(utterance);
            }
        }
    }, [chatHistory, voiceEnabled]);

    return (
        <div style={{ position: 'absolute', bottom: 20, right: 20, zIndex: 1, background: 'rgba(0,0,0,0.5)', padding: 10, borderRadius: 5, width: 300 }}>
            <div style={{ height: 200, overflowY: 'scroll', border: '1px solid #fff', padding: 5, marginBottom: 10 }}>
                {chatHistory.map((chat, i) => (
                    <div key={i} style={{ color: chat.sender === 'user' ? '#fff' : '#add8e6' }}>
                        <b>{chat.sender}:</b> {chat.message}
                    </div>
                ))}
            </div>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} style={{ background: '#333', color: '#fff', border: '1px solid #fff', padding: 5, width: 'calc(100% - 60px)' }} />
            <button onClick={handleSend} style={{ background: '#555', color: '#fff', border: '1px solid #fff', padding: 5, marginLeft: 5, width: 50 }}>Send</button>
        </div>
    )
}

export default function Home() {
  const [persona, setPersona] = useState('developer');
  const [chatHistory, setChatHistory] = useState([]);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    document.body.setAttribute('data-theme', persona);
  }, [persona]);

  const handlePersonaChange = (newPersona: string) => {
    setPersona(newPersona);
    console.log('Switched to', newPersona, 'persona');
  };

  const handleSendMessage = (message: string) => {
    const newUserMessage = { sender: 'user', message };
    const newBotMessage = { sender: 'bot', message: `Echo: ${message}` };
    setChatHistory([...chatHistory, newUserMessage, newBotMessage]);
  };

  const handleProjectActivate = (project) => {
    setActiveProject(project);
    setShowProjectModal(true);
  };

  const handleCloseProjectModal = () => {
    setShowProjectModal(false);
    setActiveProject(null);
  };

  const themeColors = {
    developer: { one: '#ff00ff', two: '#00ffff', three: '#ffff00', bg: '#1e1e1e' },
    entrepreneur: { one: '#0000ff', two: '#00ff00', three: '#ff0000', bg: '#ffffff' },
    'video-creator': { one: '#ff4500', two: '#1e90ff', three: '#ffd700', bg: '#333333' },
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 1 }}>
        <button
          onClick={() => handlePersonaChange('developer')}
          className={`persona-button ${persona === 'developer' ? 'active' : ''}`}>
          Developer
        </button>
        <button
          onClick={() => handlePersonaChange('entrepreneur')}
          className={`persona-button ${persona === 'entrepreneur' ? 'active' : ''}`}>
          Entrepreneur
        </button>
        <button
          onClick={() => handlePersonaChange('video-creator')}
          className={`persona-button ${persona === 'video-creator' ? 'active' : ''}`}>
          Video Creator
        </button>
        <button
          onClick={() => setVoiceEnabled(!voiceEnabled)}
          className="persona-button"
          style={{ marginLeft: 10, background: voiceEnabled ? 'green' : 'red' }}>
          Voice {voiceEnabled ? 'On' : 'Off'}
        </button>
      </div>
      <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
        <Suspense fallback={null}>
          <Scene persona={persona} themeColors={themeColors} onProjectActivate={handleProjectActivate} />
        </Suspense>
      </Canvas>
      <Loader />
      <ChatBox onSendMessage={handleSendMessage} chatHistory={chatHistory} voiceEnabled={voiceEnabled} />
      {showProjectModal && activeProject && (
        <ProjectModal
          title={activeProject.title}
          description={activeProject.description}
          imageUrl={activeProject.imageUrl}
          onClose={handleCloseProjectModal}
        />
      )}
    </div>
  );
}

