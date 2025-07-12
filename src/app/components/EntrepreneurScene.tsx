/*
 * Silicon Valley Tech Business Scene for Entrepreneurship Section
 * 
 * Features:
 * - Animated Silicon Valley skyline with glowing building windows
 * - Floating business charts (bar, line, pie charts) with smooth animations
 * - Business particles (dollar signs, Bitcoin, light bulbs, gears)
 * - Network connections representing business partnerships
 * - Startup elements (laptops, coffee cups, rocket ships)
 * - Professional lighting with blue and gold business accents
 * - Mobile-optimized performance with reduced particle counts
 * - Modern color palette: #0066cc, #2c3e50, #f39c12, #e74c3c
 */

import { Text, Preload } from '@react-three/drei';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Mesh, Group, Vector3, ShaderMaterial, DoubleSide, VideoTexture, TextureLoader } from 'three';
import InteractiveObject from './InteractiveObject';

function SkyboxSphere() {
  const skyTexture = useLoader(TextureLoader, '/panoramic-sg.png'); // Put sky.jpg in your public folder
  
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
// 1) Create a video‐backed background component
function EntrepreneurVideoBackground() {
  const videoTexture = useMemo(() => {
    const vid = document.createElement('video')
    vid.src = '/skyscraper.mp4'    // put your animation in public/
    vid.loop = true
    vid.muted = true
    vid.autoplay = true
    vid.play()
    return new VideoTexture(vid)
  }, [])

  return (
    <mesh 
      position={[0, 8, -10]} 
      scale = {2} // ← X increased from 25→35, Z set to 1
    >
      <planeGeometry args={[16, 9]} />
      <meshStandardMaterial 
        map={videoTexture} 
        toneMapped={false} 
        transparent={false} 
      />
    </mesh>
  )
}

// Silicon Valley Gradient Background with City Lights

// Modern Tech Buildings Skyline
function TechBuildings() {
  return (
    <>
      {/* Background building silhouettes */}
      <Building position={[-8, 0, -5]} height={6} width={1.5} depth={1} />
      <Building position={[-5, 0, -6]} height={8} width={2} depth={1.5} />
      <Building position={[-2, 0, -4]} height={5} width={1.2} depth={0.8} />
      <Building position={[2, 0, -5]} height={7} width={1.8} depth={1.2} />
      <Building position={[5, 0, -6]} height={4.5} width={1.3} depth={1} />
      <Building position={[8, 0, -4]} height={6.5} width={2.2} depth={1.6} />
      <Building position={[10, 0, -7]} height={9} width={1.6} depth={1.1} />
      <Building position={[-10, 0, -8]} height={5.5} width={1.4} depth={0.9} />
    </>
  );
}

function Building({ position, height, width, depth }: {
  position: [number, number, number];
  height: number;
  width: number;
  depth: number;
}) {
  const buildingRef = useRef<Group>(null!);
  const windowsRef = useRef<Mesh[]>([]);
  
  useFrame(({ clock }) => {
    // Subtle building sway for life
    if (buildingRef.current) {
      buildingRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.2) * 0.01;
    }
    
    // Animated window lights
    windowsRef.current.forEach((window, i) => {
      if (window && window.material) {
        const time = clock.getElapsedTime() + i * 0.5;
        const intensity = 0.3 + Math.sin(time * 0.8) * 0.2;
        (window.material as any).emissiveIntensity = intensity;
      }
    });
  });
  
  return (
    <group ref={buildingRef} position={position}>
      {/* Building structure */}
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial 
          color="#2c3e50"
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
      
      {/* Glowing windows */}
      {Array.from({ length: Math.floor(height * 2) }, (_, i) => {
        const floor = Math.floor(i / 2);
        const side = i % 2;
        return (
          <mesh
            key={i}
            ref={(el) => { if (el) windowsRef.current[i] = el; }}
            position={[
              side === 0 ? -width/3 : width/3,
              floor * 0.8 + 0.5,
              depth/2 + 0.01
            ]}
          >
            <planeGeometry args={[0.2, 0.3]} />
            <meshStandardMaterial
              color="#f39c12"
              emissive="#f39c12"
              emissiveIntensity={0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Floating Business Charts and Financial Data
function FloatingCharts() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const chartCount = isMobile ? 3 : 6;
  
  return (
    <>
      {Array.from({ length: chartCount }, (_, i) => (
        <FloatingChart
          key={i}
          position={[
            (Math.random() - 0.5) * 10,
            Math.random() * 3 + 1,
            (Math.random() - 0.5) * 6
          ]}
          delay={i * 0.7}
          type={i % 3} // Different chart types
        />
      ))}
    </>
  );
}

function FloatingChart({ position, delay, type }: {
  position: [number, number, number];
  delay: number;
  type: number;
}) {
  const chartRef = useRef<Group>(null!);
  
  useFrame(({ clock }) => {
    if (chartRef.current) {
      const time = clock.getElapsedTime() + delay;
      chartRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.3;
      chartRef.current.rotation.y = Math.sin(time * 0.3) * 0.2;
      chartRef.current.rotation.x = Math.cos(time * 0.2) * 0.1;
    }
  });
  
  const renderChart = () => {
    switch (type) {
      case 0: // Bar chart
        return (
          <>
            {Array.from({ length: 5 }, (_, i) => (
              <mesh key={i} position={[i * 0.3 - 0.6, (i + 1) * 0.1, 0]}>
                <boxGeometry args={[0.2, (i + 1) * 0.2, 0.05]} />
                <meshStandardMaterial color="#0066cc" emissive="#003366" />
              </mesh>
            ))}
          </>
        );
      case 1: // Line chart representation
        // return (
        //   <mesh>
        //     <torusGeometry args={[0.5, 0.05, 8, 16]} />
        //     <meshStandardMaterial color="#f39c12" emissive="#cc7a00" />
        //   </mesh>
        // );
      case 2: // Pie chart
        // return (
        //   <mesh rotation={[Math.PI / 2, 0, 0]}>
        //     <cylinderGeometry args={[0.6, 0.6, 0.1, 8]} />
        //     <meshStandardMaterial color="#e74c3c" emissive="#b73e30" />
        //   </mesh>
        // );
      default:
        return null;
    }
  };
  
  return (
    <group ref={chartRef} position={position} scale={0.7}>
      {renderChart()}
    </group>
  );
}

// Business Particles (Dollar signs, Bitcoin, etc.)
function BusinessParticles() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const particleCount = isMobile ? 8 : 15;
  
  return (
    <>
      {Array.from({ length: particleCount }, (_, i) => (
        <BusinessParticle
          key={i}
          position={[
            (Math.random() - 0.5) * 12,
            Math.random() * 4 + 0.5,
            (Math.random() - 0.5) * 8
          ]}
          delay={i * 0.3}
          type={i % 4}
        />
      ))}
    </>
  );
}

function BusinessParticle({ position, delay, type }: {
  position: [number, number, number];
  delay: number;
  type: number;
}) {
  const particleRef = useRef<Mesh>(null!);
  
  useFrame(({ clock }) => {
    if (particleRef.current) {
      const time = clock.getElapsedTime() + delay;
      particleRef.current.position.y = position[1] + Math.sin(time * 0.6) * 0.4;
      particleRef.current.position.x = position[0] + Math.cos(time * 0.3) * 0.2;
      particleRef.current.rotation.z = time * 0.5;
      
      // Pulsing effect
      const scale = 0.8 + Math.sin(time * 2.0) * 0.2;
      particleRef.current.scale.setScalar(scale);
    }
  });
  
  const getParticleGeometry = () => {
    switch (type) {
      case 0: // Dollar sign shape (torus)
        return <torusGeometry args={[0.08, 0.02, 8, 16]} />;
      case 1: // Bitcoin/crypto (octahedron)
        return <octahedronGeometry args={[0.1]} />;
      case 2: // Light bulb (sphere)
        return <sphereGeometry args={[0.08, 12, 12]} />;
      case 3: // Gear (dodecahedron)
        return <dodecahedronGeometry args={[0.07]} />;
      default:
        return <sphereGeometry args={[0.05]} />;
    }
  };
  
  const getParticleColor = () => {
    switch (type) {
      case 0: return "#f39c12"; // Gold for dollar
      case 1: return "#e74c3c"; // Red for crypto
      case 2: return "#f1c40f"; // Yellow for ideas
      case 3: return "#3498db"; // Blue for innovation
      default: return "#ffffff";
    }
  };
  
  return (
    <mesh ref={particleRef} position={position}>
      {getParticleGeometry()}
      <meshStandardMaterial
        color={getParticleColor()}
        emissive={getParticleColor()}
        emissiveIntensity={0.3}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

// Network Connections showing business relationships
function NetworkConnections() {
  return (
    <>
      {Array.from({ length: 6 }, (_, i) => (
        <NetworkLine
          key={i}
          start={[(Math.random() - 0.5) * 8, Math.random() * 2 + 0.5, (Math.random() - 0.5) * 6]}
          end={[(Math.random() - 0.5) * 8, Math.random() * 2 + 0.5, (Math.random() - 0.5) * 6]}
          delay={i * 0.5}
        />
      ))}
    </>
  );
}

function NetworkLine({ start, end, delay }: {
  start: [number, number, number];
  end: [number, number, number];
  delay: number;
}) {
  const lineRef = useRef<Mesh>(null!);
  
  useFrame(({ clock }) => {
    if (lineRef.current) {
      const time = clock.getElapsedTime() + delay;
      const intensity = 0.3 + Math.sin(time * 1.5) * 0.2;
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
      <cylinderGeometry args={[0.01, 0.01, distance]} />
      <meshStandardMaterial
        color="#3498db"
        emissive="#1e6ba8"
        emissiveIntensity={0.3}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

// Startup Elements (laptops, coffee, presentations)
function StartupElements() {
  return (
    <>
      <StartupLaptop position={[2.5, 0.1, 2]} />
      <CoffeeCup position={[-2, 0.1, 1.5]} />
      <RocketShip position={[0, 0.1, -2]} />
    </>
  );
}

function StartupLaptop({ position }: { position: [number, number, number] }) {
  const laptopRef = useRef<Group>(null!);
  
  useFrame(({ clock }) => {
    if (laptopRef.current) {
      laptopRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.1;
    }
  });
  
  return (
    <group ref={laptopRef} position={position}>
      {/* Laptop base */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.8, 0.1, 0.6]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
      {/* Laptop screen */}
      <mesh position={[0, 0.25, -0.25]} rotation={[-Math.PI * 0.1, 0, 0]}>
        <boxGeometry args={[0.7, 0.5, 0.05]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      {/* Screen glow */}
      <mesh position={[0, 0.25, -0.22]} rotation={[-Math.PI * 0.1, 0, 0]}>
        <planeGeometry args={[0.6, 0.4]} />
        <meshStandardMaterial 
          color="#0066cc" 
          emissive="#0066cc" 
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}

function CoffeeCup({ position }: { position: [number, number, number] }) {
  const cupRef = useRef<Group>(null!);
  
  useFrame(({ clock }) => {
    if (cupRef.current) {
      cupRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.8) * 0.02;
    }
  });
  
  return (
    <group ref={cupRef} position={position}>
      {/* Cup */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.08, 0.06, 0.3, 16]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {/* Coffee */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.02, 16]} />
        <meshStandardMaterial color="#3e2723" />
      </mesh>
      {/* Steam effect */}
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.02]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function RocketShip({ position }: { position: [number, number, number] }) {
  const rocketRef = useRef<Group>(null!);
  
  useFrame(({ clock }) => {
    if (rocketRef.current) {
      const time = clock.getElapsedTime();
      rocketRef.current.position.y = position[1] + Math.sin(time * 1.2) * 0.1 + 0.3;
      rocketRef.current.rotation.y = time * 0.5;
      rocketRef.current.rotation.z = Math.sin(time * 0.8) * 0.1;
    }
  });
  
  return (
    <group ref={rocketRef} position={position}>
      {/* Rocket body */}
      <mesh position={[0, 0.3, 0]}>
        <coneGeometry args={[0.1, 0.6, 8]} />
        <meshStandardMaterial color="#e74c3c" />
      </mesh>
      {/* Rocket fins */}
      {Array.from({ length: 3 }, (_, i) => {
        const angle = (i / 3) * Math.PI * 2;
        return (
          <mesh 
            key={i}
            position={[Math.cos(angle) * 0.08, 0.1, Math.sin(angle) * 0.08]}
            rotation={[0, angle, 0]}
          >
            <boxGeometry args={[0.05, 0.15, 0.02]} />
            <meshStandardMaterial color="#c0392b" />
          </mesh>
        );
      })}
      {/* Rocket flame */}
      <mesh position={[0, -0.1, 0]}>
        <coneGeometry args={[0.06, 0.2, 8]} />
        <meshStandardMaterial 
          color="#f39c12" 
          emissive="#f39c12" 
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

function Floor() {
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial 
          color="#34495e" 
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>
    );
  }

// Business Growth Cylinder (representing growth metrics)
function BusinessGrowthCylinder() {
    const meshRef = useRef<Mesh>(null!);
    useFrame(({ clock }) => {
        if(meshRef.current) {
            meshRef.current.rotation.y = clock.getElapsedTime() * 0.5;
            meshRef.current.position.y = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.2;
            
            // Pulsing growth effect
            const scale = 0.8 + Math.sin(clock.getElapsedTime() * 1.5) * 0.2;
            meshRef.current.scale.y = scale;
        }
    });
    return (
        <mesh ref={meshRef} position={[0, 1, 0]}>
            <cylinderGeometry args={[0.5, 0.3, 2, 32]} />
            <meshStandardMaterial 
              color="#0066cc" 
              emissive="#003366"
              roughness={0.2}
              metalness={0.8}
            />
        </mesh>
    );
}

// Innovation Pyramid (representing startup hierarchy)
function InnovationPyramid() {
    const meshRef = useRef<Mesh>(null!);
    useFrame(({ clock }) => {
        if(meshRef.current) {
            meshRef.current.rotation.x = clock.getElapsedTime() * 0.3;
            meshRef.current.rotation.y = clock.getElapsedTime() * 0.4;
            meshRef.current.position.y = 1 + Math.cos(clock.getElapsedTime() * 2) * 0.2;
        }
    });
    return (
        <mesh ref={meshRef} position={[-2, 1, -2]}>
            <coneGeometry args={[0.6, 1.2, 4]} />
            <meshStandardMaterial 
              color="#f39c12" 
              emissive="#cc7a00"
              roughness={0.3}
              metalness={0.6}
            />
        </mesh>
    );
}

import { InteractiveObjectProps, Project } from '../../types';

interface EntrepreneurSceneProps {
  onProjectActivate: (project: Project) => void;
  themeColors: { [key: string]: string };
}

export default function EntrepreneurScene({ onProjectActivate, themeColors }: EntrepreneurSceneProps) {
  const [showPyramid, setShowPyramid] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPyramid(true), 3000);
    
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
      {/* Skybox - Add this first */}
      <SkyboxSphere />
    
      {/* Professional Business Lighting */}
      <ambientLight intensity={0.3} color="#0066cc" />
      <directionalLight position={[10, 10, 5]} intensity={0.7} color="#ffffff" />
      <pointLight position={[-5, 5, -5]} intensity={0.4} color="#f39c12" />
      <pointLight position={[5, 3, 5]} intensity={0.3} color="#3498db" />
      <hemisphereLight args={["#87CEEB", "#2c3e50", 0.2]} />
      
      {/* Silicon Valley Skyline */}
      <TechBuildings />
      
      {/* Animated Business Elements */}
      <FloatingCharts />
      <BusinessParticles />
      {/* {!isMobile && <NetworkConnections />} */}
      <StartupElements />
      
      {/* Scene Title */}
      <Text position={[0, 4, 0]} fontSize={0.6} color="#f39c12" fontWeight="bold">
        Entrepreneur
      </Text>
      <Text position={[0, 3.5, 0]} fontSize={0.3} color="#0066cc">
        Javier Lim
      </Text>
      
      {/* Modern Business Floor */}
      <Floor />
      
      {/* Core Business Objects */}
      <InteractiveObject
        position={[0, 1.5, 0]}
        scale={1}
        project={{
          id: "ent-about-me",
          title: "About Javier",
          description: "Aspiring Entrepreneur",
          imageUrl: "/man.glb",
          geometryType: "dodecahedron",
          componentType: "about_entre"
        }}
        onProjectActivate={onProjectActivate}
        themeColors={themeColors}
      />
      {showPyramid && <InnovationPyramid />}
      
      {/* Interactive Business Project Objects */}
      <InteractiveObject
        position={[3, 1, 0]}
        scale={1.5}
        project={{
          id: "ent-project-1",
          title: "NUS Overseas College",
          description: "Developed a scalable SaaS platform that serves 10,000+ businesses worldwide, generating $2M+ ARR through innovative cloud solutions.",
          imageUrl: "/vercel.svg",
          geometryType: "dodecahedron",
          componentType: "photo"
        }}
        onProjectActivate={onProjectActivate}
        themeColors={themeColors}
      />
      <InteractiveObject
        position={[-3, 1, 0]}
        scale={1.5}
        project={{
          id: "ent-project-2",
          title: "Activities",
          description: "Founded a fintech startup that revolutionized digital payments, secured Series A funding, and processed $50M+ in transactions.",
          imageUrl: "/window.svg",
          geometryType: "sphere"
        }}
        onProjectActivate={onProjectActivate}
        themeColors={themeColors}
      />
      <InteractiveObject
        position={[0, 1, 3]}
        scale={1.5}
        project={{
          id: "ent-project-3",
          title: "Startup?",
          description: "Built an AI-powered business analytics platform that helps companies increase revenue by 30% through data-driven insights.",
          imageUrl: "/globe.svg",
          geometryType: "icosahedron",
          componentType: "startup",
        }}
        onProjectActivate={onProjectActivate}
        themeColors={themeColors}
      />
      
      {/* 3D Man Model for Entrepreneur Scene */}
      <Preload all />
    </>
  );
}

