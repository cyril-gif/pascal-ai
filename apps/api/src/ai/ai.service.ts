import { AIMessage } from "./types";
import { GroqProvider } from "./providers/groq.provider";

const provider = new GroqProvider();

export class AIService {
  async generate(messages: AIMessage[]) {
    return provider.generateResponse(messages);
  }
}