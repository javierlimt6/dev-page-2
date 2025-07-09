import { useState, useEffect, useCallback } from 'react';
import { webLLMService } from '../services/webllm';
import { knowledgeBase } from '../services/knowledge';
import { Project } from '../types';

export interface ChatMessage {
  sender: 'user' | 'bot';
  message: string;
  timestamp: number;
}

export interface UseAIChatOptions {
  persona: string;
  onProjectActivate?: (project: Project) => void;
}

export const useAIChat = ({ persona, onProjectActivate }: UseAIChatOptions) => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const getSystemPrompt = useCallback((persona: string) => {
    const basePrompt = `You are my personal AI clone. Respond in my voice and writing style, using my personal notes and documents to inform your answers. Always reference my stored knowledge when possible, and synthesize information from multiple relevant sources to provide accurate, context-rich responses. Consider the current date and recent updates in my notes to ensure your answers reflect my evolving journey and knowledge.`;
    
    const personaContext = {
      developer: 'Focus on my technical expertise, coding projects, and development methodologies. Emphasize problem-solving approaches and technical achievements.',
      entrepreneur: 'Highlight my business ventures, strategic thinking, and entrepreneurial mindset. Discuss market insights and business development experiences.',
      'video-creator': 'Showcase my creative projects, video production skills, and content creation strategies. Emphasize storytelling and visual communication.'
    };

    return `${basePrompt}\n\nCurrent context: You are currently in my ${persona} persona. ${personaContext[persona as keyof typeof personaContext] || ''}`;
  }, []);

  const initializeServices = useCallback(async () => {
    try {
      setIsLoading(true);
      await Promise.all([
        webLLMService.initializeEngine(),
        knowledgeBase.initialize()
      ]);
      
      // Seed initial data if needed
      const entries = await knowledgeBase.getAllEntries();
      if (entries.length === 0) {
        await knowledgeBase.seedInitialData();
      }
      
      setIsInitialized(true);
    } catch (error) {
      console.error('Failed to initialize AI services:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addProjectToKnowledge = useCallback(async (project: Project) => {
    try {
      await knowledgeBase.addProject(project);
      
      // Add a system message to chat history
      const contextMessage: ChatMessage = {
        sender: 'bot',
        message: `I've added information about "${project.title}" to my knowledge base. Feel free to ask me about this project!`,
        timestamp: Date.now()
      };
      
      setChatHistory(prev => [...prev, contextMessage]);
    } catch (error) {
      console.error('Failed to add project to knowledge:', error);
    }
  }, []);

  const sendMessage = useCallback(async (message: string) => {
    if (!isInitialized || isLoading) return;

    const userMessage: ChatMessage = {
      sender: 'user',
      message,
      timestamp: Date.now()
    };

    setChatHistory(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Search for relevant knowledge
      const relevantEntries = await knowledgeBase.search(message, 3);
      const context = relevantEntries.map(entry => 
        `${entry.title}: ${entry.content}`
      ).join('\n\n');

      // Generate AI response
      const systemPrompt = getSystemPrompt(persona);
      const response = await webLLMService.generateResponse(
        systemPrompt,
        message,
        context
      );

      const botMessage: ChatMessage = {
        sender: 'bot',
        message: response,
        timestamp: Date.now()
      };

      setChatHistory(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Failed to generate response:', error);
      const errorMessage: ChatMessage = {
        sender: 'bot',
        message: 'I apologize, but I encountered an error. Please try again.',
        timestamp: Date.now()
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [isInitialized, isLoading, persona, getSystemPrompt]);

  useEffect(() => {
    initializeServices();
  }, [initializeServices]);

  return {
    chatHistory,
    isLoading,
    isInitialized,
    sendMessage,
    addProjectToKnowledge,
    initializationProgress: webLLMService.isInitializing() ? 'Initializing AI...' : null
  };
};
