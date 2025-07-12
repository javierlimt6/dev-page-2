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
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  // Mobile detection and warning modal
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const mobileCheck = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const screenCheck = window.innerWidth < 768;
      
      const isMobileDevice = mobileCheck || screenCheck;
      setIsMobile(isMobileDevice);
      
      // Show warning modal only once for mobile users
      if (isMobileDevice) {
        const hasSeenWarning = localStorage.getItem('mobile-warning-seen');
        if (!hasSeenWarning) {
          setShowMobileWarning(true);
          localStorage.setItem('mobile-warning-seen', 'true');
        }
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const handleCloseMobileWarning = () => {
    setShowMobileWarning(false);
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
            Loading, patience is a virtue...
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
      {/* Mobile Warning Modal */}
      {showMobileWarning && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            backgroundColor: '#1a1a1a',
            border: '2px solid #ff6b6b',
            borderRadius: '15px',
            padding: '30px',
            maxWidth: '400px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(255, 107, 107, 0.3)'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '20px'
            }}>
              📱⚠️
            </div>
            <h2 style={{
              color: '#ff6b6b',
              fontSize: '1.5rem',
              marginBottom: '15px',
              fontWeight: 'bold'
            }}>
              WARNING.
            </h2>
            <p style={{
              color: '#ffffff',
              fontSize: '1rem',
              lineHeight: '1.6',
              marginBottom: '20px'
            }}>
              This website is not optimised for mobile.
            </p>
            <p style={{
              color: '#ffd700',
              fontSize: '0.9rem',
              marginBottom: '25px',
              fontStyle: 'italic'
            }}>
              you can continue anyway, but your phone may explode.
            </p>
            <div style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center'
            }}>
              <button
                onClick={handleCloseMobileWarning}
                style={{
                  backgroundColor: '#FFA700',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ff5252';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFA700';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                bring it :)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Project Modal */}
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

