import { Router } from "express";
import { ChatController } from "../controllers/chat.controller";
import { protect } from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";

const router = Router();
const controller = new ChatController();

/**
 * @route   POST /api/v1/chat/conversations
 * @desc    Create a new conversation
 * @access  Private
 */
router.post("/conversations", protect, controller.createConversation);

/**
 * @route   GET /api/v1/chat/conversations
 * @desc    Get all conversations for the logged-in user
 * @access  Private
 */
router.get("/conversations", protect, controller.getConversations);

/**
 * @route   GET /api/v1/chat/conversations/:conversationId/messages
 * @desc    Get all messages in a conversation
 * @access  Private
 */
router.get(
  "/conversations/:conversationId/messages",
  protect,
  controller.getMessages
);

/**
 * @route   POST /api/v1/chat/conversations/:conversationId/messages
 * @desc    Send a message to Pascal AI (supports optional file/image attachment)
 * @access  Private
 */
router.post(
  "/conversations/:conversationId/messages",
  protect,
  upload.single("file"),
  controller.sendMessage
);

/**
 * @route   PATCH /api/v1/chat/conversations/:conversationId
 * @desc    Rename a conversation
 * @access  Private
 */
router.patch(
  "/conversations/:conversationId",
  protect,
  controller.renameConversation
);

/**
 * @route   DELETE /api/v1/chat/conversations/:conversationId
 * @desc    Delete a conversation
 * @access  Private
 */
router.delete(
  "/conversations/:conversationId",
  protect,
  controller.deleteConversation
);

export default router;