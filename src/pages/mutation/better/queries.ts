import { Recipe } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type ResponseData = {
  recipe: Recipe;
};

const getRecipe = async (id?: number) => {
  const result = await fetch("/api/recipe/" + id);
  return result.json() as Promise<ResponseData>;
};

const recipeQK = (id?: number) => ["recipe", id];

export const useRecipeQuery = (id?: number) => {
  return useQuery({
    queryKey: recipeQK(id),
    queryFn: () => getRecipe(id),
    enabled: !!id,
  });
};

const updateServings = async ({
  id,
  servings,
}: {
  id: number;
  servings: number;
}) => {
  const result = await fetch(`/api/update-recipe/${id}?servings=${servings}`, {
    method: "POST",
  });
  return result.json();
};

export const useRecipeMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: updateServings,
    onSuccess(_, variables) {
      qc.invalidateQueries({ queryKey: recipeQK(variables.id) });
    },
  });
};
