import { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Mesh, VideoTexture } from 'three';

// Giant Laptop Environment - keyboard as floor, screen as background
export function LaptopEnvironment() {
  const keyboardRef = useRef<Mesh>(null!);
  const screenRef = useRef<Mesh>(null!);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Create a looping HTML5 video element + three.js VideoTexture
  const videoTexture = useMemo(() => {
    const vid = document.createElement('video');
    vid.src = '/laptop.mp4';    // put your file in public/
    vid.loop = true;
    vid.muted = true;
    vid.playsInline = true;
    vid.autoplay = true;
    vid.play();
    return new VideoTexture(vid);
  }, []);

  // Scale laptop based on screen size
  const laptopScale = isMobile ? 0.7 : 1.0;
  const keyboardWidth = isMobile ? 12 : 18;
  const keyboardHeight = isMobile ? 8 : 12;
  const screenWidth = isMobile ? 10 : 16;
  const screenHeight = isMobile ? 6 : 10;
  
  return (
    <group scale={laptopScale}>
      {/* Laptop Keyboard as Floor */}
      <mesh 
        ref={keyboardRef}
        position={[0, -0.2, 0]} 
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
        castShadow
      >
        <planeGeometry args={[keyboardWidth, keyboardHeight]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          emissive="#0f172a"
          emissiveIntensity={0.1}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
      
      {/* Laptop Screen as Background */}
      <mesh 
        ref={screenRef}
        position={[0, 5, -6]} 
        scale={[screenWidth, screenHeight, 1]}
        receiveShadow
        castShadow
      >
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial
          map={videoTexture}
          toneMapped={false}
          transparent={true}
        />
      </mesh>
      
      {/* Laptop Screen Bezel */}
      <mesh position={[0, 5, -6.1]} scale={[screenWidth * 1.1, screenHeight * 1.1, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial 
          color="#2c3e50" 
          emissive="#0f172a"
          emissiveIntensity={0.02}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      
      {/* Keyboard Keys */}
      <KeyboardKeys isMobile={isMobile} />
      
      {/* Laptop Base/Hinge - commented out */}
      {/* <mesh position={[0, 0, -4]} rotation={[-Math.PI / 8, 0, 0]}>
        <boxGeometry args={[keyboardWidth * 0.9, 0.3, 1]} />
        <meshStandardMaterial 
          color="#2c3e50" 
          emissive="#0f172a"
          emissiveIntensity={0.05}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh> */}
    </group>
  );
}

// Keyboard model loaded from GLB
// Attribution (CC-BY License - required):
// "Keyboard" by Poly by Google [CC-BY] (https://creativecommons.org/licenses/by/3.0/)
// via Poly Pizza (https://poly.pizza/m/3oFfQCSsUmQ)
function KeyboardKeys({ isMobile }: { isMobile: boolean }) {
  const { scene } = useGLTF('/keyboard.glb');
  
  // Scale down for mobile
  const baseScale = 0.04
  
  return (
    <primitive 
      object={scene} 
      position={[0, -0.2, -0.7]}
      scale={[baseScale, baseScale, baseScale]}  // Adjust scale as needed
      rotation={[0, 0, 0]}
    />
  );
}

export function KeyboardKey({ position, scale, delay }: {
  position: [number, number, number];
  scale: [number, number, number];
  delay: number;
}) {
  const keyRef = useRef<Mesh>(null!);
  
  useFrame(({ clock }) => {
    if (keyRef.current) {
      const time = clock.getElapsedTime() + delay;
      // Subtle key glow animation
      const intensity = 0.1 + Math.sin(time * 0.5) * 0.05;
      if (keyRef.current.material) {
        (keyRef.current.material as any).emissiveIntensity = intensity;
      }
    }
  });
  
  return (
    <mesh ref={keyRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#7dd3fc"
        emissive="#7dd3fc"
        emissiveIntensity={0.1}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}
