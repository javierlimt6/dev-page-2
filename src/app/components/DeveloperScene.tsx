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

function Cube() {
    const meshRef = useRef<Mesh>(null!);
    useFrame(({ clock }) => {
        if(meshRef.current) {
            meshRef.current.rotation.x = Math.sin(clock.getElapsedTime()) * 0.5;
            meshRef.current.rotation.y = Math.cos(clock.getElapsedTime()) * 0.5;
            meshRef.current.position.y = 1 + Math.sin(clock.getElapsedTime()) * 0.2;
        }
    });
    return (
        <mesh ref={meshRef} position={[0, 1, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#ff00ff" />
        </mesh>
    );
}

function Sphere() {
    const meshRef = useRef<Mesh>(null!);
    useFrame(({ clock }) => {
        if(meshRef.current) {
            meshRef.current.scale.x = 0.5 + Math.sin(clock.getElapsedTime()) * 0.2;
            meshRef.current.scale.y = 0.5 + Math.sin(clock.getElapsedTime()) * 0.2;
            meshRef.current.scale.z = 0.5 + Math.sin(clock.getElapsedTime()) * 0.2;
        }
    });
    return (
        <mesh ref={meshRef} position={[-2, 1, -2]}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color="#00ffff" />
        </mesh>
    );
}

export default function DeveloperScene({ onProjectActivate }) {
  const [showSphere, setShowSphere] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSphere(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
        <Text position={[0, 2, 0]} fontSize={0.5} color="white">
            Developer Scene
        </Text>
        <Floor />
        <Cube />
        {showSphere && <Sphere />}
        <InteractiveObject
            position={[3, 1, 0]}
            color="purple"
            title="My Awesome Project"
            description="This is a description of my awesome project."
            onActivate={() => onProjectActivate({
                title: "My Awesome Project",
                description: "This is a description of my awesome project.",
                imageUrl: "/next.svg",
            })}
        />
    </>
  );
}
