"use client";

import { useState } from "react";
import Header from "@/components/header";
import QueryForm from "@/components/query-form";
import ResultDisplay from "@/components/result-display";
import HistoryList from "@/components/history-list";
import type { QueryResult, HistoryItem } from "@/lib/types";
import { config } from "@/lib/config";

export default function Home() {
  const [result, setResult] = useState<QueryResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"query" | "history">("query");

  const fetchHistory = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/history`);
      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  return (
    <main className="min-h-screen bg-yellow-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <Header />

        <div className="bg-white border-4 border-black shadow-brutal rounded-lg mt-8 overflow-hidden">
          <div className="flex border-b-4 border-black">
            <button
              className={`flex-1 p-4 font-bold text-lg ${
                activeTab === "query"
                  ? "bg-pink-400"
                  : "bg-white hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("query")}
            >
              Ask a Question
            </button>
            <button
              className={`flex-1 p-4 font-bold text-lg border-l-4 border-black ${
                activeTab === "history"
                  ? "bg-blue-400"
                  : "bg-white hover:bg-gray-100"
              }`}
              onClick={() => {
                setActiveTab("history");
                fetchHistory();
              }}
            >
              View History
            </button>
          </div>

          <div className="p-6">
            {activeTab === "query" ? (
              <>
                <QueryForm setResult={setResult} setLoading={setLoading} />
                <ResultDisplay result={result} loading={loading} />
              </>
            ) : (
              <HistoryList
                history={history}
                setActiveTab={setActiveTab}
                setResult={setResult}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
