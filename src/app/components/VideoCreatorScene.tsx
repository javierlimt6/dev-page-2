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

function Torus() {
    const meshRef = useRef<Mesh>(null!);
    useFrame(({ clock }) => {
        if(meshRef.current) {
            meshRef.current.rotation.x = clock.getElapsedTime();
            meshRef.current.rotation.y = clock.getElapsedTime();
            meshRef.current.position.y = 1 + Math.sin(clock.getElapsedTime()) * 0.2;
        }
    });
    return (
        <mesh ref={meshRef} position={[0, 1, 0]}>
            <torusGeometry args={[0.5, 0.2, 16, 100]} />
            <meshStandardMaterial color="#ff4500" />
        </mesh>
    );
}

function Capsule() {
    const meshRef = useRef<Mesh>(null!);
    useFrame(({ clock }) => {
        if(meshRef.current) {
            meshRef.current.rotation.z = clock.getElapsedTime();
            meshRef.current.position.y = 1 + Math.cos(clock.getElapsedTime()) * 0.2;
        }
    });
    return (
        <mesh ref={meshRef} position={[-2, 1, -2]}>
            <capsuleGeometry args={[0.5, 1, 4, 8]} />
            <meshStandardMaterial color="#1e90ff" />
        </mesh>
    );
}

import { InteractiveObjectProps, Project } from '../../types';

interface VideoCreatorSceneProps {
  onProjectActivate: (project: Project) => void;
  themeColors: { [key: string]: string };
}

export default function VideoCreatorScene({ onProjectActivate, themeColors }: VideoCreatorSceneProps) {
  const [showCapsule, setShowCapsule] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowCapsule(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
        <Text position={[0, 2, 0]} fontSize={0.5} color="white">
            Video Creator Scene
        </Text>
        <Floor />
        <Torus />
        {showCapsule && <Capsule />}
        <InteractiveObject
            position={[3, 1, 0]}
            project={{
                id: "vc-project-1",
                title: "My Latest Video",
                description: "This is my latest video project, showcasing my editing skills and storytelling abilities.",
                imageUrl: "/file.svg",
            }}
            onProjectActivate={onProjectActivate}
            themeColors={themeColors}
        />
    </>
  );
}
