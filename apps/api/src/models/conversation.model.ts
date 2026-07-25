import mongoose, { Document, Schema } from "mongoose";

export interface IConversation extends Document {
  title: string;
  user: mongoose.Types.ObjectId;
  aiModel: string;
  createdAt: Date;
  updatedAt: Date;
}

const ConversationSchema = new Schema<IConversation>(
  {
    title: {
      type: String,
      default: "New Chat",
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    aiModel: {
      type: String,
      default: "llama-3.3-70b-versatile",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IConversation>(
  "Conversation",
  ConversationSchema
);