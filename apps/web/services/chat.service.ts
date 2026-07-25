// services/chat.service.ts
import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

function getToken() {
  return typeof window !== "undefined"
    ? localStorage.getItem("token")
    : null;
}

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

class ChatService {
  async createConversation(title: string) {
    const res = await api.post("/chat/conversations", { title });
    return res.data.data;
  }

  async getConversations() {
    const res = await api.get("/chat/conversations");
    return res.data.data;
  }

  async getMessages(conversationId: string) {
    const res = await api.get(`/chat/conversations/${conversationId}/messages`);
    return res.data.data;
  }

  async renameConversation(conversationId: string, title: string) {
    const res = await api.patch(`/chat/conversations/${conversationId}`, {
      title,
    });
    return res.data.data;
  }

  async deleteConversation(conversationId: string) {
    const res = await api.delete(`/chat/conversations/${conversationId}`);
    return res.data.data;
  }

  /**
   * Streams the assistant reply chunk-by-chunk.
   * onChunk is called with the accumulated text so far.
   * Optionally attaches a single file (image or document).
   * Throws an error with .code === "RATE_LIMIT" and .resetAt when
   * the daily message limit is hit.
   */
  async streamMessage(
    conversationId: string,
    message: string,
    onChunk: (fullTextSoFar: string) => void,
    signal?: AbortSignal,
    file?: File | null
  ): Promise<string> {
    const token = getToken();

    let response: Response;

    if (file) {
      const formData = new FormData();
      formData.append("message", message);
      formData.append("file", file);

      response = await fetch(
        `${API_BASE_URL}/chat/conversations/${conversationId}/messages`,
        {
          method: "POST",
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: formData,
          signal,
        }
      );
    } else {
      response = await fetch(
        `${API_BASE_URL}/chat/conversations/${conversationId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ message }),
          signal,
        }
      );
    }

    if (response.status === 429) {
      const data = await response.json();
      const err: any = new Error(data.message || "Rate limit reached");
      err.code = "RATE_LIMIT";
      err.resetAt = data.resetAt;
      throw err;
    }

    if (!response.ok || !response.body) {
      throw new Error("Failed to reach chat stream");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      fullText += chunk;
      onChunk(fullText);
    }

    return fullText;
  }
}

export default new ChatService();