"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageSchema = exports.createConversationSchema = void 0;
const zod_1 = require("zod");
exports.createConversationSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
});
exports.sendMessageSchema = zod_1.z.object({
    message: zod_1.z.string().min(1, "Message cannot be empty"),
});
