import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '@shared/config/env.config';
import { IAIService } from '@shared/interfaces/IAIService';
import { CustomError } from '@shared/utils/CustomError';
import { ERROR_MESSAGES } from '@shared/constants/messages.constants';
import { HTTP_STATUS } from '@shared/constants/statusCodes.constants';

export class GeminiService implements IAIService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    if (!config.GEMINI_API_KEY) {
      throw new CustomError(ERROR_MESSAGES.AI_API_KEY_MISSING, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
    this.genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  }

  async generateResponse<T>(prompt: string): Promise<T> {
    try {
      const result = await this.model.generateContent(prompt);
      const text = result.response.text();
      
      const jsonStr = text.replace(/```json|```/g, '').trim();
      return JSON.parse(jsonStr) as T;
    } catch (error) {
      console.error('Gemini Service Error:', error);
      throw new CustomError(ERROR_MESSAGES.RESUME_GENERATION_FAILED, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  }
}
