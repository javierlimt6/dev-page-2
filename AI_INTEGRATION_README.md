# AI-Powered 3D Portfolio Chat System

This project has been enhanced with a personalized AI assistant that uses WebLLM for local processing and IndexedDB for knowledge storage.

## Key Features

### 1. **AI Chat System**
- **Local Processing**: Uses WebLLM (Llama-3.2-3B-Instruct) for privacy-focused AI responses
- **Personal Knowledge Base**: Stores projects, skills, and notes in IndexedDB
- **Persona-Aware**: AI responses adapt to developer/entrepreneur/video-creator contexts
- **Voice Synthesis**: Optional text-to-speech for AI responses

### 2. **Interactive 3D Objects**
- **Enhanced Previews**: Hover shows detailed project information
- **Knowledge Integration**: Clicking objects adds project data to AI knowledge base
- **Theme-Aware**: UI adapts to persona color schemes

### 3. **Local RAG Implementation**
- **Retrieval**: Searches local knowledge base for relevant context
- **Augmentation**: Enhances AI prompts with retrieved information
- **Generation**: Produces personalized responses using your data

## File Structure

```
src/
├── components/
│   └── AIChatBox.tsx           # Enhanced AI chat interface
├── services/
│   ├── webllm.ts              # WebLLM integration service
│   └── knowledge.ts           # IndexedDB knowledge base
├── hooks/
│   └── useAIChat.ts           # AI chat functionality hook
└── app/
    ├── page.tsx               # Main application with AI integration
    └── components/
        └── InteractiveObject.tsx # Enhanced 3D interactive objects
```

## Usage

1. **Initialization**: AI services initialize automatically on page load
2. **Project Interaction**: Click 3D objects to add them to AI knowledge
3. **Chat**: Ask questions about projects, skills, or personal experiences
4. **Persona Switching**: AI adapts responses based on selected persona

## Technical Details

- **WebLLM Model**: Llama-3.2-3B-Instruct-q4f32_1-MLC
- **Storage**: IndexedDB for persistent local knowledge
- **Framework**: Next.js 15 with React Three Fiber
- **Privacy**: All processing happens locally in the browser

## Future Enhancements

- File upload for additional knowledge sources
- Advanced semantic search with embeddings
- Multi-language support
- Export/import knowledge base functionality
