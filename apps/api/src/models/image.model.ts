import mongoose, { Schema, Document } from "mongoose";

export interface IImage extends Document {
  user: mongoose.Types.ObjectId;
  prompt: string;
  revisedPrompt?: string;
  imageUrl: string;
  size: "1024x1024" | "1024x1536" | "1536x1024";
  quality: "low" | "medium" | "high";
  createdAt: Date;
  updatedAt: Date;
}

const ImageSchema = new Schema<IImage>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    prompt: {
      type: String,
      required: true,
      trim: true,
    },

    revisedPrompt: {
      type: String,
      default: "",
    },

    imageUrl: {
      type: String,
      required: true,
    },

    size: {
      type: String,
      enum: ["1024x1024", "1024x1536", "1536x1024"],
      default: "1024x1024",
    },

    quality: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "high",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IImage>("Image", ImageSchema);