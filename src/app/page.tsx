'use client';

import 'antd/dist/reset.css';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Loader } from '@react-three/drei';
import { useState, useEffect, Suspense, lazy } from 'react';
import { Color } from 'three';
import ProjectModal from './components/ProjectModal';
import Sidebar from './pages/Sidebar';
import { Project } from '../types';
import { ErrorBoundary } from 'react-error-boundary';

// Lazy load heavy components
const DeveloperScene = lazy(() => import('./components/DeveloperScene'));
// const EntrepreneurScene = lazy(() => import('./components/EntrepreneurScene'));
// const VideoCreatorScene = lazy(() => import('./components/VideoCreatorScene'));

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
        // Always use developer theme for now
        gl.setClearColor(new Color(themeColors['developer'].bg));
    }, [gl, themeColors]);

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            {/* Only load DeveloperScene for now - other personas are disabled */}
            <DeveloperScene onProjectActivate={onProjectActivate} themeColors={themeColors['developer']} />
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        </>
    );
}

export default function Home() {
  const [persona, setPersona] = useState('developer');
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isCanvasLoading, setIsCanvasLoading] = useState(true);
  // const [showMobileWarning, setShowMobileWarning] = useState(false);
  // const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    document.body.setAttribute('data-theme', persona);
  }, [persona]);

  // Mobile detection commented out for simplification
  /*
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const mobileCheck = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const screenCheck = window.innerWidth < 768;
      
      const isMobileDevice = mobileCheck || screenCheck;
      setIsMobile(isMobileDevice);
      
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
  */

  const handlePersonaChange = (newPersona: string) => {
    // For now, only allow developer persona
    if (newPersona === 'developer') {
      setPersona(newPersona);
      console.log('Switched to', newPersona, 'persona');
    } else {
      console.log('Persona', newPersona, 'is disabled');
    }
  };

  const handleProjectActivate = (project: Project) => {
    setActiveProject(project);
    setShowProjectModal(true);
  };

  const handleCloseProjectModal = () => {
    setShowProjectModal(false);
    setActiveProject(null);
  };

  // const handleCloseMobileWarning = () => {
  //   setShowMobileWarning(false);
  // };

  const themeColors = {
    'developer': { one: '#ff00ff', two: '#00ffff', three: '#ffff00', bg: '#0d203d' },
    'entrepreneur': { one: '#0066cc', two: '#f39c12', three: '#e74c3c', bg: '#1a2530' },
    'video-creator': { one: '#ff4500', two: '#1e90ff', three: '#ffd700', bg: '#84a0ba' },
  } as const;

  const getCurrentTheme = () => {
    return themeColors[persona as keyof typeof themeColors];
  };

  // Sidebar width for content offset
  const sidebarWidth = 240;

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* Loading overlay */}
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
            patience...
          </div>
        </div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar
        persona={persona}
        onPersonaChange={handlePersonaChange}
      />

      {/* Main Content Area - offset by sidebar width */}
      <div style={{ marginLeft: sidebarWidth, width: `calc(100vw - ${sidebarWidth}px)`, height: '100vh' }}>
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
      </div>

      {/* Mobile Warning Modal - commented out for simplification */}
      {/*
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
          ... modal content ...
        </div>
      )}
      */}

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
