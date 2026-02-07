import { useRef, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html, useGLTF } from '@react-three/drei';
import { Mesh, Group, MathUtils } from 'three';
import { InteractiveObjectProps } from '../../types';

export default function InteractiveObject({
  position,
  project,
  onProjectActivate,
  themeColors,
  scale = 1,
  hideTitle = false,
  noSpin = false,
}: InteractiveObjectProps) {
  const meshRef = useRef<Mesh>(null);
  const modelRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
  const currentScale = useRef(1);

  // Load GLB model if the imageUrl is a .glb file
  const isGLBFile = project.imageUrl?.endsWith('.glb');
  const gltfPath = isGLBFile && project.imageUrl ? project.imageUrl : '/man.glb';
  const gltfResult = useGLTF(gltfPath);
  const gltfScene = Array.isArray(gltfResult) ? gltfResult[0].scene : gltfResult.scene;

  // Debounced hover handlers to prevent jitter
  const handlePointerOver = useCallback(() => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setHovered(true);
  }, []);

  const handlePointerOut = useCallback(() => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => setHovered(false), 200);
  }, []);

  useFrame(() => {
    // Smooth scale interpolation
    const targetScale = hovered ? 1.15 : 1;
    currentScale.current = MathUtils.lerp(currentScale.current, targetScale, 0.08);

    // Apply smooth scale + spin to GLB model group
    if (modelRef.current) {
      modelRef.current.scale.setScalar(currentScale.current);
      if (!noSpin) modelRef.current.rotation.y += 0.005;
    }
    // Apply smooth scale + spin to mesh shapes
    if (meshRef.current) {
      meshRef.current.scale.setScalar(currentScale.current);
      if (!noSpin) meshRef.current.rotation.y += 0.005;
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
      {/* Scaled model/mesh group */}
      <group scale={scale}>
        {/* Render GLB model if imageUrl is a .glb file */}
        {isGLBFile ? (
          <group
            ref={modelRef}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            onClick={() => onProjectActivate(project)}
          >
            <primitive 
              object={gltfScene.clone()} 
              scale={1.5}
              position={[0, 0, 0]}
              castShadow
              receiveShadow
            />
          </group>
        ) : (
          /* Render geometric shape if not a GLB file */
          <mesh
            ref={meshRef}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            onClick={() => onProjectActivate(project)}
          >
            {getGeometry()}
            <meshStandardMaterial color={hovered ? themeColors.two : themeColors.one} />
          </mesh>
        )}
      </group>
      
      {/* Title rendered outside the scale group so it stays readable */}
      {!hideTitle && (
        <Text
          position={[0, 1.2, 0]}
          color={themeColors.three}
          anchorX="center"
          anchorY="middle"
          fontSize={0.25}
          fontWeight="bold"
        >
          {project.title}
        </Text>
      )}
    </group>
  );
}

// Preload the man.glb model for better performance
useGLTF.preload('/man.glb');