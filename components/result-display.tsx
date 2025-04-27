"use client";

import { useEffect, useState } from "react";
import type { QueryResult } from "@/lib/types";
import { Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ResultDisplayProps {
  result: QueryResult | null;
  loading: boolean;
}

export default function ResultDisplay({ result, loading }: ResultDisplayProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (result) {
      setVisible(true);
    }
  }, [result]);

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
            <Loader2 className="h-10 w-10 animate-spin mb-4" />
            <p className="text-lg font-bold">Analyzing document...</p>
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
