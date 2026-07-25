import { Request, Response } from "express";
import { ChatService } from "../services/chat.service";
import { processUploadedFile } from "../services/file-processing.service";
import {
  createConversationSchema,
  sendMessageSchema,
} from "../validations/chat.validation";

const chatService = new ChatService();

export class ChatController {
  /**
   * Create Conversation
   */
  createConversation = async (req: any, res: Response) => {
    try {
      const body = createConversationSchema.parse(req.body);

      const conversation = await chatService.createConversation(
        req.user._id,
        body.title
      );

      return res.status(201).json({
        success: true,
        message: "Conversation created successfully",
        data: conversation,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  /**
   * Get All Conversations
   */
  getConversations = async (req: any, res: Response) => {
    try {
      const conversations = await chatService.getUserConversations(
        req.user._id
      );

      return res.status(200).json({
        success: true,
        data: conversations,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  /**
   * Get Conversation Messages
   */
  getMessages = async (req: any, res: Response) => {
    try {
      const messages = await chatService.getMessages(
        req.user._id,
        req.params.conversationId
      );

      return res.status(200).json({
        success: true,
        data: messages,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  /**
   * Send Message (streaming, supports optional file/image attachment)
   */

sendMessage = async (req: any, res: Response) => {
  try {
    const { message } = req.body;
    const { conversationId } = req.params;

    const attachments = [];

    if (req.file) {
      const processed = await processUploadedFile(req.file);
      attachments.push(processed);
    }

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const stream = await chatService.streamMessage(
      req.user._id,
      conversationId,
      message || "",
      attachments
    );

    let fullReply = "";

    for await (const chunk of stream) {
      const text = chunk.choices?.[0]?.delta?.content || "";
      if (text) {
        fullReply += text;
        res.write(text);
      }
    }

    await chatService.saveAssistantMessage(conversationId, fullReply);
    res.end();
  } catch (error: any) {
    console.error(error);

    if (error?.status === 429) {
      const retryAfterSeconds = parseInt(
        error?.headers?.get?.("retry-after") || "300",
        10
      );
      const resetAt = new Date(
        Date.now() + retryAfterSeconds * 1000
      ).toISOString();

      if (!res.headersSent) {
        return res.status(429).json({
          success: false,
          code: "RATE_LIMIT",
          message: "You've used all your messages for now.",
          resetAt,
        });
      }
      return res.end();
    }

    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: error.message || "Streaming failed",
      });
    } else {
      res.end();
    }
  }
};

  /**
   * Rename Conversation
   */
  renameConversation = async (req: any, res: Response) => {
    try {
      const conversation = await chatService.renameConversation(
        req.user._id,
        req.params.conversationId,
        req.body.title
      );

      return res.status(200).json({
        success: true,
        message: "Conversation renamed successfully",
        data: conversation,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  /**
   * Delete Conversation
   */
  deleteConversation = async (req: any, res: Response) => {
    try {
      const result = await chatService.deleteConversation(
        req.user._id,
        req.params.conversationId
      );

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
}