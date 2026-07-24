import {
  Bot,
  FileText,
  Code2,
  Image,
  Brain,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Chat",
    description:
      "Fast conversations powered by Groq, OpenAI, Gemini and Claude.",
  },
  {
    icon: FileText,
    title: "Documents",
    description:
      "Upload PDFs, Word and Excel files and chat with them.",
  },
  {
    icon: Code2,
    title: "Code Assistant",
    description:
      "Generate, explain and debug code instantly.",
  },
  {
    icon: Image,
    title: "Image Generation",
    description:
      "Create beautiful AI images from simple prompts.",
  },
  {
    icon: Brain,
    title: "AI Agents",
    description:
      "Personal assistants for business, coding and research.",
  },
  {
    icon: Shield,
    title: "Secure",
    description:
      "JWT authentication and enterprise-grade security.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-slate-900 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="mb-14 text-center text-4xl font-bold text-white">
          Everything You Need
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-800 bg-slate-950 p-8"
            >
              <feature.icon className="mb-5 h-12 w-12 text-blue-500" />

              <h3 className="mb-3 text-2xl font-semibold text-white">
                {feature.title}
              </h3>

              <p className="text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}