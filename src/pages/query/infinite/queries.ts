import { Recipe } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";

type ResponseData = {
  recipes: Recipe[];
  page: number;
  total: number;
  maxPerPage: number;
};

const recipeList = async (page: number) => {
  const result = await fetch("/api/recipes-list?page=" + page);
  return result.json() as Promise<ResponseData>;
};

export const useInfiniteRecipes = () => {
  return useInfiniteQuery({
    queryKey: ["infinite-recipe"],
    queryFn: ({ pageParam }) => recipeList(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const totalRecipesLoaded = lastPage.maxPerPage * lastPage.page;

      return totalRecipesLoaded > lastPage.total
        ? undefined
        : lastPage.page + 1;
    },
  });
};
