import Conversation from "../models/conversation.model";
import Message from "../models/message.model";
import { AIService } from "../ai/ai.service";
import Groq from "groq-sdk";

const aiService = new AIService();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export class ChatService {
  /**
   * Create a new conversation
   */
  async createConversation(userId: string, title?: string) {
    const conversation = await Conversation.create({
      user: userId,
      title: title || "New Chat",
    });

    return conversation;
  }

  /**
   * Get all conversations for a user
   */
  async getUserConversations(userId: string) {
    return await Conversation.find({ user: userId }).sort({
      updatedAt: -1,
    });
  }

  /**
   * Get a single conversation
   */
  async getConversation(userId: string, conversationId: string) {
    const conversation = await Conversation.findOne({
      _id: conversationId,
      user: userId,
    });

    if (!conversation) {
      throw new Error("Conversation not found");
    }

    return conversation;
  }

  /**
   * Get all messages in a conversation
   */
  async getMessages(userId: string, conversationId: string) {
    await this.getConversation(userId, conversationId);

    return await Message.find({
      conversation: conversationId,
    }).sort({
      createdAt: 1,
    });
  }

  /**
   * Send message to AI
   */
  async sendMessage(
    userId: string,
    conversationId: string,
    content: string
  ) {
    const conversation = await this.getConversation(
      userId,
      conversationId
    );

    // Save user message
    await Message.create({
      conversation: conversation._id,
      role: "user",
      content,
    });

    // Load conversation history
    const history = await Message.find({
      conversation: conversation._id,
    }).sort({
      createdAt: 1,
    });

    const aiMessages = history.map((message) => ({
      role: message.role as "system" | "user" | "assistant",
      content: message.content,
    }));

    // Generate AI response
    const aiReply = await aiService.generate(aiMessages);

    // Save assistant reply
    await Message.create({
      conversation: conversation._id,
      role: "assistant",
      content: aiReply,
    });

    return {
      conversationId: conversation._id,
      reply: aiReply,
    };
  }

  /**
   * Rename conversation
   */
  async renameConversation(
    userId: string,
    conversationId: string,
    title: string
  ) {
    const conversation = await this.getConversation(
      userId,
      conversationId
    );

    conversation.title = title;

    await conversation.save();

    return conversation;
  }

  /**
   * Delete conversation
   */
  async deleteConversation(
    userId: string,
    conversationId: string
  ) {
    await this.getConversation(userId, conversationId);

    await Message.deleteMany({
      conversation: conversationId,
    });

    await Conversation.findByIdAndDelete(conversationId);

    return {
      message: "Conversation deleted successfully",
    };
  }

  // services/chat.service.ts
async streamMessage(userId: string, conversationId: string, message: string) {
  const stream = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "user", content: message },
    ],
    stream: true,
  });

  return stream;
}
async saveAssistantMessage(
  conversationId: string,
  content: string
) {
  return await Message.create({
    conversation: conversationId,
    role: "assistant",
    content,
  });
}
}