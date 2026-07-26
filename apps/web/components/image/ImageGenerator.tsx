"use client";

import { useEffect, useState } from "react";
import imageService from "@/services/image.service";
import { useImageStore } from "@/store/image.store";
import {
  ImageIcon,
  Loader2,
  Download,
  Trash2,
  Copy,
} from "lucide-react";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState<
    "1024x1024" | "1024x1536" | "1536x1024"
  >("1024x1024");

  const {
    images,
    generating,
    setGenerating,
    setImages,
    addImage,
    deleteImage,
  } = useImageStore();

  useEffect(() => {
    loadImages();
  }, []);

  async function loadImages() {
    try {
      const history = await imageService.history();
      setImages(history);
    } catch (err) {
      console.error(err);
    }
  }

  async function generateImage() {
    if (!prompt.trim()) return;

    try {
      setGenerating(true);

      const image = await imageService.generate(
        prompt,
        size,
        "high"
      );

      addImage(image);

      setPrompt("");
    } catch (err) {
      console.error(err);
      alert("Failed to generate image.");
    } finally {
      setGenerating(false);
    }
  }

  async function remove(id: string) {
    try {
      await imageService.delete(id);
      deleteImage(id);
    } catch (err) {
      console.error(err);
    }
  }

  function download(url: string) {
    const a = document.createElement("a");
    a.href = url;
    a.download = "pascal-ai-image.png";
    a.click();
  }

  async function copy(url: string) {
    await navigator.clipboard.writeText(url);
    alert("Image URL copied");
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-8">

      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-white">
          AI Image Generator
        </h1>

        <p className="mt-2 text-slate-400">
          Generate beautiful AI images using PascalAI.
        </p>
      </div>

      {/* Prompt */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

        <textarea
          value={prompt}
          onChange={(e) =>
            setPrompt(e.target.value)
          }
          rows={5}
          placeholder="Describe the image you want..."
          className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none"
        />

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">

          <select
            value={size}
            onChange={(e) =>
              setSize(
                e.target.value as
                  | "1024x1024"
                  | "1024x1536"
                  | "1536x1024"
              )
            }
            className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          >
            <option value="1024x1024">
              Square
            </option>

            <option value="1024x1536">
              Portrait
            </option>

            <option value="1536x1024">
              Landscape
            </option>

          </select>

          <button
            disabled={generating}
            onClick={generateImage}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            {generating ? (
              <>
                <Loader2
                  className="animate-spin"
                  size={18}
                />
                Generating...
              </>
            ) : (
              <>
                <ImageIcon size={18} />
                Generate Image
              </>
            )}
          </button>

        </div>

      </div>

      {/* Gallery */}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {images.map((image) => (

          <div
            key={image._id}
            className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
          >

            <img
              src={image.imageUrl}
              alt={image.prompt}
              className="aspect-square w-full object-cover"
            />

            <div className="space-y-4 p-5">

              <div>

                <p className="line-clamp-2 font-medium text-white">
                  {image.prompt}
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  {new Date(
                    image.createdAt
                  ).toLocaleString()}
                </p>

              </div>

              <div className="flex gap-2">

                <button
                  onClick={() =>
                    download(image.imageUrl)
                  }
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white"
                >
                  <Download size={16} />
                  Download
                </button>

                <button
                  onClick={() =>
                    copy(image.imageUrl)
                  }
                  className="rounded-lg bg-slate-800 p-2 text-white"
                >
                  <Copy size={18} />
                </button>

                <button
                  onClick={() =>
                    remove(image._id)
                  }
                  className="rounded-lg bg-red-600 p-2 text-white"
                >
                  <Trash2 size={18} />
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

      {!generating && images.length === 0 && (

        <div className="rounded-2xl border border-dashed border-slate-700 py-20 text-center">

          <ImageIcon
            className="mx-auto mb-4 text-slate-500"
            size={60}
          />

          <h2 className="text-xl font-semibold text-white">
            No Images Yet
          </h2>

          <p className="mt-2 text-slate-500">
            Your generated images will appear here.
          </p>

        </div>

      )}

    </div>
  );
}
