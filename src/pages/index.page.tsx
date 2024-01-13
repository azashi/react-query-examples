export default function Home() {
  return (
    <main className="p-8 flex flex-col items-center justify-center h-[80vh] gap-8">
      <h1 className="font-mono text-5xl font-semibold">
        Manage async state gracefully <br /> with React-Query
      </h1>

      <div className="flex gap-4">
        <a
          href="/query"
          className="px-3 py-2 rounded-md bg-slate-400 text-white text-xl"
        >
          Query
        </a>
        <a
          href="/mutation/1"
          className="px-3 py-2 rounded-md bg-slate-400 text-white text-xl"
        >
          Mutation
        </a>
        <a
          href="/query/paginated"
          className="px-3 py-2 rounded-md bg-slate-400 text-white text-xl"
        >
          Paginated Query
        </a>
        <a
          href="/query/infinite"
          className="px-3 py-2 rounded-md bg-slate-400 text-white text-xl"
        >
          Infinite Query
        </a>
      </div>
    </main>
  );
}
