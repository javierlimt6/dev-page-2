import { CreateMLCEngine, ChatCompletionMessageParam, MLCEngine } from '@mlc-ai/web-llm';

export class WebLLMService {
  private engine: MLCEngine | null = null;
  private isLoading = false;

  async initializeEngine(): Promise<void> {
    if (this.engine || this.isLoading) return;
    
    this.isLoading = true;
    try {
      this.engine = await CreateMLCEngine('Llama-3.2-3B-Instruct-q4f32_1-MLC');
      console.log('WebLLM engine initialized successfully');
    } catch (error) {
      console.error('Failed to initialize WebLLM engine:', error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async generateResponse(
    systemPrompt: string,
    userMessage: string,
    context: string = ''
  ): Promise<string> {
    if (!this.engine) {
      await this.initializeEngine();
    }

    const messages: ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
    ];

    if (context) {
      messages.push({ role: 'user', content: `Context: ${context}` });
    }

    messages.push({ role: 'user', content: userMessage });

    try {
      const response = await this.engine!.chat.completions.create({
        messages,
        temperature: 0.7,
        max_tokens: 512,
      });

      return response.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response.';
    } catch (error) {
      console.error('Error generating response:', error);
      return 'I encountered an error while processing your request. Please try again.';
    }
  }

  isInitialized(): boolean {
    return this.engine !== null;
  }

  isInitializing(): boolean {
    return this.isLoading;
  }
}

export const webLLMService = new WebLLMService();
