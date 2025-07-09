import { Text } from '@react-three/drei';
import { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import InteractiveObject from './InteractiveObject';

function Floor() {
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#666" />
      </mesh>
    );
  }

function Cylinder() {
    const meshRef = useRef<Mesh>(null!);
    useFrame(({ clock }) => {
        if(meshRef.current) {
            meshRef.current.rotation.y = clock.getElapsedTime();
            meshRef.current.position.y = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.2;
        }
    });
    return (
        <mesh ref={meshRef} position={[0, 1, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 2, 32]} />
            <meshStandardMaterial color="#0000ff" />
        </mesh>
    );
}

function Cone() {
    const meshRef = useRef<Mesh>(null!);
    useFrame(({ clock }) => {
        if(meshRef.current) {
            meshRef.current.rotation.x = clock.getElapsedTime();
            meshRef.current.position.y = 1 + Math.cos(clock.getElapsedTime() * 2) * 0.2;
        }
    });
    return (
        <mesh ref={meshRef} position={[-2, 1, -2]}>
            <coneGeometry args={[0.5, 1, 32]} />
            <meshStandardMaterial color="#00ff00" />
        </mesh>
    );
}

export default function EntrepreneurScene({ onProjectActivate }) {
  const [showCone, setShowCone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowCone(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
        <Text position={[0, 2, 0]} fontSize={0.5} color="black">
            Entrepreneur Scene
        </Text>
        <Floor />
        <Cylinder />
        {showCone && <Cone />}
        <InteractiveObject
            position={[3, 1, 0]}
            color="orange"
            title="My Business Venture"
            description="Details about my successful business venture."
            onActivate={() => onProjectActivate({
                title: "My Business Venture",
                description: "Details about my successful business venture.",
                imageUrl: "/vercel.svg",
            })}
        />
    </>
  );
}

