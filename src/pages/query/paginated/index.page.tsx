import { Card } from "@/components/Card";
import { Spinner } from "@/components/Spinner";
import { useRecipesList } from "./queries";
import { useState } from "react";

export default function QueryPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useRecipesList(page);

  const prevPage = () => setPage((prev) => Math.max(1, --prev));
  const nextPage = () =>
    setPage((prev) => (data?.recipes.length ? ++prev : prev));

  return (
    <main className="font-mono p-8 flex flex-col h-screen gap-6">
      <h1 className="text-3xl font-semibold">Paginated Query Example</h1>
      <h2 className="text-2xl font-semibold">Recipes List</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex gap-4 items-center">
            <button
              className="border-2 px-2 py-1 hover:bg-slate-100"
              disabled={isLoading}
              onClick={prevPage}
            >
              Prev
            </button>
            <span>{page}</span>
            <button
              className="border-2 px-2 py-1 hover:bg-slate-100"
              disabled={isLoading}
              onClick={nextPage}
            >
              Next
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {data?.recipes.map((recipe) => {
              return (
                <a href={"/mutation/" + recipe.id} key={"" + recipe.id}>
                  <Card recipe={recipe} />
                </a>
              );
            })}
          </div>
        </>
      )}
    </main>
  );
}
