import { Request, Response, NextFunction } from "express";

const pagination = (req: Request, res: Response, next: NextFunction) => {
  const page = req.query.page ?? "1";
  const limit = req.query.limit ?? "20";

  const take = Number(limit) || 20;
  const skip = (Number(page) - 1) * take;

  req.takePage = take;
  req.skip = skip;

  next();
};

export default pagination;
