// Example of how to add more knowledge entries to your AI assistant

import { knowledgeBase } from '../services/knowledge';

// Add a new skill
await knowledgeBase.addEntry({
  id: 'skill-react-three-fiber',
  title: 'React Three Fiber Expertise',
  content: 'I have extensive experience with React Three Fiber, creating interactive 3D web applications. I can build complex 3D scenes, handle user interactions, and integrate with WebGL for high-performance graphics.',
  type: 'skill',
  tags: ['react-three-fiber', '3d', 'webgl', 'react', 'three.js'],
  timestamp: Date.now(),
});

// Add a personal note
await knowledgeBase.addEntry({
  id: 'note-work-philosophy',
  title: 'My Work Philosophy',
  content: 'I believe in building user-centered applications that solve real problems. I prioritize clean, maintainable code and enjoy collaborating with cross-functional teams to deliver exceptional products.',
  type: 'note',
  tags: ['philosophy', 'work', 'collaboration', 'user-centered'],
  timestamp: Date.now(),
});

// Add an experience
await knowledgeBase.addEntry({
  id: 'experience-startup',
  title: 'Startup Experience',
  content: 'I founded a tech startup focused on AI-powered productivity tools. Led a team of 5 developers, raised seed funding, and launched 3 successful products that served over 10,000 users.',
  type: 'experience',
  tags: ['startup', 'leadership', 'ai', 'productivity', 'funding'],
  timestamp: Date.now(),
  metadata: {
    company: 'My Startup',
    role: 'Founder & CEO',
    duration: '2 years',
    achievements: ['Raised $500K seed funding', 'Launched 3 products', '10K+ users']
  }
});

// You can also create a utility function to bulk import from a JSON file
export async function importKnowledgeFromJSON(jsonData: any[]) {
  for (const item of jsonData) {
    await knowledgeBase.addEntry({
      id: item.id || `imported-${Date.now()}-${Math.random()}`,
      title: item.title,
      content: item.content,
      type: item.type || 'note',
      tags: item.tags || [],
      timestamp: item.timestamp || Date.now(),
      metadata: item.metadata || {}
    });
  }
}
