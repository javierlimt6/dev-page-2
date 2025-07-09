import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import { Mesh } from 'three';
import { InteractiveObjectProps } from '../../types';

export default function InteractiveObject({
  position,
  project,
  onProjectActivate,
  themeColors,
}: InteractiveObjectProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      // Optional: Add a subtle animation or rotation
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onProjectActivate(project)}
        scale={hovered ? 1.2 : 1}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? themeColors.two : themeColors.one} />
      </mesh>
      <Text
        position={[0, 0.7, 0]} // Position above the box
        fontSize={0.2}
        color={themeColors.three}
        anchorX="center"
        anchorY="middle"
      >
        {project.title}
      </Text>
      {hovered && (
        <Html position={[0, 1.2, 0]} center>
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.9)',
              padding: '10px 15px',
              borderRadius: '8px',
              color: 'white',
              fontSize: '13px',
              maxWidth: '250px',
              border: `2px solid ${themeColors.two}`,
              boxShadow: `0 0 15px ${themeColors.two}40`,
            }}
          >
            <div style={{ 
              fontWeight: 'bold', 
              marginBottom: '5px',
              color: themeColors.one
            }}>
              {project.title}
            </div>
            <div style={{ 
              lineHeight: 1.4,
              marginBottom: '8px'
            }}>
              {project.description.length > 100 
                ? `${project.description.substring(0, 100)}...` 
                : project.description}
            </div>
            <div style={{ 
              fontSize: '11px',
              color: themeColors.three,
              fontStyle: 'italic'
            }}>
              Click to view details & add to AI knowledge
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}