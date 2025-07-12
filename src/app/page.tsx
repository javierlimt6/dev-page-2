'use client';

import 'antd/dist/reset.css';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Loader } from '@react-three/drei';
import { useRef, useState, useEffect, Suspense, lazy } from 'react';
import { Mesh, Color } from 'three';
import ProjectModal from './components/ProjectModal';
import Header from './pages/Header';
import { useAIChat } from '../hooks/useAIChat';
import { Project } from '../types';
import { ErrorBoundary } from 'react-error-boundary';

// Lazy load heavy components
const DeveloperScene = lazy(() => import('./components/DeveloperScene'));
const EntrepreneurScene = lazy(() => import('./components/EntrepreneurScene'));
const VideoCreatorScene = lazy(() => import('./components/VideoCreatorScene'));

// 3D Loading component for inside Canvas
const Scene3DLoader = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshBasicMaterial color="white" />
  </mesh>
);

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
  const [showChat, setShowChat] = useState(false);
  const [isCanvasLoading, setIsCanvasLoading] = useState(true);

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

  const handleVoiceToggle = () => {
    setVoiceEnabled(!voiceEnabled);
  };

  const handleChatToggle = () => {
    setShowChat(!showChat);
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
    'developer': { one: '#ff00ff', two: '#00ffff', three: '#ffff00', bg: '#0d203d' },
    'entrepreneur': { one: '#0066cc', two: '#f39c12', three: '#e74c3c', bg: '#1a2530' },
    'video-creator': { one: '#ff4500', two: '#1e90ff', three: '#ffd700', bg: '#84a0ba' },
  } as const;

  const getCurrentTheme = () => {
    return themeColors[persona as keyof typeof themeColors];
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* Loading overlay - OUTSIDE Canvas */}
      {isCanvasLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{ color: 'white', fontSize: '1.5rem' }}>
            Loading (pls wait a while)...
          </div>
        </div>
      )}

      {/* Instruction prompt */}
      <div style={{
        position: 'absolute',
        top: '5rem',
        left: '1rem',
        zIndex: 1000
      }}>
        <div style={{
          fontSize: '0.875rem',
          color: 'white',
          padding: '0.25rem 0.5rem',
          borderRadius: '0.375rem'
        }}>
          Hold with 1 finger to move around!
          Hold with 2 fingers to shift the camera
        </div>
      </div>

      <Header
        persona={persona}
        onPersonaChange={handlePersonaChange}
        voiceEnabled={voiceEnabled}
        onVoiceToggle={handleVoiceToggle}
        showChat={showChat}
        onChatToggle={handleChatToggle}
      />

      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Canvas
          camera={{ position: [0, 4, 8], fov: 90 }}
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
          gl={{ 
            antialias: false,
            alpha: false,
            powerPreference: "high-performance"
          }}
          onCreated={() => {
            // Hide loading overlay when canvas is ready
            setTimeout(() => setIsCanvasLoading(false), 1000);
          }}
        >
          <Suspense fallback={<Scene3DLoader />}>
            <Scene 
              persona={persona} 
              themeColors={themeColors} 
              onProjectActivate={handleProjectActivate} 
            />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
      <Loader />
      {showProjectModal && activeProject && (
        <ProjectModal
          title={activeProject.title}
          description={activeProject.description}
          imageUrl={activeProject.imageUrl}
          project={activeProject}
          themeColors={getCurrentTheme()}
          onClose={handleCloseProjectModal}
        />
      )}
    </div>
  );
}

