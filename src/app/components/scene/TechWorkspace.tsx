import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Mesh } from 'three';

// Developer Workspace with Monitors and Keyboards
export function TechWorkspace() {
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
