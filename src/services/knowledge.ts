import { Project } from '../types';

export interface KnowledgeEntry {
  id: string;
  title: string;
  content: string;
  type: 'project' | 'note' | 'skill' | 'experience';
  tags: string[];
  timestamp: number;
  metadata?: Record<string, any>;
}

export class LocalKnowledgeBase {
  private dbName = 'personal-knowledge-base';
  private version = 1;
  private db: IDBDatabase | null = null;

  async initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        if (!db.objectStoreNames.contains('knowledge')) {
          const store = db.createObjectStore('knowledge', { keyPath: 'id' });
          store.createIndex('type', 'type', { unique: false });
          store.createIndex('tags', 'tags', { unique: false, multiEntry: true });
          store.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };
    });
  }

  async addEntry(entry: KnowledgeEntry): Promise<void> {
    if (!this.db) await this.initialize();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['knowledge'], 'readwrite');
      const store = transaction.objectStore('knowledge');
      const request = store.put(entry);
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async addProject(project: Project): Promise<void> {
    const entry: KnowledgeEntry = {
      id: project.id,
      title: project.title,
      content: project.description,
      type: 'project',
      tags: ['project', project.title.toLowerCase().replace(/\s+/g, '-')],
      timestamp: Date.now(),
      metadata: {
        imageUrl: project.imageUrl,
        link: project.link,
      },
    };
    
    await this.addEntry(entry);
  }

  async search(query: string, limit: number = 5): Promise<KnowledgeEntry[]> {
    if (!this.db) await this.initialize();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['knowledge'], 'readonly');
      const store = transaction.objectStore('knowledge');
      const request = store.getAll();
      
      request.onsuccess = () => {
        const results = request.result;
        const queryLower = query.toLowerCase();
        
        // Simple text search - can be improved with better ranking
        const matches = results
          .filter(entry => 
            entry.title.toLowerCase().includes(queryLower) ||
            entry.content.toLowerCase().includes(queryLower) ||
            entry.tags.some((tag: string) => tag.toLowerCase().includes(queryLower))
          )
          .sort((a, b) => {
            // Prioritize title matches
            const aTitle = a.title.toLowerCase().includes(queryLower) ? 1 : 0;
            const bTitle = b.title.toLowerCase().includes(queryLower) ? 1 : 0;
            if (aTitle !== bTitle) return bTitle - aTitle;
            
            // Then by timestamp (more recent first)
            return b.timestamp - a.timestamp;
          })
          .slice(0, limit);
        
        resolve(matches);
      };
      
      request.onerror = () => reject(request.error);
    });
  }

  async getAllEntries(): Promise<KnowledgeEntry[]> {
    if (!this.db) await this.initialize();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['knowledge'], 'readonly');
      const store = transaction.objectStore('knowledge');
      const request = store.getAll();
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async seedInitialData(): Promise<void> {
    // Add some initial knowledge entries
    const initialEntries: KnowledgeEntry[] = [
      {
        id: 'about-me',
        title: 'About Me',
        content: 'I am a developer, entrepreneur, and video creator passionate about building innovative web applications with cutting-edge technologies like React, Three.js, and AI.',
        type: 'note',
        tags: ['personal', 'about', 'developer', 'entrepreneur', 'video-creator'],
        timestamp: Date.now(),
      },
      {
        id: 'skills-web-development',
        title: 'Web Development Skills',
        content: 'Proficient in React, Next.js, TypeScript, Three.js, React Three Fiber, and modern web technologies. Experience with 3D graphics, WebGL, and creating interactive web experiences.',
        type: 'skill',
        tags: ['skills', 'web-development', 'react', 'nextjs', 'typescript', 'threejs'],
        timestamp: Date.now(),
      },
      {
        id: 'approach-debugging',
        title: 'My Debugging Approach',
        content: 'I approach debugging complex code by first understanding the problem scope, using browser dev tools, adding strategic console.logs, and breaking down the issue into smaller components. I believe in systematic debugging and leveraging community resources.',
        type: 'note',
        tags: ['debugging', 'development', 'methodology', 'problem-solving'],
        timestamp: Date.now(),
      },
    ];

    for (const entry of initialEntries) {
      await this.addEntry(entry);
    }
  }
}

export const knowledgeBase = new LocalKnowledgeBase();
