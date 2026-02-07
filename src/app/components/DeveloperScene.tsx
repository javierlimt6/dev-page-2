/*
 * Immersive Developer Tech Scene for Computer Science Section
 * 
 * Features:
 * - Giant laptop environment with keyboard as floor and screen as background
 * - Futuristic developer workspace with monitors, keyboards, and laptops
 * - Floating code snippets and particles and tech elements
 * - Interactive 3D objects for each section
 * - Dynamic time-based sky with sunset override
 * 
 * Attribution:
 * - "Little Private Beach" by Carson Lam [CC-BY] via Poly Pizza
 * - "Keyboard" by Poly by Google [CC-BY] via Poly Pizza
 */

import { useState, useEffect } from 'react';
import { Text } from '@react-three/drei';
import InteractiveObject from './InteractiveObject';
import { Project } from '../../types';

// Re-export for backwards compatibility
export { FORCE_SUNSET } from './scene/config';

// Scene modules
import { DynamicSky, Beach } from './scene/DynamicSky';
import { LaptopEnvironment } from './scene/LaptopEnvironment';
import { Sphere } from './scene/Primitives';
import { FloatingCode, DataNodes } from './scene/FloatingElements';
import { CircuitPatterns } from './scene/CircuitPatterns';
import { TechParticles } from './scene/TechParticles';
import { TechWorkspace } from './scene/TechWorkspace';
import { DevToolIcons } from './scene/DevToolIcons';
import { NetworkGrid } from './scene/NetworkGrid';
import { CodeParticles } from './scene/CodeParticles';
import { AIElements } from './scene/AIElements';

interface DeveloperSceneProps {
  onProjectActivate: (project: Project) => void;
  themeColors: { [key: string]: string };
}

export default function DeveloperScene({ onProjectActivate, themeColors }: DeveloperSceneProps) {
  const [showSphere, setShowSphere] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSphere(true), 3000);
    
    // Detect mobile devices for performance optimization
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <>
      {/* Immersive Tech Background */}
      <DynamicSky />
      <Beach />
      <LaptopEnvironment />
      
      {/* Enhanced Developer Lighting with screen glow */}
      <ambientLight intensity={0.15} color="#0f172a" />
      <directionalLight position={[8, 8, 5]} intensity={0.7} color="#ffffff" />
      <pointLight position={[-6, 4, -3]} intensity={0.5} color="#7dd3fc" />
      <pointLight position={[6, 3, 4]} intensity={0.4} color="#c4b5fd" />
      <pointLight position={[0, 5, 0]} intensity={0.3} color="#4ade80" />
      {/* Screen glow lighting from laptop display */}
      <pointLight position={[0, 4, -7]} intensity={0.6} color="#7dd3fc" />
      <hemisphereLight args={["#7dd3fc", "#0f172a", 0.2]} />
      
      {/* Developer Workspace Elements */}
      {/* <TechWorkspace />
      <DevToolIcons /> */}
      {/* <NetworkGrid /> */}
      {/* <AIElements /> */}
      
      {/* Enhanced Animated Background Elements */}
      {/* <FloatingCode />
      <CodeParticles /> */}
      {/* {!isMobile && <DataNodes />} */}
      {/* {!isMobile && <CircuitPatterns />} */}
      {/* <TechParticles /> */}
      
      {/* Scene Title */}
      <Text position={[0, 4, 0]} fontSize={0.6} color="#7dd3fc" fontWeight="bold">
        Javier Lim
      </Text>
      <Text position={[0, 3.5, 0]} fontSize={0.3} color="#c4b5fd">
        building!
      </Text>
      
      {/* Core Tech Objects */}
      <InteractiveObject
        position={[0, 1.5, 0]}
        scale={1}
        hideTitle
        noSpin
        project={{
          id: "dev-about-me",
          title: "About Javier",
          description: "Full-stack developer passionate about creating innovative solutions with modern technologies.",
          imageUrl: "/man.glb",
          geometryType: "sphere",
          componentType: "about" // This will render the About component in the modal
        }}
        onProjectActivate={onProjectActivate}
        themeColors={themeColors}
      />
      {showSphere && <Sphere />}
      
      {/* Interactive Developer Project Objects - Updated with page components */}
      <InteractiveObject
        position={[3, 0, 4]}
        scale={0.17}
        project={{
          id: "dev-project-1",
          title: "Experience",
          description: "Explore my professional experience and technical background.",
          imageUrl: "/briefcase.glb",
          geometryType: "icosahedron",
          componentType: "experience" // This will render the Experience component
        }}
        onProjectActivate={onProjectActivate}
        themeColors={themeColors}
      />
      <InteractiveObject
        position={[-3, 1, 4]}
        scale={0.1}
        project={{
          id: "dev-project-2",
          title: "Projects",
          description: "Discover the innovative projects I've built and contributed to.",
          imageUrl: "/wrench.glb",
          geometryType: "torusKnot",
          componentType: "projects" // This will render the Projects component
        }}
        onProjectActivate={onProjectActivate}
        themeColors={themeColors}
      />
      {/* <InteractiveObject
        position={[-3, 1, 0]}
        scale={1.5}
        project={{
          id: "dev-project-3",
          title: "Leadership & Activities",
          description: "Learn about my leadership roles and community involvement.",
          imageUrl: "/file.svg",
          geometryType: "dodecahedron",
          componentType: "leadership" // This will render the Leadership component
        }}
        onProjectActivate={onProjectActivate}
        themeColors={themeColors}
      /> */}
      <InteractiveObject
        position={[-3, 4, 1]}
        scale={1.5}
        project={{
          id: "dev-project-3",
          title: "Activites",
          description: "Check out my achievements and accolades.",
          imageUrl: "/vercel.svg",
          geometryType: "tetrahedron",
          componentType: "awards" // This will render the Awards component
        }}
        onProjectActivate={onProjectActivate}
        themeColors={themeColors}
      />
      <InteractiveObject
        position={[3.5, 3, 1]}
        scale={0.008}
        project={{
          id: "dev-project-4",
          title: "Education",
          description: "Understand my current education and interests in Computer Science.",
          imageUrl: "/education.glb",
          geometryType: "octahedron",
          componentType: "education" // This will render the Life component
        }}
        onProjectActivate={onProjectActivate}
        themeColors={themeColors}
      />
      
      {/* 3D Man Model Component for Developer Scene */}
    </>
  );
}
