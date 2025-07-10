import { Text, useTexture } from '@react-three/drei';
import { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group, DoubleSide } from 'three';
import InteractiveObject from './InteractiveObject';

// Vibrant Sunset Gradient Background Component


// Stylized Palm Tree Component
function PalmTree({ position, scale = 1, delay = 0 }: { 
  position: [number, number, number]; 
  scale?: number; 
  delay?: number;
}) {
  const treeGroupRef = useRef<Group>(null);
  const trunkRef = useRef<Mesh>(null);
  const leavesRefs = useRef<Mesh[]>([]);

  useFrame(({ clock }) => {
    if (treeGroupRef.current) {
      // Gentle swaying motion for the entire tree
      const time = clock.getElapsedTime() + delay;
      treeGroupRef.current.rotation.z = Math.sin(time * 0.3) * 0.08;
      treeGroupRef.current.rotation.x = Math.cos(time * 0.2) * 0.03;
    }

    // Individual leaf movement
    leavesRefs.current.forEach((leaf, index) => {
      if (leaf) {
        const time = clock.getElapsedTime() + delay + index * 0.1;
        leaf.rotation.z = Math.sin(time * 0.5) * 0.2;
        leaf.rotation.y = Math.cos(time * 0.4) * 0.15;
      }
    });
  });

  return (
    <group ref={treeGroupRef} position={position} scale={scale}>
      {/* Palm Tree Trunk */}
      <mesh ref={trunkRef} position={[0, 2, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.18, 4, 8]} />
        <meshStandardMaterial color="#8B4513" roughness={0.9} />
      </mesh>
      
      {/* Palm Leaves - arranged in a crown */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 0.25;
        const z = Math.sin(angle) * 0.25;
        
        return (
          <mesh
            key={i}
            ref={(el) => { if (el) leavesRefs.current[i] = el; }}
            position={[x, 4, z]}
            rotation={[Math.PI * 0.05, angle, 0]}
            castShadow
          >
            <boxGeometry args={[0.08, 2, 0.04]} />
            <meshStandardMaterial color="#228B22" roughness={0.7} />
          </mesh>
        );
      })}
      
      {/* Coconuts for added detail */}
      {Array.from({ length: 2 }, (_, i) => (
        <mesh
          key={`coconut-${i}`}
          position={[
            Math.cos(i * 3) * 0.15,
            3.5 + Math.sin(i) * 0.05,
            Math.sin(i * 3) * 0.15
          ]}
          castShadow
        >
          <sphereGeometry args={[0.06, 8, 6]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

// Floating particles for atmospheric effect
function FloatingParticle({ position, delay = 0 }: { 
  position: [number, number, number]; 
  delay?: number;
}) {
  const particleRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (particleRef.current) {
      const time = clock.getElapsedTime() + delay;
      particleRef.current.position.y = position[1] + Math.sin(time * 0.3) * 0.5;
      particleRef.current.position.x = position[0] + Math.cos(time * 0.2) * 0.3;
      particleRef.current.rotation.z = time * 0.5;
    }
  });

  return (
    <mesh ref={particleRef} position={position}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshBasicMaterial color="#FFD700" transparent opacity={0.6} />
    </mesh>
  );
}

function Floor() {
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#2d5a3d" roughness={0.8} />
      </mesh>
    );
}

function Torus() {
    const meshRef = useRef<Mesh>(null!);
    useFrame(({ clock }) => {
        if(meshRef.current) {
            meshRef.current.rotation.x = clock.getElapsedTime();
            meshRef.current.rotation.y = clock.getElapsedTime();
            meshRef.current.position.y = 1 + Math.sin(clock.getElapsedTime()) * 0.2;
        }
    });
    return (
        <mesh ref={meshRef} position={[0, 1, 0]}>
            <torusGeometry args={[0.5, 0.2, 16, 100]} />
            <meshStandardMaterial color="#ff4500" />
        </mesh>
    );
}

function Capsule() {
    const meshRef = useRef<Mesh>(null!);
    useFrame(({ clock }) => {
        if(meshRef.current) {
            meshRef.current.rotation.z = clock.getElapsedTime();
            meshRef.current.position.y = 1 + Math.cos(clock.getElapsedTime()) * 0.2;
        }
    });
    return (
        <mesh ref={meshRef} position={[-2, 1, -2]}>
            <capsuleGeometry args={[0.5, 1, 4, 8]} />
            <meshStandardMaterial color="#1e90ff" />
        </mesh>
    );
}

import { InteractiveObjectProps, Project } from '../../types';

interface VideoCreatorSceneProps {
  onProjectActivate: (project: Project) => void;
  themeColors: { [key: string]: string };
}

export default function VideoCreatorScene({ onProjectActivate, themeColors }: VideoCreatorSceneProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check for mobile device for performance optimization
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Reduce palm tree count on mobile for performance
  const palmTreeCount = isMobile ? 4 : 8;
  const particleCount = isMobile ? 6 : 12;

  // Instead of VideoTexture, load your GIF:
  const gifTexture = useTexture('/sunset.gif')  // put background.gif in /public

  return (
    <>
      {/* Replace your <SunsetGradientBackground/> or video‐plane */}
      <mesh position={[0, 10, -20]} scale={[40, 25, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={gifTexture}
          toneMapped={false}
          side={DoubleSide}
        />
      </mesh>

      {/* Optimized Lighting for Tropical Scene */}
      <ambientLight intensity={0.4} color="#FFE4B5" />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.6} 
        color="#FFF8DC"
        castShadow
        shadow-mapSize-width={isMobile ? 1024 : 2048}
        shadow-mapSize-height={isMobile ? 1024 : 2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <pointLight position={[-5, 5, -5]} intensity={0.3} color="#87CEEB" />
      <hemisphereLight args={["#87CEEB", "#2F4F4F", 0.3]} />

      {/* Scene Title */}
      <Text position={[0, 4, 0]} fontSize={0.6} color="#FFD700" fontWeight="bold">
        Enthusiast
      </Text>
      <Text position={[0, 3.5, 0]} fontSize={0.3} color="#0a192f">
        Javier Lim
      </Text>
      
      {/* Floor */}
      <Floor />
      
      {/* 3D Man Model - Central Position */}
      <InteractiveObject
        position={[0, 1.5, 0]}
        project={{
          id: "video-about-me",
          title: "About Javier",
          description: "Creative content creator specializing in cinematic storytelling, motion graphics, and immersive 3D experiences. Expert in Adobe Creative Suite and Three.js.",
          imageUrl: "/man.glb",
          geometryType: "torus"
        }}
        onProjectActivate={onProjectActivate}
        themeColors={themeColors}
      />
      
      {/* Palm Trees - Positioned to Frame Content */}
      {!isMobile && (
        <>
          {/* Background Palm Trees */}
          <PalmTree position={[-8, 0, -3]} scale={1.2} delay={0} />
          <PalmTree position={[8, 0, -4]} scale={1.0} delay={0.5} />
          <PalmTree position={[-6, 0, 6]} scale={0.8} delay={1.0} />
          <PalmTree position={[7, 0, 5]} scale={1.1} delay={1.5} />
          <PalmTree position={[0, 0, -8]} scale={0.9} delay={2.0} />
          <PalmTree position={[-12, 0, -8]} scale={0.6} delay={0.3} />
          <PalmTree position={[12, 0, -7]} scale={0.7} delay={0.8} />
          <PalmTree position={[-10, 0, 10]} scale={0.5} delay={1.3} />
        </>
      )}
      
      {/* Mobile-optimized Palm Trees */}
      {isMobile && (
        <>
          <PalmTree position={[-6, 0, -3]} scale={1.0} delay={0} />
          <PalmTree position={[6, 0, -3]} scale={1.0} delay={0.5} />
          <PalmTree position={[-4, 0, 6]} scale={0.8} delay={1.0} />
          <PalmTree position={[4, 0, 6]} scale={0.8} delay={1.5} />
        </>
      )}
      
      {/* Floating Particles for Atmosphere */}
      {Array.from({ length: particleCount }, (_, i) => (
        <FloatingParticle
          key={i}
          position={[
            (Math.random() - 0.5) * (isMobile ? 12 : 16),
            2 + Math.random() * 4,
            (Math.random() - 0.5) * (isMobile ? 12 : 16)
          ]}
          delay={i * 0.2}
        />
      ))}
      
      {/* Original Scene Elements */}
      
      {/* Interactive Project Objects */}
      <InteractiveObject
        position={[3, 1, 0]}
        project={{
          id: "vc-project-1",
          title: "Travel Photography",
          description: "Capturing beautiful moments from around the world, focusing on landscapes, cultures, and hidden gems discovered during my adventures.",
          imageUrl: "/file.svg",
          geometryType: "torus"
        }}
        onProjectActivate={onProjectActivate}
        themeColors={themeColors}
      />
      <InteractiveObject
        position={[-3, 1, 0]}
        project={{
          id: "vc-project-2",
          title: "Cooking Adventures",
          description: "Exploring diverse cuisines and creating fusion dishes that blend traditional techniques with modern creativity.",
          imageUrl: "/next.svg",
          geometryType: "cone"
        }}
        onProjectActivate={onProjectActivate}
        themeColors={themeColors}
      />
      <InteractiveObject
        position={[0, 1, 3]}
        project={{
          id: "vc-project-3",
          title: "Music Production",
          description: "Creating ambient and electronic music tracks, experimenting with soundscapes and digital audio synthesis.",
          imageUrl: "/globe.svg",
          geometryType: "sphere"
        }}
        onProjectActivate={onProjectActivate}
        themeColors={themeColors}
      />
      
      {/* 3D Man Model - Positioned in the Scene */}
    </>
  );
}
