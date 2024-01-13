// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { randomWait } from "../utils";
import { recipes } from "../data";

type Response = {
  msg: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method !== "POST") {
    res.status(405).json({
      msg: "Only POST requests allowed",
    });
  }

  const servings = Number(req.query.servings);
  const id = Number(req.query.id);

  if (Number.isNaN(id)) {
    res.status(400).json({
      msg: "Invalid id",
    });
  }

  if (Number.isNaN(servings)) {
    res.status(400).json({
      msg: "Servings should be valid number",
    });
  }

  await randomWait();

  try {
    const index = recipes.findIndex((r) => r.id === id);

    if (index !== -1) {
      recipes[index].servings = servings;

      res.status(200).json({
        msg: "Success",
      });
    } else {
      res.status(404).json({
        msg: "Recipe does not exist",
      });
    }
  } catch (e) {
    res.status(500).json({
      msg: "Server error",
    });
  }
}
