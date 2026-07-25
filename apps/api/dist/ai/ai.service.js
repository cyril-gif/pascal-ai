"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIService = void 0;
const groq_provider_1 = require("./providers/groq.provider");
const provider = new groq_provider_1.GroqProvider();
class AIService {
    async generate(messages) {
        return provider.generateResponse(messages);
    }
}
exports.AIService = AIService;
