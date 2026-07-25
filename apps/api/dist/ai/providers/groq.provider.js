"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroqProvider = void 0;
const openai_1 = __importDefault(require("openai"));
const env_1 = require("../../config/env");
const client = new openai_1.default({
    apiKey: env_1.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});
class GroqProvider {
    async generateResponse(messages) {
        const completion = await client.chat.completions.create({
            model: env_1.env.GROQ_MODEL,
            messages,
            temperature: 0.7,
        });
        return (completion.choices[0].message.content ??
            "No response.");
    }
}
exports.GroqProvider = GroqProvider;
