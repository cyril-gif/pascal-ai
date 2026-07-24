import mongoose, { Document, Schema } from "mongoose";

export interface IMessage extends Document {
  conversation: mongoose.Types.ObjectId;
  role: "system" | "user" | "assistant";
  content: string;
  tokens?: number;
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
      enum: ["system", "user", "assistant"],
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IMessage>(
  "Message",
  MessageSchema
);