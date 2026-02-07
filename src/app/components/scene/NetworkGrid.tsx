import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

// Network Grid Visualization
export function NetworkGrid() {
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
