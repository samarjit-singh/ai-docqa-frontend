"use client";

import { useState, type FormEvent } from "react";
import type { QueryResult } from "@/lib/types";
import { Upload, FileUp } from "lucide-react";
import { config } from "@/lib/config";

interface QueryFormProps {
  setResult: (result: QueryResult | null) => void;
  setLoading: (loading: boolean) => void;
}

export default function QueryForm({ setResult, setLoading }: QueryFormProps) {
  const [question, setQuestion] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!question.trim()) {
      setError("Please enter a question");
      return;
    }

    if (!file) {
      setError("Please upload a document");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("question", question);
      formData.append("document", file);

      const response = await fetch(`${config.apiBaseUrl}/query`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch answer");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error submitting query:", error);
      setError("Failed to get an answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block font-bold mb-2 text-lg">Upload Document</label>
        <div
          className={`border-4 border-dashed border-black p-8 rounded-lg text-center cursor-pointer 
            hover:bg-gray-50 transition-colors ${
              file ? "bg-green-100" : "bg-white"
            }`}
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept=".pdf,.txt"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setFile(e.target.files[0]);
              }
            }}
          />

          {file ? (
            <div className="flex flex-col items-center">
              <FileUp className="h-10 w-10 mb-2 text-green-600" />
              <p className="font-bold">{file.name}</p>
              <p className="text-sm text-gray-600 mt-1">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="h-10 w-10 mb-2" />
              <p className="font-bold">
                Drop your document here or click to browse
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Accepts .pdf and .txt files only
              </p>
            </div>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="question" className="block font-bold mb-2 text-lg">
          Your Question
        </label>
        <textarea
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-4 border-4 border-black rounded-lg shadow-brutal-sm focus:outline-none focus:ring-4 focus:ring-yellow-300"
          placeholder="What would you like to know about this document?"
          rows={3}
        />
      </div>

      {error && (
        <div className="bg-red-100 border-4 border-red-500 p-3 rounded-lg">
          <p className="font-bold text-red-600">{error}</p>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-pink-500 text-white font-bold text-xl py-4 px-6 border-4 border-black rounded-lg shadow-brutal hover:bg-pink-600 hover:translate-y-1 hover:shadow-brutal-sm transition-all"
      >
        Ask Question
      </button>
    </form>
  );
}
