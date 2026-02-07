/*
 * Immersive Developer Tech Scene for Computer Science Section
 * 
 * Features:
 * - Giant laptop environment with keyboard as floor and screen as background
 * - Futuristic developer workspace with monitors, keyboards, and laptops
 * - Floating code blocks with syntax highlighting and algorithm visualizations
 * - Programming language symbols and dev tool icons
 * - Animated data streams and network grids
 * - Neural network and AI symbols
 * - Professional lighting with navy, blue, purple, and neon green accents
 * - Mobile-optimized performance with adaptive detail levels
 * - Modern color palette: #0f172a, #7dd3fc, #c4b5fd, #4ade80
 * - Responsive laptop scaling for desktop and mobile viewports
 */

import { Text, Sky, Stars, useGLTF } from '@react-three/drei';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { Mesh, Group, VideoTexture, TextureLoader, Vector3, MathUtils, Color } from 'three';
import InteractiveObject from './InteractiveObject';

// Dynamic time-based sky component
// CONFIG: Set to true to force permanent sunset state
export const FORCE_SUNSET = true;

function DynamicSky() {
  const { scene } = useThree();
  
  const [sunPosition, setSunPosition] = useState<[number, number, number]>([0, 1, 0]);
  const [overrideHour, setOverrideHour] = useState<number | null>(null);
  const [skyParams, setSkyParams] = useState({
    rayleigh: 5,
    turbidity: 4,
    mieCoefficient: 0.0005,
    isNight: false,
    lightColor: "#ffffffff"
  });
  
  // Listen for time override events from the UI
  useEffect(() => {
    const handleTimeOverride = (e: CustomEvent) => {
      setOverrideHour(e.detail.hour);
    };
    
    window.addEventListener('timeOverride', handleTimeOverride as EventListener);
    return () => window.removeEventListener('timeOverride', handleTimeOverride as EventListener);
  }, []);
  
  // Update sky based on time (real or override)
  useEffect(() => {
    const updateSkyForTime = (hours: number) => {
      // Force sunset mode if config is enabled
      if (FORCE_SUNSET) {
        hours = 18; // 7pm - peak sunset
      }
      
      const timeOfDay = hours / 24;
      const sunAngle = (timeOfDay - 0.25) * Math.PI * 2;
      // Clamp elevation for flatter intensity curve
      let elevation = Math.max(-20, Math.min(60, Math.sin(sunAngle) * 90));
      
      const isNightTime = elevation < -5;
      if (isNightTime) {
        elevation = -90;
      }
      
      const azimuth = (timeOfDay * 360 - 90) % 360;
      const normalizedElevation = Math.max(0, elevation) / 90;
      
      let rayleigh: number;
      let turbidity: number;
      let mieCoefficient: number;
      let lightColor: string;
      
      // Use hours directly for stretched transitions
      const isMorningTransition = hours >= 6 && hours < 12;     // 6am - 12pm
      const isEveningTransition = hours >= 12 && hours < 20;    // 12pm - 8pm
      
      if (isNightTime) {
        // Night
        rayleigh = 0.01;
        turbidity = 0.01;
        mieCoefficient = 0.0001;
        lightColor = "#3a5a7a"; // Cool moonlight
        
      } else if (isMorningTransition) {
        // STRETCHED SUNRISE: 6am - 12pm (6 hour transition)
        // Slowed 3x: what was at 8am now appears at 12pm
        const morningProgress = (hours - 6) / 6; // 0 at 6am, 1 at 12pm
        
        rayleigh = 0.5 + morningProgress * 2.7;    // 0.5 → 3.2
        turbidity = 15 - morningProgress * 4.8;    // 15 → 10.2
        mieCoefficient = 0.02 - morningProgress * 0.006;
        
        // Warm golden → light yellow over the morning
        const warmOrange = new Color(0xffaa60);
        const lightYellow = new Color(0xffd080);
        lightColor = '#' + warmOrange.clone().lerp(lightYellow, morningProgress).getHexString();
        
      } else if (isEveningTransition) {
        // STRETCHED EVENING: 12pm - 8pm (8 hour transition)
        const eveningProgress = (hours - 12) / 8; // 0 at 12pm, 1 at 8pm
        
        // Start where morning ends (3.2, 10.2) → sunset (0.5, 15)
        rayleigh = 3.2 - eveningProgress * 2.7;    // 3.2 → 0.5
        turbidity = 10.2 + eveningProgress * 4.8;  // 10.2 → 15
        mieCoefficient = 0.014 + eveningProgress * 0.006;
        
        // Light yellow → warm golden as sun sets
        const lightYellow = new Color(0xffd080);
        const warmOrange = new Color(0xffaa60);
        lightColor = '#' + lightYellow.clone().lerp(warmOrange, eveningProgress).getHexString();
      } else {
        // Fallback (shouldn't hit but needed for type safety)
        rayleigh = 0.5;
        turbidity = 15;
        mieCoefficient = 0.02;
        lightColor = "#ffaa60";
      }
      
      const phi = MathUtils.degToRad(90 - elevation);
      const theta = MathUtils.degToRad(azimuth);
      
      const sunVec = new Vector3();
      sunVec.setFromSphericalCoords(1, phi, theta);
      
      if (isNightTime) {
        scene.background = new Color(0x01121c);
      } else {
        scene.background = null;
      }
      
      setSunPosition([sunVec.x, sunVec.y, sunVec.z]);
      setSkyParams({ 
        rayleigh, 
        turbidity, 
        mieCoefficient, 
        isNight: isNightTime,
        lightColor
      });
    };
    
    // Use override or real time
    if (overrideHour !== null) {
      updateSkyForTime(overrideHour);
    } else {
      const now = new Date();
      const hours = now.getHours() + now.getMinutes() / 60;
      updateSkyForTime(hours);
    }
    
    // Only set interval if not overriding
    if (overrideHour === null) {
      const interval = setInterval(() => {
        const now = new Date();
        const hours = now.getHours() + now.getMinutes() / 60;
        updateSkyForTime(hours);
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [scene, overrideHour]);
  
  return (
    <>
      {!skyParams.isNight && (
        <Sky
          distance={450000}
          sunPosition={sunPosition}
          mieCoefficient={skyParams.mieCoefficient}
          mieDirectionalG={0.7}
          rayleigh={skyParams.rayleigh}
          turbidity={skyParams.turbidity}
        />
      )}
      
      {skyParams.isNight && (
        <Stars
          radius={300}
          depth={50}
          count={5000}
          factor={3}
          saturation={0}
          fade
          speed={1}
        />
      )}
      
      {/* Dynamic light color based on time */}
      <directionalLight
        position={sunPosition}
        intensity={
          skyParams.isNight 
            ? 0.15
            : 0.3 + Math.max(0, sunPosition[1]) * 0.6
        }
        color={skyParams.lightColor}
        castShadow
      />
      
      <ambientLight 
        intensity={skyParams.isNight ? 0.15 : 0.4}
        color={skyParams.isNight ? "#0a0a20" : "#e8f0ff"}
      />
    </>
  );
}

// Beach environment model
// Attribution (CC-BY License - required):
// "Little Private Beach" by Carson Lam [CC-BY] (https://creativecommons.org/licenses/by/3.0/)
// via Poly Pizza (https://poly.pizza/m/2AeF-fuFHNu)
function Beach() {
  const { scene } = useGLTF('/beach.glb');
  
  return (
    <primitive 
      object={scene} 
      position={[-20, 8, 15]}  // Behind and below laptop
      scale={250}                // Adjust size as needed
      rotation={[0, -Math.PI / 2, 0]}
    />
  );
}

// Keep the old SkyboxSphere as a fallback option
function SkyboxSphere() {
  const skyTexture = useLoader(TextureLoader, '/panoramic-tech.png');
  
  return (
    <mesh>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial 
        map={skyTexture} 
        side={2}
      />
    </mesh>
  );
}

// Giant Laptop Environment - keyboard as floor, screen as background
function LaptopEnvironment() {
  const keyboardRef = useRef<Mesh>(null!);
  const screenRef = useRef<Mesh>(null!);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Create a looping HTML5 video element + three.js VideoTexture
  const videoTexture = useMemo(() => {
    const vid = document.createElement('video');
    vid.src = '/laptop.mp4';    // put your file in public/
    vid.loop = true;
    vid.muted = true;
    vid.playsInline = true;
    vid.autoplay = true;
    vid.play();
    return new VideoTexture(vid);
  }, []);

  // Scale laptop based on screen size
  const laptopScale = isMobile ? 0.7 : 1.0;
  const keyboardWidth = isMobile ? 12 : 18;
  const keyboardHeight = isMobile ? 8 : 12;
  const screenWidth = isMobile ? 10 : 16;
  const screenHeight = isMobile ? 6 : 10;
  
  return (
    <group scale={laptopScale}>
      {/* Laptop Keyboard as Floor */}
      <mesh 
        ref={keyboardRef}
        position={[0, -0.2, 0]} 
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
        castShadow
      >
        <planeGeometry args={[keyboardWidth, keyboardHeight]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          emissive="#0f172a"
          emissiveIntensity={0.1}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
      
      {/* Laptop Screen as Background */}
      <mesh 
        ref={screenRef}
        position={[0, 5, -6]} 
        scale={[screenWidth, screenHeight, 1]}
        receiveShadow
        castShadow
      >
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial
          map={videoTexture}
          toneMapped={false}
          transparent={true}
        />
      </mesh>
      
      {/* Laptop Screen Bezel */}
      <mesh position={[0, 5, -6.1]} scale={[screenWidth * 1.1, screenHeight * 1.1, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial 
          color="#2c3e50" 
          emissive="#0f172a"
          emissiveIntensity={0.02}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      
      {/* Keyboard Keys */}
      <KeyboardKeys isMobile={isMobile} />
      
      {/* Laptop Base/Hinge - commented out */}
      {/* <mesh position={[0, 0, -4]} rotation={[-Math.PI / 8, 0, 0]}>
        <boxGeometry args={[keyboardWidth * 0.9, 0.3, 1]} />
        <meshStandardMaterial 
          color="#2c3e50" 
          emissive="#0f172a"
          emissiveIntensity={0.05}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh> */}
    </group>
  );
}

// Keyboard model loaded from GLB
// Attribution (CC-BY License - required):
// "Keyboard" by Poly by Google [CC-BY] (https://creativecommons.org/licenses/by/3.0/)
// via Poly Pizza (https://poly.pizza/m/3oFfQCSsUmQ)
function KeyboardKeys({ isMobile }: { isMobile: boolean }) {
  const { scene } = useGLTF('/keyboard.glb');
  
  // Scale down for mobile
  const baseScale = 0.04
  
  return (
    <primitive 
      object={scene} 
      position={[0, -0.2, -0.7]}
      scale={[baseScale, baseScale, baseScale]}  // Adjust scale as needed
      rotation={[0, 0, 0]}
    />
  );
}

function KeyboardKey({ position, scale, delay }: {
  position: [number, number, number];
  scale: [number, number, number];
  delay: number;
}) {
  const keyRef = useRef<Mesh>(null!);
  
  useFrame(({ clock }) => {
    if (keyRef.current) {
      const time = clock.getElapsedTime() + delay;
      // Subtle key glow animation
      const intensity = 0.1 + Math.sin(time * 0.5) * 0.05;
      if (keyRef.current.material) {
        (keyRef.current.material as any).emissiveIntensity = intensity;
      }
    }
  });
  
  return (
    <mesh ref={keyRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#7dd3fc"
        emissive="#7dd3fc"
        emissiveIntensity={0.1}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

// Floating code snippets
// Update the FloatingCode function with your actual tech stack
function FloatingCode() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const codeSnippets = [
    "import pandas as pd",
    "const app = Next.js",
    "swift let view = SwiftUI",
    "SELECT * FROM users",
    "docker build -t app .",
    "import matplotlib.pyplot",
    "React.useEffect(() => {",
    "from flask import Flask",
    "git commit -m 'feat:'",
    "await fastapi.get()",
    "import numpy as np",
    "<?php $laravel = new",
    "MongoDB.find({})",
    "import three.js",
    "pygame.init()",
    "php artisan serve"
  ];
  
  const displayedSnippets = isMobile ? codeSnippets.slice(0, 8) : codeSnippets;
  
  return (
    <>
      {displayedSnippets.map((code, i) => (
        <FloatingText
          key={i}
          text={code}
          position={[
            (Math.random() - 0.5) * 12,
            Math.random() * 4 + 1,
            (Math.random() - 0.5) * 8
          ]}
          delay={i * 0.5}
        />
      ))}
    </>
  );
}

function FloatingText({ text, position, delay }: { text: string; position: [number, number, number]; delay: number }) {
  const textRef = useRef<any>(null!);
  
  useFrame(({ clock }) => {
    if (textRef.current) {
      const time = clock.getElapsedTime() + delay;
      textRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.3;
      textRef.current.rotation.y = Math.sin(time * 0.3) * 0.2;
      
      // Fade in/out effect
      const opacity = 0.3 + Math.sin(time * 0.8) * 0.2;
      if (textRef.current.material) {
        textRef.current.material.opacity = opacity;
      }
    }
  });
  
  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={0.15}
      color="#67e8f9"
      anchorX="center"
      anchorY="middle"
      material-transparent
      material-opacity={0.5}
    >
      {text}
    </Text>
  );
}

// Geometric data nodes
function DataNodes() {
  const nodeCount = 8;
  
  return (
    <>
      {Array.from({ length: nodeCount }, (_, i) => (
        <DataNode
          key={i}
          position={[
            (Math.random() - 0.5) * 10,
            Math.random() * 3 + 0.5,
            (Math.random() - 0.5) * 6
          ]}
          delay={i * 0.3}
        />
      ))}
    </>
  );
}

function DataNode({ position, delay }: { position: [number, number, number]; delay: number }) {
  const meshRef = useRef<Mesh>(null!);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime() + delay;
      meshRef.current.rotation.x = time * 0.3;
      meshRef.current.rotation.y = time * 0.4;
      meshRef.current.position.y = position[1] + Math.sin(time * 0.6) * 0.2;
      
      // Pulsing scale
      const scale = 0.8 + Math.sin(time * 1.5) * 0.2;
      meshRef.current.scale.setScalar(scale);
    }
  });
  
  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.3, 0]} />
      <meshStandardMaterial
        color="#f0abfc"
        emissive="#3b1f47"
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

// Circuit board patterns
function CircuitPatterns() {
  return (
    <>
      {Array.from({ length: 5 }, (_, i) => (
        <CircuitLine
          key={i}
          start={[(Math.random() - 0.5) * 8, 0.1, (Math.random() - 0.5) * 8]}
          end={[(Math.random() - 0.5) * 8, 0.1, (Math.random() - 0.5) * 8]}
          delay={i * 0.4}
        />
      ))}
    </>
  );
}

function CircuitLine({ start, end, delay }: { 
  start: [number, number, number]; 
  end: [number, number, number]; 
  delay: number 
}) {
  const lineRef = useRef<Mesh>(null!);
  
  useFrame(({ clock }) => {
    if (lineRef.current) {
      const time = clock.getElapsedTime() + delay;
      // Glowing effect
      const intensity = 0.5 + Math.sin(time * 2.0) * 0.3;
      if (lineRef.current.material) {
        (lineRef.current.material as any).emissiveIntensity = intensity;
      }
    }
  });
  
  const distance = Math.sqrt(
    Math.pow(end[0] - start[0], 2) + 
    Math.pow(end[1] - start[1], 2) + 
    Math.pow(end[2] - start[2], 2)
  );
  
  const midpoint: [number, number, number] = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
    (start[2] + end[2]) / 2
  ];
  
  return (
    <mesh ref={lineRef} position={midpoint}>
      <cylinderGeometry args={[0.02, 0.02, distance]} />
      <meshStandardMaterial
        color="#67e8f9"
        emissive="#1e3a3a"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

// Floating particles for atmosphere
function TechParticles() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const particleCount = isMobile ? 8 : 20;
  
  return (
    <>
      {Array.from({ length: particleCount }, (_, i) => (
        <TechParticle
          key={i}
          position={[
            (Math.random() - 0.5) * 15,
            Math.random() * 5,
            (Math.random() - 0.5) * 10
          ]}
          delay={i * 0.2}
        />
      ))}
    </>
  );
}

function TechParticle({ position, delay }: { position: [number, number, number]; delay: number }) {
  const meshRef = useRef<Mesh>(null!);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime() + delay;
      meshRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.5;
      meshRef.current.position.x = position[0] + Math.cos(time * 0.3) * 0.2;
      
      // Twinkling effect
      const opacity = 0.3 + Math.sin(time * 3.0) * 0.3;
      if (meshRef.current.material) {
        (meshRef.current.material as any).opacity = Math.max(0.1, opacity);
      }
    }
  });
  
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial
        color="#ffffff"
        emissive="#3b82f6"
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function Cube() {
    const meshRef = useRef<Mesh>(null!);
    useFrame(({ clock }) => {
        if(meshRef.current) {
            meshRef.current.rotation.x = Math.sin(clock.getElapsedTime()) * 0.5;
            meshRef.current.rotation.y = Math.cos(clock.getElapsedTime()) * 0.5;
            meshRef.current.position.y = 1 + Math.sin(clock.getElapsedTime()) * 0.2;
        }
    });
    return (
        <mesh ref={meshRef} position={[0, 1, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial 
              color="#f0abfc" 
              emissive="#3b1f47"
              roughness={0.3}
              metalness={0.7}
            />
        </mesh>
    );
}

function Sphere() {
    const meshRef = useRef<Mesh>(null!);
    useFrame(({ clock }) => {
        if(meshRef.current) {
            meshRef.current.scale.x = 0.5 + Math.sin(clock.getElapsedTime()) * 0.2;
            meshRef.current.scale.y = 0.5 + Math.sin(clock.getElapsedTime()) * 0.2;
            meshRef.current.scale.z = 0.5 + Math.sin(clock.getElapsedTime()) * 0.2;
        }
    });
    return (
        <mesh ref={meshRef} position={[-2, 1, -2]}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial 
              color="#67e8f9" 
              emissive="#1e3a3a"
              roughness={0.2}
              metalness={0.8}
            />
        </mesh>
    );
}

import { InteractiveObjectProps, Project } from '../../types';

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
        scale={1.5}
        project={{
          id: "dev-project-2",
          title: "Projects",
          description: "Discover the innovative projects I've built and contributed to.",
          imageUrl: "/globe.svg",
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

// Developer Workspace with Monitors and Keyboards
function TechWorkspace() {
  return (
    <>
      <DeveloperDesk position={[4, 0, -2]} rotation={[0, -0.3, 0]} />
      <DeveloperDesk position={[-4, 0, -1]} rotation={[0, 0.4, 0]} />
      <DeveloperDesk position={[0, 0, -4]} rotation={[0, 0, 0]} />
    </>
  );
}

function DeveloperDesk({ position, rotation }: {
  position: [number, number, number];
  rotation: [number, number, number];
}) {
  const deskRef = useRef<Group>(null!);
  const monitorsRef = useRef<Mesh[]>([]);
  
  useFrame(({ clock }) => {
    // Subtle desk movement
    if (deskRef.current) {
      deskRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.3) * 0.02;
    }
    
    // Monitor screen glow animation
    monitorsRef.current.forEach((monitor, i) => {
      if (monitor && monitor.material) {
        const time = clock.getElapsedTime() + i * 0.5;
        const intensity = 0.4 + Math.sin(time * 0.8) * 0.2;
        (monitor.material as any).emissiveIntensity = intensity;
      }
    });
  });
  
  return (
    <group ref={deskRef} position={position} rotation={rotation} scale={0.6}>
      {/* Desk surface */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[2, 0.1, 1.2]} />
        <meshStandardMaterial color="#2c3e50" roughness={0.1} metalness={0.8} />
      </mesh>
      
      {/* Main monitor */}
      <mesh position={[0, 0.6, -0.4]}>
        <boxGeometry args={[0.8, 0.5, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      {/* Monitor screen */}
      <mesh
        ref={(el) => { if (el) monitorsRef.current[0] = el; }}
        position={[0, 0.6, -0.37]}
      >
        <planeGeometry args={[0.7, 0.4]} />
        <meshStandardMaterial
          color="#7dd3fc"
          emissive="#7dd3fc"
          emissiveIntensity={0.4}
        />
      </mesh>
      
      {/* Secondary monitor */}
      <mesh position={[0.6, 0.5, -0.3]} rotation={[0, -0.3, 0]}>
        <boxGeometry args={[0.6, 0.4, 0.03]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      {/* Secondary screen */}
      <mesh
        ref={(el) => { if (el) monitorsRef.current[1] = el; }}
        position={[0.6, 0.5, -0.28]}
        rotation={[0, -0.3, 0]}
      >
        <planeGeometry args={[0.5, 0.3]} />
        <meshStandardMaterial
          color="#c4b5fd"
          emissive="#c4b5fd"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Mechanical keyboard */}
      <mesh position={[0, 0.12, 0.3]}>
        <boxGeometry args={[0.6, 0.03, 0.2]} />
        <meshStandardMaterial color="#2c3e50" roughness={0.2} metalness={0.9} />
      </mesh>
      
      {/* Keyboard keys */}
      {Array.from({ length: 20 }, (_, i) => {
        const row = Math.floor(i / 5);
        const col = i % 5;
        return (
          <mesh
            key={i}
            position={[
              -0.2 + col * 0.1,
              0.135,
              0.25 + row * 0.05
            ]}
          >
            <boxGeometry args={[0.08, 0.01, 0.04]} />
            <meshStandardMaterial
              color="#4ade80"
              emissive="#4ade80"
              emissiveIntensity={0.2}
            />
          </mesh>
        );
      })}
      
      {/* Mouse */}
      <mesh position={[0.4, 0.13, 0.4]}>
        <boxGeometry args={[0.08, 0.02, 0.12]} />
        <meshStandardMaterial color="#7dd3fc" emissive="#7dd3fc" emissiveIntensity={0.2} />
      </mesh>
      
      {/* Coffee cup */}
      <mesh position={[-0.6, 0.15, 0.2]}>
        <cylinderGeometry args={[0.04, 0.03, 0.08, 16]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </group>
  );
}

// Programming Language and Tool Icons
// Update the DevToolIcons function with your actual tools
function DevToolIcons() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const iconCount = isMobile ? 8 : 16;
  const tools = [
    // Languages
    { name: "Python", color: "#3776ab" },
    { name: "TypeScript", color: "#3178c6" },
    { name: "Java", color: "#f89820" },
    { name: "Swift", color: "#fa7343" },
    { name: "C++", color: "#00599c" },
    { name: "PHP", color: "#777bb4" },
    { name: "SQL", color: "#336791" },
    { name: "HTML", color: "#e34f26" },
    { name: "CSS", color: "#1572b6" },
    // Frameworks
    { name: "React", color: "#61dafb" },
    { name: "Next.js", color: "#000000" },
    { name: "Laravel", color: "#ff2d20" },
    { name: "Flask", color: "#000000" },
    { name: "Django", color: "#092e20" },
    { name: "FastAPI", color: "#009688" },
    { name: "Vite", color: "#646cff" },
    // DevOps & Databases
    { name: "MySQL", color: "#4479a1" },
    { name: "MongoDB", color: "#47a248" },
    { name: "PostgreSQL", color: "#336791" },
    { name: "Supabase", color: "#3ecf8e" },
    { name: "Docker", color: "#2496ed" },
    { name: "AWS", color: "#ff9900" },
    { name: "GCP", color: "#4285f4" },
    { name: "Git", color: "#f05032" },
    // Libraries
    { name: "NumPy", color: "#013243" },
    { name: "pandas", color: "#150458" },
    { name: "Three.js", color: "#000000" },
    { name: "SwiftUI", color: "#007aff" },
    { name: "Pygame", color: "#3776ab" }
  ];
  
  return (
    <>
      {tools.slice(0, iconCount).map((tool, i) => (
        <DevToolIcon
          key={i}
          position={[
            (Math.random() - 0.5) * 8,
            Math.random() * 2 + 0.5,
            (Math.random() - 0.5) * 5
          ]}
          tool={tool}
          delay={i * 0.4}
        />
      ))}
    </>
  );
}

function DevToolIcon({ position, tool, delay }: {
  position: [number, number, number];
  tool: { name: string; color: string };
  delay: number;
}) {
  const iconRef = useRef<Group>(null!);
  
  useFrame(({ clock }) => {
    if (iconRef.current) {
      const time = clock.getElapsedTime() + delay;
      iconRef.current.position.y = position[1] + Math.sin(time * 0.6) * 0.3;
      iconRef.current.rotation.y = Math.sin(time * 0.4) * 0.3;
      iconRef.current.rotation.z = Math.cos(time * 0.3) * 0.1;
      
      // Pulsing scale
      const scale = 0.8 + Math.sin(time * 1.2) * 0.2;
      iconRef.current.scale.setScalar(scale);
    }
  });
  
  return (
    <group ref={iconRef} position={position}>
      {/* Icon background */}
      <mesh>
        <boxGeometry args={[0.3, 0.3, 0.05]} />
        <meshStandardMaterial
          color={tool.color}
          emissive={tool.color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Tool name text */}
      <Text
        position={[0, 0, 0.03]}
        fontSize={0.08}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {tool.name}
      </Text>
    </group>
  );
}

// Network Grid Visualization
function NetworkGrid() {
  return (
    <>
      {Array.from({ length: 8 }, (_, i) => (
        <NetworkNode
          key={i}
          position={[
            (Math.random() - 0.5) * 12,
            Math.random() * 3 + 0.5,
            (Math.random() - 0.5) * 8
          ]}
          delay={i * 0.3}
        />
      ))}
      
      {Array.from({ length: 6 }, (_, i) => (
        <DataStream
          key={i}
          start={[(Math.random() - 0.5) * 8, Math.random() + 0.5, (Math.random() - 0.5) * 6]}
          end={[(Math.random() - 0.5) * 8, Math.random() + 0.5, (Math.random() - 0.5) * 6]}
          delay={i * 0.5}
        />
      ))}
    </>
  );
}

function NetworkNode({ position, delay }: {
  position: [number, number, number];
  delay: number;
}) {
  const nodeRef = useRef<Mesh>(null!);
  
  useFrame(({ clock }) => {
    if (nodeRef.current) {
      const time = clock.getElapsedTime() + delay;
      nodeRef.current.rotation.x = time * 0.4;
      nodeRef.current.rotation.y = time * 0.3;
      
      // Pulsing glow
      const intensity = 0.3 + Math.sin(time * 2.0) * 0.2;
      if (nodeRef.current.material) {
        (nodeRef.current.material as any).emissiveIntensity = intensity;
      }
    }
  });
  
  return (
    <mesh ref={nodeRef} position={position}>
      <icosahedronGeometry args={[0.1, 0]} />
      <meshStandardMaterial
        color="#4ade80"
        emissive="#4ade80"
        emissiveIntensity={0.3}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

function DataStream({ start, end, delay }: {
  start: [number, number, number];
  end: [number, number, number];
  delay: number;
}) {
  const streamRef = useRef<Mesh>(null!);
  
  useFrame(({ clock }) => {
    if (streamRef.current) {
      const time = clock.getElapsedTime() + delay;
      // Flowing data effect
      const intensity = 0.2 + Math.sin(time * 3.0) * 0.3;
      if (streamRef.current.material) {
        (streamRef.current.material as any).emissiveIntensity = intensity;
      }
    }
  });
  
  const distance = Math.sqrt(
    Math.pow(end[0] - start[0], 2) + 
    Math.pow(end[1] - start[1], 2) + 
    Math.pow(end[2] - start[2], 2)
  );
  
  const midpoint: [number, number, number] = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
    (start[2] + end[2]) / 2
  ];
  
  return (
    <mesh ref={streamRef} position={midpoint}>
      <cylinderGeometry args={[0.008, 0.008, distance]} />
      <meshStandardMaterial
        color="#7dd3fc"
        emissive="#7dd3fc"
        emissiveIntensity={0.2}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
}

// Enhanced Code Particles
// Update the CodeParticles function with your actual syntax
function CodeParticles() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const particleCount = isMobile ? 12 : 24;
  const symbols = [
    // Programming symbols
    "{ }", "[ ]", "< >", "( )", 
    "=>", "&&", "||", "++", "--", "===",
    // Your stack specific symbols
    "import", "from", "const", "let", "var",
    "def", "class", "function", "SELECT", "INSERT",
    "<?php", "?>", "npm", "pip", "docker",
    "git", "AWS", "GCP", "SQL", "HTML", "useEffect", "env"
  ];
  
  return (
    <>
      {Array.from({ length: particleCount }, (_, i) => (
        <CodeParticle
          key={i}
          position={[
            (Math.random() - 0.5) * 14,
            Math.random() * 4 + 0.5,
            (Math.random() - 0.5) * 9
          ]}
          symbol={symbols[i % symbols.length]}
          delay={i * 0.3}
        />
      ))}
    </>
  );
}

function CodeParticle({ position, symbol, delay }: {
  position: [number, number, number];
  symbol: string;
  delay: number;
}) {
  const particleRef = useRef<any>(null!);
  
  useFrame(({ clock }) => {
    if (particleRef.current) {
      const time = clock.getElapsedTime() + delay;
      particleRef.current.position.y = position[1] + Math.sin(time * 0.7) * 0.4;
      particleRef.current.position.x = position[0] + Math.cos(time * 0.2) * 0.3;
      particleRef.current.rotation.z = Math.sin(time * 0.5) * 0.3;
    }
  });
  
  return (
    <Text
      ref={particleRef}
      position={position}
      fontSize={0.12}
      color="#4ade80"
      anchorX="center"
      anchorY="middle"
      material-transparent
      material-opacity={0.7}
    >
      {symbol}
    </Text>
  );
}

// Neural Network and AI Symbols
function AIElements() {
  return (
    <>
      <NeuralNetwork position={[2, 2, -1]} />
      <AIBrain position={[-2, 2.5, -1]} />
      <MicrochipCluster position={[0, 3, -2]} />
    </>
  );
}

function NeuralNetwork({ position }: { position: [number, number, number] }) {
  const networkRef = useRef<Group>(null!);
  
  useFrame(({ clock }) => {
    if (networkRef.current) {
      networkRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });
  
  return (
    <group ref={networkRef} position={position} scale={0.3}>
      {/* Network nodes */}
      {Array.from({ length: 9 }, (_, i) => {
        const layer = Math.floor(i / 3);
        const node = i % 3;
        return (
          <mesh
            key={i}
            position={[layer * 1.5 - 1.5, node * 1 - 1, 0]}
          >
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial
              color="#c4b5fd"
              emissive="#c4b5fd"
              emissiveIntensity={0.4}
            />
          </mesh>
        );
      })}
      
      {/* Network connections */}
      {Array.from({ length: 6 }, (_, i) => (
        <mesh
          key={i}
          position={[i % 2 === 0 ? -0.75 : 0.75, (i % 3) * 0.5 - 0.5, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.02, 0.02, 1.4]} />
          <meshStandardMaterial
            color="#7dd3fc"
            emissive="#7dd3fc"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

function AIBrain({ position }: { position: [number, number, number] }) {
  const brainRef = useRef<Mesh>(null!);
  
  useFrame(({ clock }) => {
    if (brainRef.current) {
      const time = clock.getElapsedTime();
      brainRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
      brainRef.current.rotation.y = time * 0.2;
      
      // Pulsing AI brain
      const scale = 0.3 + Math.sin(time * 1.5) * 0.05;
      brainRef.current.scale.setScalar(scale);
    }
  });
  
  return (
    <mesh ref={brainRef} position={position}>
      <dodecahedronGeometry args={[0.4, 1]} />
      <meshStandardMaterial
        color="#c4b5fd"
        emissive="#c4b5fd"
        emissiveIntensity={0.5}
        wireframe
      />
    </mesh>
  );
}

function MicrochipCluster({ position }: { position: [number, number, number] }) {
  const clusterRef = useRef<Group>(null!);
  
  useFrame(({ clock }) => {
    if (clusterRef.current) {
      clusterRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });
  
  return (
    <group ref={clusterRef} position={position}>
      {Array.from({ length: 4 }, (_, i) => {
        const angle = (i / 4) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.3, 0, Math.sin(angle) * 0.3]}
            rotation={[0, angle, 0]}
          >
            <boxGeometry args={[0.15, 0.02, 0.1]} />
            <meshStandardMaterial
              color="#4ade80"
              emissive="#4ade80"
              emissiveIntensity={0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
}
