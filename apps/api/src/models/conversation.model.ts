import mongoose, { Document, Schema } from "mongoose";

export interface IConversation extends Document {
  title: string;
  user: mongoose.Types.ObjectId;
  model: string;
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

    model: {
      type: String,
      default: "gpt-4.1-mini",
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