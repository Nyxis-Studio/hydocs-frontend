export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-full">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold mb-4">Hytale Server Documentation</h1>
        <p className="text-xl text-gray-500 mb-8">
          Browse the documentation using the sidebar to find class references and guides.
        </p>
        <div className="p-6 bg-muted rounded-lg text-left">
          <h2 className="text-lg font-semibold mb-2">Getting Started</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Explore the API packages in the sidebar.</li>
            <li>Use the search (CMD+K) to find specific classes.</li>
            <li>Check the `INDEX.md` for a high-level overview.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
