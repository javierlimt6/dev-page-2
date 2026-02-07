import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

// Floating particles for atmosphere
export function TechParticles() {
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
