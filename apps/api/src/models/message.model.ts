import mongoose, { Document, Schema } from "mongoose";

export interface IAttachment {
  url: string;
  type: "image" | "document";
  name: string;
  mimeType: string;
}

export interface IMessage extends Document {
  conversation: mongoose.Types.ObjectId;
  role: "system" | "user" | "assistant" | "tool";
  content: string;
  tokens?: number;
  attachments?: IAttachment[];
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    conversation: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },

    role: {
      type: String,
      enum: ["system", "user", "assistant", "tool"],
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    tokens: {
      type: Number,
      default: 0,
    },

    attachments: [
      {
        url: { type: String, required: true },
        type: { type: String, required: true }, // "image" | "document"
        name: { type: String, required: true },
        mimeType: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IMessage>("Message", MessageSchema);