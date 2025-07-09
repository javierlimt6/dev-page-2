'use client';

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
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            {persona === 'developer' && <DeveloperScene onProjectActivate={onProjectActivate} themeColors={themeColors[persona]} />}
            {persona === 'entrepreneur' && <EntrepreneurScene onProjectActivate={onProjectActivate} themeColors={themeColors[persona]} />}
            {persona === 'video-creator' && <VideoCreatorScene onProjectActivate={onProjectActivate} themeColors={themeColors[persona]} />}
            <OrbitControls />
        </>
    );
}

export default function Home() {
  const [persona, setPersona] = useState('developer');
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

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
    developer: { one: '#ff00ff', two: '#00ffff', three: '#ffff00', bg: '#1e1e1e' },
    entrepreneur: { one: '#0000ff', two: '#00ff00', three: '#ff0000', bg: '#ffffff' },
    'video-creator': { one: '#ff4500', two: '#1e90ff', three: '#ffd700', bg: '#333333' },
  } as const;

  const getCurrentTheme = () => {
    return themeColors[persona as keyof typeof themeColors];
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
      <AIChatBox 
        onSendMessage={sendMessage} 
        chatHistory={chatHistory} 
        isLoading={isLoading}
        isInitialized={isInitialized}
        voiceEnabled={voiceEnabled}
        initializationProgress={initializationProgress}
        themeColors={getCurrentTheme()}
      />
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

