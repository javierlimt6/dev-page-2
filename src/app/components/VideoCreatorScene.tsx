import { Text, useTexture } from '@react-three/drei';
import { useState, useEffect, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Mesh, Group, DoubleSide, TextureLoader } from 'three';
import InteractiveObject from './InteractiveObject';

// Vibrant Sunset Gradient Background Component
function SkyboxSphere() {
  const skyTexture = useLoader(TextureLoader, '/panoramic-beach.png');
  
  return (
    <mesh>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial 
        map={skyTexture} 
        side={2} // THREE.BackSide = 2
      />
    </mesh>
  );
}

// Beach Rock Component
function BeachRock({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <mesh position={position} scale={scale} castShadow>
      <dodecahedronGeometry args={[0.3, 0]} />
      <meshStandardMaterial color="#8B7355" roughness={0.9} />
    </mesh>
  );
}

// Seashell Component
function Seashell({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const shellRef = useRef<Mesh>(null);
  
  useFrame(({ clock }) => {
    if (shellRef.current) {
      shellRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <mesh ref={shellRef} position={position} scale={scale} castShadow>
      <coneGeometry args={[0.08, 0.15, 8]} />
      <meshStandardMaterial color="#F5DEB3" roughness={0.7} />
    </mesh>
  );
}

// Beach Umbrella Component
function BeachUmbrella({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const umbrellaRef = useRef<Group>(null);
  
  useFrame(({ clock }) => {
    if (umbrellaRef.current) {
      umbrellaRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.05;
    }
  });

  return (
    <group ref={umbrellaRef} position={position} scale={scale}>
      {/* Umbrella Pole */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 3, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Umbrella Top */}
      <mesh position={[0, 2.8, 0]} castShadow>
        <coneGeometry args={[1.2, 0.8, 8]} />
        <meshStandardMaterial color="#FF6B6B" />
      </mesh>
      
      {/* Umbrella Stripes */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 0.6;
        const z = Math.sin(angle) * 0.6;
        
        return (
          <mesh
            key={i}
            position={[x, 2.8, z]}
            rotation={[0, angle, 0]}
            castShadow
          >
            <boxGeometry args={[0.1, 0.8, 0.05]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
        );
      })}
    </group>
  );
}

// Beach Ball Component
function BeachBall({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const ballRef = useRef<Mesh>(null);
  
  useFrame(({ clock }) => {
    if (ballRef.current) {
      ballRef.current.rotation.x = clock.getElapsedTime() * 0.5;
      ballRef.current.rotation.z = clock.getElapsedTime() * 0.3;
      ballRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 2) * 0.1;
    }
  });

  return (
    <mesh ref={ballRef} position={position} scale={scale} castShadow>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial color="#FF69B4" />
    </mesh>
  );
}

// Surfboard Component
function Surfboard({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <mesh position={position} scale={scale} rotation={[0, Math.PI / 4, 0]} castShadow>
      <boxGeometry args={[0.15, 0.05, 2]} />
      <meshStandardMaterial color="#00CED1" />
    </mesh>
  );
}

// Beach Chair Component
function BeachChair({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      {/* Chair Frame */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.8, 0.1, 0.6]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Chair Back */}
      <mesh position={[0, 1, -0.25]} rotation={[-Math.PI / 6, 0, 0]} castShadow>
        <boxGeometry args={[0.8, 0.8, 0.1]} />
        <meshStandardMaterial color="#FF4500" />
      </mesh>
      
      {/* Chair Legs */}
      {[-0.3, 0.3].map((x, i) => (
        [-0.2, 0.2].map((z, j) => (
          <mesh key={`${i}-${j}`} position={[x, 0.25, z]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
        ))
      )).flat()}
    </group>
  );
}

// Driftwood Component
function Driftwood({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <mesh position={position} scale={scale} rotation={[0, Math.random() * Math.PI, 0]} castShadow>
      <cylinderGeometry args={[0.05, 0.08, 1.5, 8]} />
      <meshStandardMaterial color="#DEB887" roughness={0.8} />
    </mesh>
  );
}

// Stylized Palm Tree Component - Updated for brightness
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
      {/* Palm Tree Trunk - Brighter */}
      <mesh ref={trunkRef} position={[0, 2, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.18, 4, 8]} />
        <meshStandardMaterial color="#CD853F" roughness={0.7} />
      </mesh>
      
      {/* Palm Leaves - Brighter green */}
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
            <meshStandardMaterial color="#32CD32" roughness={0.5} />
          </mesh>
        );
      })}
      
      {/* Coconuts - Brighter */}
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
          <meshStandardMaterial color="#DEB887" roughness={0.6} />
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

// Beach Sand Floor Component
function BeachFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[25, 25]} />
      <meshStandardMaterial color="#F4A460" roughness={0.9} />
    </mesh>
  );
}

// Water/Ocean Component
function Ocean() {
  const oceanRef = useRef<Mesh>(null);
  
  useFrame(({ clock }) => {
    if (oceanRef.current) {
      oceanRef.current.position.y = -0.3 + Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <mesh ref={oceanRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, 8]} receiveShadow>
      <planeGeometry args={[30, 15]} />
      <meshStandardMaterial color="#0077BE" transparent opacity={0.8} roughness={0.1} />
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

  return (
    <>
      {/* Beach Skybox */}
      <SkyboxSphere />

      {/* BRIGHTER LIGHTING SETUP */}
      <ambientLight intensity={0.8} color="#FFFFFF" />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.2} 
        color="#FFFFFF"
        castShadow
        shadow-mapSize-width={isMobile ? 1024 : 2048}
        shadow-mapSize-height={isMobile ? 1024 : 2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <directionalLight 
        position={[-10, 10, -5]} 
        intensity={0.8} 
        color="#FFF8DC"
      />
      <pointLight position={[-5, 5, -5]} intensity={0.8} color="#FFFFFF" />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#FFFFFF" />
      <pointLight position={[0, 8, 0]} intensity={0.6} color="#FFFFFF" />
      <hemisphereLight args={["#FFFFFF", "#CCCCCC", 0.6]} />
      <spotLight
        position={[0, 15, 0]}
        angle={Math.PI / 3}
        penumbra={0.5}
        intensity={0.5}
        color="#FFFFFF"
        target-position={[0, 0, 0]}
      />

      {/* Scene Title */}
      <Text position={[0, 4, 0]} fontSize={0.6} color="#FFD700" fontWeight="bold">
        Enthusiast
      </Text>
      <Text position={[0, 3.5, 0]} fontSize={0.3} color="#333333">
        Javier Lim
      </Text>
      
      {/* Beach Floor & Ocean */}
      <BeachFloor />
      {/* <Ocean /> */}
      
      {/* Beach Elements */}
      {!isMobile && (
        <>
          {/* Beach Umbrellas */}
          <BeachUmbrella position={[-4, 0, 2]} scale={0.8} />
          <BeachUmbrella position={[5, 0, 3]} scale={0.9} />
          
          {/* Beach Chairs */}
          <BeachChair position={[-3.5, 0, 1.5]} scale={0.7} />
          <BeachChair position={[4.5, 0, 2.5]} scale={0.7} />
          
          {/* Beach Balls */}
          <BeachBall position={[2, 0.3, 1]} scale={0.8} />
          <BeachBall position={[-1, 0.3, 4]} scale={0.6} />
          
          {/* Surfboards */}
          <Surfboard position={[6, 0, 1]} scale={0.8} />
          <Surfboard position={[-5, 0, 4]} scale={0.9} />
          
          {/* Driftwood */}
          <Driftwood position={[3, 0, 5]} scale={0.8} />
          <Driftwood position={[-2, 0, 6]} scale={0.6} />
          <Driftwood position={[1, 0, 7]} scale={0.7} />
          
          {/* Beach Rocks */}
          <BeachRock position={[7, 0, 2]} scale={0.8} />
          <BeachRock position={[-6, 0, 3]} scale={0.6} />
          <BeachRock position={[4, 0, 6]} scale={0.7} />
          <BeachRock position={[-3, 0, 7]} scale={0.9} />
          
          {/* Seashells */}
          <Seashell position={[1.5, 0, 2]} scale={0.8} />
          <Seashell position={[-1.5, 0, 3]} scale={0.6} />
          <Seashell position={[2.5, 0, 4]} scale={0.7} />
          <Seashell position={[-2.5, 0, 5]} scale={0.9} />
        </>
      )}

      {/* Mobile-optimized Beach Elements */}
      {isMobile && (
        <>
          <BeachUmbrella position={[-3, 0, 2]} scale={0.6} />
          <BeachChair position={[3, 0, 1]} scale={0.5} />
          <BeachBall position={[1, 0.3, 3]} scale={0.6} />
          <Surfboard position={[-2, 0, 4]} scale={0.6} />
          <Driftwood position={[2, 0, 5]} scale={0.6} />
          <BeachRock position={[-1, 0, 6]} scale={0.6} />
        </>
      )}
      
      {/* 3D Man Model - Central Position */}
      <InteractiveObject
        position={[0, 1.5, 0]}
        project={{
          id: "video-about-me",
          title: "About Javier",
          description: "Creative content creator specializing in cinematic storytelling, motion graphics, and immersive 3D experiences. Expert in Adobe Creative Suite and Three.js.",
          imageUrl: "/man.glb",
          geometryType: "torus",
          componentType: "life"
        }}
        onProjectActivate={onProjectActivate}
        themeColors={themeColors}
      />
      
      {/* Palm Trees - Positioned to Frame Content */}
      {!isMobile && (
        <>
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
    </>
  );
}
