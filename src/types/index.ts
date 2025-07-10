export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  link?: string;
  geometryType?: 'box' | 'sphere' | 'cylinder' | 'cone' | 'torus' | 'dodecahedron' | 'icosahedron' | 'octahedron' | 'tetrahedron' | 'torusKnot';
  componentType?: 'about' | 'awards' | 'leadership' | 'life' | 'experience' | 'projects' | 'contact' | 'hero' | 'name' | 'photo';
  // Add other project-specific data as needed
}

export interface InteractiveObjectProps {
  position: [number, number, number];
  project: Project;
  onProjectActivate: (project: Project) => void;
  themeColors: { [key: string]: string };
  scale: number;
}
