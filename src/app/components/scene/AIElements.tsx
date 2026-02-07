import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';

// Neural Network and AI Symbols
export function AIElements() {
  return (
    <>
      <NeuralNetwork position={[2, 2, -1]} />
      <AIBrain position={[-2, 2.5, -1]} />
      <MicrochipCluster position={[0, 3, -2]} />
    </>
  );
}

function NeuralNetwork({ position }: { position: [number, number, number] }) {
  const networkRef = useRef<Group>(null!);
  
  useFrame(({ clock }) => {
    if (networkRef.current) {
      networkRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });
  
  return (
    <group ref={networkRef} position={position} scale={0.3}>
      {/* Network nodes */}
      {Array.from({ length: 9 }, (_, i) => {
        const layer = Math.floor(i / 3);
        const node = i % 3;
        return (
          <mesh
            key={i}
            position={[layer * 1.5 - 1.5, node * 1 - 1, 0]}
          >
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial
              color="#c4b5fd"
              emissive="#c4b5fd"
              emissiveIntensity={0.4}
            />
          </mesh>
        );
      })}
      
      {/* Network connections */}
      {Array.from({ length: 6 }, (_, i) => (
        <mesh
          key={i}
          position={[i % 2 === 0 ? -0.75 : 0.75, (i % 3) * 0.5 - 0.5, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.02, 0.02, 1.4]} />
          <meshStandardMaterial
            color="#7dd3fc"
            emissive="#7dd3fc"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

function AIBrain({ position }: { position: [number, number, number] }) {
  const brainRef = useRef<Mesh>(null!);
  
  useFrame(({ clock }) => {
    if (brainRef.current) {
      const time = clock.getElapsedTime();
      brainRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
      brainRef.current.rotation.y = time * 0.2;
      
      // Pulsing AI brain
      const scale = 0.3 + Math.sin(time * 1.5) * 0.05;
      brainRef.current.scale.setScalar(scale);
    }
  });
  
  return (
    <mesh ref={brainRef} position={position}>
      <dodecahedronGeometry args={[0.4, 1]} />
      <meshStandardMaterial
        color="#c4b5fd"
        emissive="#c4b5fd"
        emissiveIntensity={0.5}
        wireframe
      />
    </mesh>
  );
}

function MicrochipCluster({ position }: { position: [number, number, number] }) {
  const clusterRef = useRef<Group>(null!);
  
  useFrame(({ clock }) => {
    if (clusterRef.current) {
      clusterRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });
  
  return (
    <group ref={clusterRef} position={position}>
      {Array.from({ length: 4 }, (_, i) => {
        const angle = (i / 4) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.3, 0, Math.sin(angle) * 0.3]}
            rotation={[0, angle, 0]}
          >
            <boxGeometry args={[0.15, 0.02, 0.1]} />
            <meshStandardMaterial
              color="#4ade80"
              emissive="#4ade80"
              emissiveIntensity={0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
}
