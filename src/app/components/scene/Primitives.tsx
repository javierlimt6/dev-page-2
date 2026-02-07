import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export function Cube() {
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
            <meshStandardMaterial 
              color="#f0abfc" 
              emissive="#3b1f47"
              roughness={0.3}
              metalness={0.7}
            />
        </mesh>
    );
}

export function Sphere() {
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
            <meshStandardMaterial 
              color="#67e8f9" 
              emissive="#1e3a3a"
              roughness={0.2}
              metalness={0.8}
            />
        </mesh>
    );
}
