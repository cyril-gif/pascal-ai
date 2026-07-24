import { Router } from "express";
import { ChatController } from "../controllers/chat.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();
const controller = new ChatController();

/**
 * @route   POST /api/v1/chat/new
 * @desc    Create a new conversation
 * @access  Private
 */
router.post("/new", protect, controller.createConversation);

/**
 * @route   GET /api/v1/chat
 * @desc    Get all conversations for the logged-in user
 * @access  Private
 */
router.get("/", protect, controller.getConversations);

/**
 * @route   GET /api/v1/chat/:conversationId/messages
 * @desc    Get all messages in a conversation
 * @access  Private
 */
router.get(
  "/:conversationId/messages",
  protect,
  controller.getMessages
);

/**
 * @route   POST /api/v1/chat/:conversationId/message
 * @desc    Send a message to Pascal AI
 * @access  Private
 */
router.post(
  "/:conversationId/message",
  protect,
  controller.sendMessage
);

/**
 * @route   PATCH /api/v1/chat/:conversationId
 * @desc    Rename a conversation
 * @access  Private
 */
router.patch(
  "/:conversationId",
  protect,
  controller.renameConversation
);

/**
 * @route   DELETE /api/v1/chat/:conversationId
 * @desc    Delete a conversation
 * @access  Private
 */
router.delete(
  "/:conversationId",
  protect,
  controller.deleteConversation
);

export default router;