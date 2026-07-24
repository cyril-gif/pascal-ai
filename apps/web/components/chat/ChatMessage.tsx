"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Copy } from "lucide-react";
import { useState } from "react";


interface Props {
  role: "user" | "assistant";
  content: string;
}


export default function ChatMessage({
  role,
  content,
}: Props) {

  const isAI = role === "assistant";


  return (
    <div
      className={`flex w-full gap-4 px-6 py-5 ${
        isAI
          ? "bg-slate-900"
          : "bg-slate-950"
      }`}
    >

      {/* Avatar */}

      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
          isAI
            ? "bg-blue-600 text-white"
            : "bg-slate-700 text-white"
        }`}
      >
        {isAI ? "AI" : "U"}
      </div>


      {/* Message */}

      <div className="max-w-3xl text-slate-200">

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}

          components={{

            code({
              inline,
              className,
              children,
              ...props
            }) {

              const match =
                /language-(\w+)/.exec(
                  className || ""
                );


              if (!inline && match) {

                return (
                  <CodeBlock
                    language={match[1]}
                  >
                    {String(children)}
                  </CodeBlock>
                );
              }


              return (
                <code
                  className="rounded bg-slate-800 px-1 py-0.5"
                  {...props}
                >
                  {children}
                </code>
              );
            },


            p({children}) {
              return (
                <p className="mb-3 leading-7">
                  {children}
                </p>
              );
            },

          }}

        >
          {content}
        </ReactMarkdown>

      </div>

    </div>
  );
}



function CodeBlock({
  language,
  children,
}:{
  language:string;
  children:string;
}) {


const [copied,setCopied]=useState(false);


async function copy(){

 await navigator.clipboard.writeText(
   children
 );

 setCopied(true);

 setTimeout(
  ()=>setCopied(false),
  1500
 );
}


return (

<div className="my-4 overflow-hidden rounded-xl border border-slate-700">

<div className="flex items-center justify-between bg-slate-800 px-4 py-2 text-xs text-slate-300">

<span>
{language}
</span>


<button
onClick={copy}
className="flex items-center gap-2"
>

<Copy size={14}/>

{
copied
? "Copied"
: "Copy"
}

</button>


</div>


<SyntaxHighlighter
language={language}
>
{children}
</SyntaxHighlighter>


</div>

);

}