// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { randomWait } from "../utils";
import { recipes, Recipe } from "../data";

type Data = {
  recipes: Recipe[];
  page: number;
  total: number;
  maxPerPage: number;
};

const PER_PAGE = 10;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const _page = Math.max(Number(req.query.page) || 1, 1);

  const servings_gt = Number(req.query["servings-gt"]);
  const servings_lt = Number(req.query["servings-lt"]);

  const start = (_page - 1) * PER_PAGE;
  const end = start + PER_PAGE;

  let _recipes = recipes;

  if (!Number.isNaN(servings_gt)) {
    _recipes = _recipes.filter((r) => r.servings > servings_gt);
  }

  if (!Number.isNaN(servings_lt)) {
    _recipes = _recipes.filter((r) => r.servings < servings_lt);
  }

  const TOTAL = _recipes.length;

  _recipes = _recipes.slice(start, end);

  await randomWait();

  res.status(200).json({
    recipes: _recipes,
    page: _page,
    total: TOTAL,
    maxPerPage: PER_PAGE,
  });
}
