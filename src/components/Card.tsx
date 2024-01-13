import { Recipe } from "@/types";

export const Card: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  return (
    <div className="flex overflow-hidden rounded-md gap-4 border-2">
      <img alt={recipe.name} src={recipe.image} className="w-44 h-44" />
      <div className="p-2 flex flex-col gap-2">
        <h3 className="font-medium text-2xl">{recipe.name}</h3>
        <p>Ingredients: {recipe.ingredients.slice(0, 5).join(", ")}</p>
        <div className="flex mt-auto gap-4 justify-between pr-4 items-center">
          <span className="px-2 py-1 bg-violet-400 rounded-md text-yellow-50">
            Servings: {recipe.servings}
          </span>
        </div>
      </div>
    </div>
  );
};
