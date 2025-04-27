"use client";

import { useEffect, useState } from "react";
import type { QueryResult } from "@/lib/types";
import ReactMarkdown from "react-markdown";

function ThinkingText() {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = [
    "Reading the document...",
    "Processing your question...",
    "Connecting the dots...",
    "Finding relevant information...",
    "Crafting a response...",
    "Almost there...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <h3 className="text-xl font-black mb-4 text-center">
      {messages[messageIndex]}
    </h3>
  );
}

interface ResultDisplayProps {
  result: QueryResult | null;
  loading: boolean;
}

export default function ResultDisplay({ result, loading }: ResultDisplayProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (loading || result) {
      setVisible(true);
    }
  }, [loading, result]);

  if (!result && !loading) return null;

  return (
    <div
      className={`mt-8 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <h2 className="font-black text-2xl mb-4 inline-block bg-blue-300 px-3 py-1 border-4 border-black transform rotate-1">
        Answer
      </h2>

      <div className="bg-white border-4 border-black p-6 rounded-lg shadow-brutal">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="relative mb-6">
              <div className="w-16 h-16 border-8 border-black rounded-full"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-t-8 border-pink-500 rounded-full animate-spin"></div>
              <div className="absolute top-4 left-4 w-8 h-8 bg-yellow-300 border-4 border-black rounded-full animate-pulse"></div>
            </div>

            <ThinkingText />

            <div className="mt-4 px-6 py-3 bg-blue-300 border-4 border-black transform -rotate-1 shadow-brutal-sm">
              <p className="text-sm font-bold">Analyzing your document...</p>
            </div>
          </div>
        ) : result ? (
          <div className="prose max-w-none">
            <ReactMarkdown>{result.answer}</ReactMarkdown>
            <div className="mt-4 pt-4 border-t-2 border-gray-200 text-sm text-gray-600">
              <p>
                <span className="font-bold">Question:</span> {result.question}
              </p>
              <p>
                <span className="font-bold">Document:</span> {result.filename}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
