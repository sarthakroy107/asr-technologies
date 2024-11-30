import { Request, Response } from "express";

export async function getDasboardData(req: Request, res: Response) {
  res.status(200).json({
    help: false,
  })
}