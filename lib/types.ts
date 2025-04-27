export interface QueryResult {
  answer: string;
  question: string;
  filename: string;
}

export interface HistoryItem {
  id: number;
  document: string;
  question: string;
  answer: string;
  createdAt: string;
}
