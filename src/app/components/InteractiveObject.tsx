import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Mesh } from 'three';

interface InteractiveObjectProps {
  position: [number, number, number];
  color: string;
  title: string;
  description: string;
  onActivate: () => void;
}

export default function InteractiveObject({
  position,
  color,
  title,
  description,
  onActivate,
}: InteractiveObjectProps) {
  const meshRef = useRef<Mesh>(null!);
  const [hovered, setHover] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={onActivate}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : color} />
      {hovered && (
        <Html position={[0, 0.7, 0]}>
          <div style={{ background: 'black', color: 'white', padding: '5px', borderRadius: '3px' }}>
            {title}
          </div>
        </Html>
      )}
    </mesh>
  );
}
