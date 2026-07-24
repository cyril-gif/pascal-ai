import OpenAI from "openai";
import { env } from "../../config/env";
import { AIMessage, AIProvider } from "../types";

const client = new OpenAI({
  apiKey: env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export class GroqProvider implements AIProvider {
  async generateResponse(
    messages: AIMessage[]
  ): Promise<string> {
    const completion =
      await client.chat.completions.create({
        model: env.GROQ_MODEL,
        messages,
        temperature: 0.7,
      });

    return (
      completion.choices[0].message.content ??
      "No response."
    );
  }
}