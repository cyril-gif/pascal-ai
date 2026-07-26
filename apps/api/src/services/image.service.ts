import OpenAI from "openai";
import Image from "../models/image.model";
import {env} from "../config/env";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY!,
});

class ImageService {
  async generateImage(
    userId: string,
    prompt: string,
    size:
      | "1024x1024"
      | "1024x1536"
      | "1536x1024" = "1024x1024",
    quality: "low" | "medium" | "high" = "high"
  ) {
    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size,
      quality,
    });

    if (!response.data?.length) {
      throw new Error("Image generation failed.");
    }

    // gpt-image-1 returns base64 image data
    const base64 = response.data[0].b64_json;

    if (!base64) {
      throw new Error("No image returned from OpenAI.");
    }

    // Data URL (works immediately in the frontend)
    const imageUrl = `data:image/png;base64,${base64}`;

    const image = await Image.create({
      user: userId,
      prompt,
      revisedPrompt: response.data[0].revised_prompt || prompt,
      imageUrl,
      size,
      quality,
    });

    return image;
  }

  async getImages(userId: string) {
    return Image.find({
      user: userId,
    }).sort({
      createdAt: -1,
    });
  }

  async deleteImage(imageId: string, userId: string) {
    return Image.findOneAndDelete({
      _id: imageId,
      user: userId,
    });
  }
}

export default new ImageService();