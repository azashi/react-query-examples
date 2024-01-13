import { Card } from "@/components/Card";
import { Spinner } from "@/components/Spinner";
import { useInfiniteRecipes } from "./queries";
import { useEffect, useMemo, useRef } from "react";

export default function QueryPage() {
  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteRecipes();

  const ref = useRef<HTMLDivElement>(null);

  const recipes = useMemo(() => {
    if (data) {
      return data.pages.flatMap((page) => page.recipes);
    } else {
      return [];
    }
  }, [data]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const element = entries[0];

      fetchNextPage();
    });

    ref.current && observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref.current, fetchNextPage]);

  return (
    <main className="font-mono p-8 flex flex-col h-screen gap-6">
      <h1 className="text-3xl font-semibold">Infinite List Query Example</h1>
      <h2 className="text-2xl font-semibold">Recipes List</h2>

      {/* <div className="flex gap-4 items-center">
        <button
          className="border-2 px-2 py-1 hover:bg-slate-100"
          disabled={isLoading}
          onClick={() => fetchNextPage()}
        >
          Next
        </button>
      </div> */}

      <div className="grid grid-cols-2 gap-8">
        {recipes.map((recipe) => {
          return (
            <a href={"/mutation/" + recipe.id} key={"" + recipe.id}>
              <Card recipe={recipe} />
            </a>
          );
        })}
        <div ref={ref} className="h-10" />
        {(isFetchingNextPage || isLoading) && <Spinner />}
      </div>
    </main>
  );
}

/**
 * 
 * <FlatList
    data={DATA}
    renderItem={renderItem}
    keyExtractor={item => item.id}
    ListEmptyComponent = <Component>
    onEndReached = <Component>
    onEndReachedThreshold =  
    />
 */
