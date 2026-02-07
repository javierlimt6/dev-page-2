import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Mesh } from 'three';

// Floating code snippets
// Update the FloatingCode function with your actual tech stack
export function FloatingCode() {
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
export function DataNodes() {
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
