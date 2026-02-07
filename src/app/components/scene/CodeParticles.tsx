import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

// Enhanced Code Particles
// Update the CodeParticles function with your actual syntax
export function CodeParticles() {
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
