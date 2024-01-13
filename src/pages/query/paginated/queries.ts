import { Recipe } from "@/types";
import { useQuery } from "@tanstack/react-query";

type ResponseData = {
  recipes: Recipe[];
};

const recipeList = async (page: number) => {
  const result = await fetch("/api/recipes-list?page=" + page);
  return result.json() as Promise<ResponseData>;
};

export const useRecipesList = (page: number) => {
  return useQuery({
    queryKey: ["recipe-list", page],
    queryFn: () => recipeList(page),
  });
};
