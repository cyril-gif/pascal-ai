"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_controller_1 = require("../controllers/chat.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const upload_middleware_1 = require("../middleware/upload.middleware");
const router = (0, express_1.Router)();
const controller = new chat_controller_1.ChatController();
/**
 * @route   POST /api/v1/chat/new
 * @desc    Create a new conversation
 * @access  Private
 */
router.post("/new", auth_middleware_1.protect, controller.createConversation);
/**
 * @route   GET /api/v1/chat
 * @desc    Get all conversations for the logged-in user
 * @access  Private
 */
router.get("/", auth_middleware_1.protect, controller.getConversations);
/**
 * @route   GET /api/v1/chat/:conversationId/messages
 * @desc    Get all messages in a conversation
 * @access  Private
 */
router.get("/:conversationId/messages", auth_middleware_1.protect, controller.getMessages);
/**
 * @route   POST /api/v1/chat/:conversationId/message
 * @desc    Send a message to Pascal AI
 * @access  Private
 */
router.post("/:conversationId/message", auth_middleware_1.protect, controller.sendMessage);
router.post("/:conversationId/message", auth_middleware_1.protect, upload_middleware_1.upload.single("file"), controller.sendMessage);
/**
 * @route   PATCH /api/v1/chat/:conversationId
 * @desc    Rename a conversation
 * @access  Private
 */
router.patch("/:conversationId", auth_middleware_1.protect, controller.renameConversation);
/**
 * @route   DELETE /api/v1/chat/:conversationId
 * @desc    Delete a conversation
 * @access  Private
 */
router.delete("/:conversationId", auth_middleware_1.protect, controller.deleteConversation);
exports.default = router;
