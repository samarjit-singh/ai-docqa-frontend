export default function Header() {
  return (
    <header className="pt-6 pb-2">
      <h1 className="text-4xl md:text-5xl font-black tracking-tight">
        <span className="bg-black text-white px-4 py-2 inline-block transform -rotate-1">
          Document
        </span>
        <span className="ml-2 bg-green-400 px-4 py-2 inline-block transform rotate-1 border-4 border-black shadow-brutal">
          Query
        </span>
      </h1>
      <p className="mt-4 text-lg font-bold pl-1">
        Upload a document and ask questions to get AI-powered answers
      </p>
    </header>
  );
}
