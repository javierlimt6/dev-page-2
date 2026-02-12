import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Mesh, VideoTexture } from 'three';

// Giant Laptop Environment - keyboard as floor, screen as background
export function LaptopEnvironment() {
  const keyboardRef = useRef<Mesh>(null!);
  const screenRef = useRef<Mesh>(null!);
  
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

  return (
    <group>
      {/* Laptop Keyboard as Floor */}
      <mesh 
        ref={keyboardRef}
        position={[0, -0.2, 0]} 
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
        castShadow
      >
        <planeGeometry args={[18, 12]} />
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
        scale={[16, 10, 1]}
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
      <mesh position={[0, 5, -6.1]} scale={[16 * 1.1, 10 * 1.1, 1]}>
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
      <KeyboardKeys />
    </group>
  );
}

// Keyboard model loaded from GLB
// Attribution (CC-BY License - required):
// "Keyboard" by Poly by Google [CC-BY] (https://creativecommons.org/licenses/by/3.0/)
// via Poly Pizza (https://poly.pizza/m/3oFfQCSsUmQ)
function KeyboardKeys() {
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
