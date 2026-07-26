import api from "@/lib/api";

export interface AIImage {
  _id: string;
  prompt: string;
  revisedPrompt?: string;
  imageUrl: string;
  size: string;
  quality: string;
  createdAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

class ImageService {
  async generate(
    prompt: string,
    size:
      | "1024x1024"
      | "1024x1536"
      | "1536x1024" = "1024x1024",
    quality:
      | "low"
      | "medium"
      | "high" = "high"
  ) {
    const { data } =
      await api.post<ApiResponse<AIImage>>(
        "/images/generate",
        {
          prompt,
          size,
          quality,
        }
      );

    return data.data;
  }

  async history() {
    const { data } =
      await api.get<ApiResponse<AIImage[]>>(
        "/images"
      );

    return data.data;
  }

  async delete(id: string) {
    await api.delete(`/images/${id}`);
  }
}

export default new ImageService();