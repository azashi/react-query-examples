// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { randomWait } from "../utils";
import { recipes, Recipe } from "../data";

type Data = {
  recipe: Recipe | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const id = Number(req.query.id);

  let _recipe: Data["recipe"] = null;

  if (!Number.isNaN(id)) {
    _recipe = recipes.find((r) => r.id === id) || null;
  }

  await randomWait();

  res.status(200).json({
    recipe: _recipe,
  });
}
