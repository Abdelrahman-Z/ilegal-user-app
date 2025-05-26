'use client';
import { Accordion, AccordionItem } from "@heroui/react";
import Markdown from "markdown-to-jsx";
import { useEffect, useState } from "react";



type PhaseContentRendererProps = {
  content: string;
  phase: "think" | "answer";
};


export function PhaseContentRenderer({ content, phase }: PhaseContentRendererProps) {
  const [displayContent, setDisplayContent] = useState("");

  useEffect(() => {
    setDisplayContent(content);
  }, [content]);

  if (phase === "think") {
    return (
      <Accordion>
        <AccordionItem
          key="thinking"
          aria-label="Thinking content"
          title="🧠 التفكير"
        >
          <div className="p-4 text-blue-900 max-h-72 overflow-auto">
            <Markdown>{displayContent}</Markdown>
          </div>
        </AccordionItem>
      </Accordion>
    );
  }

  if (phase === "answer") {
    return (
        <Markdown className="mt-5 whitespace-pre-wrap prose prose-slate max-w-none">{displayContent}</Markdown>
    );
  }

  return null;
}
