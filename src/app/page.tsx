'use client';

import 'antd/dist/reset.css'
import { Button } from 'antd';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Loader } from '@react-three/drei';
import { useRef, useState, useEffect, Suspense } from 'react';
import { Mesh, Color } from 'three';
import DeveloperScene from './components/DeveloperScene';
import EntrepreneurScene from './components/EntrepreneurScene';
import VideoCreatorScene from './components/VideoCreatorScene';
import ProjectModal from './components/ProjectModal';
import AIChatBox from '../components/AIChatBox';
import { useAIChat } from '../hooks/useAIChat';
import { Project } from '../types';

interface SceneProps {
  persona: string;
  themeColors: { [key: string]: { [key: string]: string } };
  onProjectActivate: (project: Project) => void;
}

function Scene({ persona, themeColors, onProjectActivate }: SceneProps) {
    const { gl } = useThree();
    useEffect(() => {
        gl.setClearColor(new Color(themeColors[persona].bg));
    }, [persona, gl, themeColors]);

    return (
        <>
            {persona !== 'video-creator' && (
                <>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                </>
            )}
            {persona === 'developer' && <DeveloperScene onProjectActivate={onProjectActivate} themeColors={themeColors[persona]} />}
            {persona === 'entrepreneur' && <EntrepreneurScene onProjectActivate={onProjectActivate} themeColors={themeColors[persona]} />}
            {persona === 'video-creator' && <VideoCreatorScene onProjectActivate={onProjectActivate} themeColors={themeColors[persona]} />}
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        </>
    );
}

export default function Home() {
  const [persona, setPersona] = useState('developer');
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [showChat, setShowChat] = useState(true);

  // Use AI Chat hook
  const {
    chatHistory,
    isLoading,
    isInitialized,
    sendMessage,
    addProjectToKnowledge,
    initializationProgress
  } = useAIChat({ persona });

  useEffect(() => {
    document.body.setAttribute('data-theme', persona);
  }, [persona]);

  const handlePersonaChange = (newPersona: string) => {
    setPersona(newPersona);
    console.log('Switched to', newPersona, 'persona');
  };

  const handleProjectActivate = (project: Project) => {
    setActiveProject(project);
    setShowProjectModal(true);
    
    // Add project to knowledge base when activated
    addProjectToKnowledge(project);
  };

  const handleCloseProjectModal = () => {
    setShowProjectModal(false);
    setActiveProject(null);
  };

  const themeColors = {
    developer: { one: '#ff00ff', two: '#00ffff', three: '#ffff00', bg: '#0a192f' },
    entrepreneur: { one: '#0066cc', two: '#f39c12', three: '#e74c3c', bg: '#2c3e50' },
    'video-creator': { one: '#ff4500', two: '#1e90ff', three: '#ffd700', bg: '#ff6b35' },
  } as const;

  const getCurrentTheme = () => {
    return themeColors[persona as keyof typeof themeColors];
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 1 }}>
        <Button
          type={persona === 'developer' ? "primary" : "default"}
          onClick={() => handlePersonaChange('developer')}
        >
          Computer Science
        </Button>
        <Button
          type={persona === 'entrepreneur' ? "primary" : 'default'}
          onClick={() => handlePersonaChange('entrepreneur')}
        >
          Entrepreneurship
        </Button>
        <Button
          type={persona === 'video-creator' ? 'primary' : 'default'}
          onClick={() => handlePersonaChange('video-creator')}
        >
         Hobbies & Others
        </Button>
        <Button
          type={voiceEnabled ? 'primary' : 'default'}
          onClick={() => setVoiceEnabled(!voiceEnabled)}
        >
          Voice {voiceEnabled ? 'On' : 'Off'}
        </Button>
        {showChat ? (
          <Button onClick={() => setShowChat(false)} ghost>
            Close Chat
          </Button>
        ) : (
          <Button onClick={() => setShowChat(true)}>Open Chat</Button>
        )}
      </div>

      <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
        <Suspense fallback={null}>
          <Scene persona={persona} themeColors={themeColors} onProjectActivate={handleProjectActivate} />
        </Suspense>
      </Canvas>
      <Loader />

      {showChat && (
        <AIChatBox 
          onSendMessage={sendMessage} 
          chatHistory={chatHistory} 
          isLoading={isLoading}
          isInitialized={isInitialized}
          voiceEnabled={voiceEnabled}
          initializationProgress={initializationProgress}
          themeColors={getCurrentTheme()}
        />
      )}
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

