import { Card } from "@/components/Card";
import { Spinner } from "@/components/Spinner";
import { Recipe } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function MutationPage() {
  const router = useRouter();
  const id = router.query.id;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () =>
      fetch("/api/recipe/" + id).then((d) => d.json() as Promise<ResponseData>),
    enabled: !!id,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (servings: number) =>
      fetch(`/api/update-recipe/${id}?servings=${servings}`, {
        method: "POST",
      }).then((d) => d.json()),
  });

  const recipe = data?.recipe;

  const submitAction = (e: any) => {
    e.preventDefault();
    const value = e.currentTarget["servings"].value;
    mutate(value, {
      onSuccess() {
        refetch();
      },
    });
  };

  return (
    <main className="font-mono p-8 flex flex-col h-screen gap-6">
      <h1 className="text-3xl font-semibold">Mutation Example</h1>
      <h2 className="text-2xl font-semibold">Recipe</h2>
      <div className="grid grid-cols-2">
        {isLoading ? <Spinner /> : !!recipe && <Card recipe={recipe} />}
      </div>
      <br />
      {!isLoading && (
        <>
          <h2 className="text-2xl font-semibold">Update Servings</h2>
          <form className="flex gap-2" onSubmit={submitAction}>
            <button
              className="border-2 px-2 py-1 hover:bg-slate-100"
              disabled={isPending}
              type="submit"
            >
              Update
            </button>
            <input
              name="servings"
              type="number"
              min={0}
              className="border-2 py-1 px-2 w-24"
              required
            />
            {isPending && <Spinner />}
          </form>
        </>
      )}
    </main>
  );
}

type ResponseData = {
  recipe: Recipe;
};
