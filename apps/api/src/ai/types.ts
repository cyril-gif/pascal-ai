export interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AIProvider {
  generateResponse(
    messages: AIMessage[]
  ): Promise<string>;
}