import api from "@/lib/api";

export interface Conversation {
  _id: string;
  title: string;
  model: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  _id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

class ChatService {
  /**
   * Create Conversation
   */
  async createConversation(
    title: string
  ): Promise<Conversation> {
    const { data } =
      await api.post<ApiResponse<Conversation>>(
        "/chat/new",
        { title }
      );

    return data.data;
  }

  /**
   * Get Conversations
   */
  async getConversations(): Promise<
    Conversation[]
  > {
    const { data } =
      await api.get<ApiResponse<Conversation[]>>(
        "/chat"
      );

    return data.data;
  }

  /**
   * Get Messages
   */
  async getMessages(
    conversationId: string
  ): Promise<Message[]> {
    const { data } =
      await api.get<ApiResponse<Message[]>>(
        `/chat/${conversationId}/messages`
      );

    return data.data;
  }

  /**
   * Send Message
   */
  async sendMessage(
    conversationId: string,
    message: string
  ): Promise<{
    conversationId: string;
    reply: string;
  }> {
    const { data } =
      await api.post<
        ApiResponse<{
          conversationId: string;
          reply: string;
        }>
      >(
        `/chat/${conversationId}/message`,
        {
          message,
        }
      );

    return data.data;
  }

  /**
   * Rename Conversation
   */
  async renameConversation(
    conversationId: string,
    title: string
  ): Promise<Conversation> {
    const { data } =
      await api.patch<ApiResponse<Conversation>>(
        `/chat/${conversationId}`,
        {
          title,
        }
      );

    return data.data;
  }

  /**
   * Delete Conversation
   */
  async deleteConversation(
    conversationId: string
  ): Promise<{ message: string }> {
    const { data } =
      await api.delete<
        ApiResponse<{ message: string }>
      >(`/chat/${conversationId}`);

    return data.data;
  }


// services/chat.service.ts
async streamMessage(
  conversationId: string,
  message: string,
  onChunk: (chunk: string) => void
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:5000/api/v1/chat/${conversationId}/message`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message }),
    }
  );

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  if (!reader) return;

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    const chunk = decoder.decode(value);
    onChunk(chunk);
  }
}
}

export const chatService = new ChatService();

export default chatService;