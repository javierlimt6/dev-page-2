import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

// Circuit board patterns
export function CircuitPatterns() {
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
