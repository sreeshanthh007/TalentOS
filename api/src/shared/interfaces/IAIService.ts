export interface IAIService {
  generateResponse<T>(prompt: string): Promise<T>;
}
