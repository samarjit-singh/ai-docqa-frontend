"use client";

import { useState } from "react";
import type { HistoryItem, QueryResult } from "@/lib/types";
import { Clock, ChevronDown, ChevronUp } from "lucide-react";

interface HistoryListProps {
  history: HistoryItem[];
  setActiveTab: (tab: "query" | "history") => void;
  setResult: (result: QueryResult) => void;
}

export default function HistoryList({
  history,
  setActiveTab,
  setResult,
}: HistoryListProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const handleItemClick = (item: HistoryItem) => {
    setResult({
      answer: item.answer,
      question: item.question,
      filename: item.document.slice(0, 20) + "...",
    });
    setActiveTab("query");
  };

  if (history.length === 0) {
    return (
      <div className="py-10 text-center">
        <Clock className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <h3 className="text-xl font-bold mb-2">No history yet</h3>
        <p className="text-gray-600">Your previous queries will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="font-black text-2xl mb-6 inline-block bg-green-300 px-3 py-1 border-4 border-black transform -rotate-1">
        Query History
      </h2>

      <div className="space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="border-4 border-black rounded-lg overflow-hidden bg-white shadow-brutal-sm hover:shadow-brutal transition-all"
          >
            <div
              className="p-4 cursor-pointer flex justify-between items-center"
              onClick={() =>
                setExpandedId(expandedId === item.id ? null : item.id)
              }
            >
              <div className="flex-1">
                <p className="font-bold mb-1">
                  {truncateText(item.question, 100)}
                </p>
                <p className="text-sm text-gray-600">
                  {formatDate(item.createdAt)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleItemClick(item);
                  }}
                  className="bg-blue-400 text-black px-3 py-1 rounded-md border-2 border-black font-bold hover:bg-blue-500 transition-colors"
                >
                  View
                </button>
                {expandedId === item.id ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
            </div>

            {expandedId === item.id && (
              <div className="p-4 border-t-4 border-black bg-gray-50">
                <div className="prose max-w-none">
                  <h4 className="text-lg font-bold mb-2">Answer:</h4>
                  <div className="whitespace-pre-wrap">{item.answer}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
