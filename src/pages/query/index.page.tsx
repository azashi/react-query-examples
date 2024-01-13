import { Card } from "@/components/Card";
import { Spinner } from "@/components/Spinner";
import { Recipe } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function QueryPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["recipe-list"],
    queryFn: () =>
      fetch("/api/recipes-list").then((d) => d.json() as Promise<ResponseData>),
  });

  return (
    <main className="font-mono p-8 flex flex-col h-screen gap-6">
      <h1 className="text-3xl font-semibold">Query Example</h1>
      <h2 className="text-2xl font-semibold">Recipes List</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-2 gap-8">
          {data?.recipes.map((recipe) => {
            return (
              <a href={"/mutation/" + recipe.id} key={"" + recipe.id}>
                <Card recipe={recipe} />
              </a>
            );
          })}
        </div>
      )}
    </main>
  );
}

type ResponseData = {
  recipes: Recipe[];
};
