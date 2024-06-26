import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: object;
      takePage?: number;
      skip?: number;
    }
  }
}
