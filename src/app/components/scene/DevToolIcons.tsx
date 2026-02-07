import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Group } from 'three';

// Programming Language and Tool Icons
// Update the DevToolIcons function with your actual tools
export function DevToolIcons() {
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
