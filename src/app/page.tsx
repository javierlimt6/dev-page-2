'use client';

import 'antd/dist/reset.css';
import { Canvas, useThree, } from '@react-three/fiber';
import { OrbitControls, Loader } from '@react-three/drei';
import { useState, useEffect, Suspense, lazy } from 'react';
import { Color } from 'three';
import ProjectModal from './components/ProjectModal';
import Sidebar from './pages/Sidebar';
import Page2D from './pages/Page2D';
import { Project } from '../types';
import { ErrorBoundary } from 'react-error-boundary';
import * as THREE from 'three';

// Lazy load heavy components
const DeveloperScene = lazy(() => import('./components/DeveloperScene'));
import { FORCE_SUNSET } from './components/DeveloperScene';
// const EntrepreneurScene = lazy(() => import('./components/EntrepreneurScene'));
// const VideoCreatorScene = lazy(() => import('./components/VideoCreatorScene'));

// 3D Loading component for inside Canvas
const Scene3DLoader = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshBasicMaterial color="white" />
  </mesh>
);

// Dynamic Time Indicator for the 3D scene
function DynamicTimeIndicator() {
  const [time, setTime] = useState(new Date());
  const [overrideHour, setOverrideHour] = useState<number | null>(null);
  const [showSlider, setShowSlider] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  
  // Dispatch custom event when override changes so DeveloperScene can listen
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('timeOverride', { 
      detail: { hour: overrideHour } 
    }));
  }, [overrideHour]);
  
  const displayHour = overrideHour !== null ? overrideHour : time.getHours() + time.getMinutes() / 60;
  const isNight = displayHour < 6 || displayHour >= 18;
  const icon = isNight ? '🌙' : '☀️';
  
  const formatTime = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.floor((hours % 1) * 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };
  
  return (
    <div style={{
      position: 'absolute',
      top: 16,
      right: 16,
      background: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(10px)',
      padding: '10px 14px',
      borderRadius: 10,
      color: '#fff',
      fontSize: 13,
      fontFamily: 'system-ui, -apple-system, sans-serif',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      zIndex: 100,
      minWidth: 140
    }}>
      {/* Header row */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 8,
          cursor: 'pointer'
        }}
        onClick={() => setShowSlider(!showSlider)}
      >
        <span style={{ fontSize: 18 }}>{icon}</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
          <span style={{ fontWeight: 600, letterSpacing: '0.5px' }}>
            {formatTime(displayHour)}
            {overrideHour !== null && <span style={{ opacity: 0.5, marginLeft: 4 }}>⏸</span>}
          </span>
          <span style={{ fontSize: 10, opacity: 0.7, textTransform: 'uppercase' }}>
            Dynamic Sky {showSlider ? '▲' : '▼'}
          </span>
        </div>
      </div>
      
      {/* Slider (expandable) */}
      {showSlider && (
        <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <input
            type="range"
            min="0"
            max="24"
            step="0.1"
            value={overrideHour !== null ? overrideHour : displayHour}
            onChange={(e) => setOverrideHour(parseFloat(e.target.value))}
            style={{
              width: '100%',
              height: 4,
              borderRadius: 2,
              appearance: 'none',
              background: 'linear-gradient(to right, #1a2a4a 0%, #7dd3fc 25%, #fcd34d 50%, #f97316 75%, #1a2a4a 100%)',
              cursor: 'pointer'
            }}
          />
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            fontSize: 9, 
            opacity: 0.5, 
            marginTop: 4 
          }}>
            <span>00:00</span>
            <span>12:00</span>
            <span>24:00</span>
          </div>
          {overrideHour !== null && (
            <button
              onClick={() => setOverrideHour(null)}
              style={{
                marginTop: 8,
                width: '100%',
                padding: '6px 10px',
                fontSize: 11,
                background: 'rgba(125, 211, 252, 0.2)',
                border: '1px solid rgba(125, 211, 252, 0.3)',
                borderRadius: 6,
                color: '#7dd3fc',
                cursor: 'pointer'
              }}
            >
              ↻ Reset to Real Time
            </button>
          )}
        </div>
      )}
    </div>
  );
}

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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('3d');
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
    'developer': { one: '#7dd3fc', two: '#c4b5fd', three: '#4ade80', bg: '#0f172a' },
    'entrepreneur': { one: '#0066cc', two: '#f39c12', three: '#e74c3c', bg: '#1a2530' },
    'video-creator': { one: '#ff4500', two: '#1e90ff', three: '#ffd700', bg: '#84a0ba' },
  } as const;

  const getCurrentTheme = () => {
    return themeColors[persona as keyof typeof themeColors];
  };

  // Sidebar width for content offset - dynamic based on collapsed state
  const sidebarWidth = sidebarCollapsed ? 60 : 240;

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
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Main Content Area - both views rendered, visibility toggled to prevent reload */}
      
      {/* 2D Page */}
      <div style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw', 
        height: '100vh',
        visibility: viewMode === '2d' ? 'visible' : 'hidden',
        zIndex: viewMode === '2d' ? 1 : 0,
        overflow: 'auto',
        backgroundColor: '#0a0a0a'
      }}>
        <Page2D />
      </div>

      {/* 3D Scene - always rendered to prevent reload */}
      <div style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw', 
        height: '100vh',
        visibility: viewMode === '3d' ? 'visible' : 'hidden',
        zIndex: viewMode === '3d' ? 1 : 0
      }}>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Canvas
            camera={{ position: [0, 4, 8], fov: 90 }}
            dpr={[1, 1.5]}
            performance={{ min: 0.5 }}
            gl={{ 
              antialias: false,
              alpha: false,
              powerPreference: "high-performance",
              toneMapping: THREE.ACESFilmicToneMapping,  // FIX 5: Better contrast
              toneMappingExposure: 0.5
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
          <Loader />
          
          {/* Dynamic Time Indicator - hidden when FORCE_SUNSET is enabled */}
          {!FORCE_SUNSET && <DynamicTimeIndicator />}
        </ErrorBoundary>
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
