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

  // Choose geometry based on project type or ID for variety
  const getGeometry = () => {
    // If geometry type is specified in project, use that
    if (project.geometryType) {
      switch (project.geometryType) {
        case 'box':
          return <boxGeometry args={[1, 1, 1]} />;
        case 'sphere':
          return <sphereGeometry args={[0.6, 32, 32]} />;
        case 'cylinder':
          return <cylinderGeometry args={[0.5, 0.5, 1.2, 32]} />;
        case 'cone':
          return <coneGeometry args={[0.6, 1.2, 32]} />;
        case 'torus':
          return <torusGeometry args={[0.5, 0.2, 16, 100]} />;
        case 'dodecahedron':
          return <dodecahedronGeometry args={[0.6, 0]} />;
        case 'icosahedron':
          return <icosahedronGeometry args={[0.6, 0]} />;
        case 'octahedron':
          return <octahedronGeometry args={[0.7, 0]} />;
        case 'tetrahedron':
          return <tetrahedronGeometry args={[0.7, 0]} />;
        case 'torusKnot':
          return <torusKnotGeometry args={[0.4, 0.1, 64, 8, 2, 3]} />;
        default:
          return <boxGeometry args={[1, 1, 1]} />;
      }
    }

    // Otherwise, use project ID to consistently choose the same geometry
    const geometries = [
      <boxGeometry key="box" args={[1, 1, 1]} />,
      <sphereGeometry key="sphere" args={[0.6, 32, 32]} />,
      <cylinderGeometry key="cylinder" args={[0.5, 0.5, 1.2, 32]} />,
      <coneGeometry key="cone" args={[0.6, 1.2, 32]} />,
      <torusGeometry key="torus" args={[0.5, 0.2, 16, 100]} />,
      <dodecahedronGeometry key="dodecahedron" args={[0.6, 0]} />,
      <icosahedronGeometry key="icosahedron" args={[0.6, 0]} />,
      <octahedronGeometry key="octahedron" args={[0.7, 0]} />,
    ];

    // Use project ID to consistently choose the same geometry for the same project
    const index = project.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % geometries.length;
    return geometries[index];
  };

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onProjectActivate(project)}
        scale={hovered ? 1.2 : 1}
      >
        {getGeometry()}
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