"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processUploadedFile = processUploadedFile;
// services/file-processing.service.ts
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const pdfParse = require("pdf-parse");
const mammoth_1 = __importDefault(require("mammoth"));
async function processUploadedFile(file) {
    const isImage = file.mimetype.startsWith("image/");
    // Upload to Cloudinary (works for both images and raw documents)
    const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary_1.default.uploader.upload_stream({
            resource_type: isImage ? "image" : "raw",
            folder: "pascal-ai-uploads",
        }, (error, result) => {
            if (error)
                reject(error);
            else
                resolve(result);
        });
        stream.end(file.buffer);
    });
    if (isImage) {
        return {
            url: uploadResult.secure_url,
            type: "image",
            name: file.originalname,
            mimeType: file.mimetype,
        };
    }
    // Document — extract text
    let extractedText = "";
    if (file.mimetype === "application/pdf") {
        const parsed = await pdfParse(file.buffer);
        extractedText = parsed.text;
    }
    else if (file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        const result = await mammoth_1.default.extractRawText({ buffer: file.buffer });
        extractedText = result.value;
    }
    else if (file.mimetype === "text/plain") {
        extractedText = file.buffer.toString("utf-8");
    }
    // Cap extracted text so it doesn't blow the context window
    const MAX_DOC_CHARS = 8000;
    if (extractedText.length > MAX_DOC_CHARS) {
        extractedText =
            extractedText.slice(0, MAX_DOC_CHARS) +
                "\n...[document truncated for length]";
    }
    return {
        url: uploadResult.secure_url,
        type: "document",
        name: file.originalname,
        mimeType: file.mimetype,
        extractedText,
    };
}
