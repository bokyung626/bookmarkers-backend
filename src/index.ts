import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import Controllers from "./models";
import { authJWT } from "./middleware";

const app = express();
const PORT = 8000;

// Middleware
app.use(helmet());
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true, limit: "700mb" }));
// app.use(authJWT);

Controllers.forEach((controller) => {
  app.use(controller.path, controller.router);
});
// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript!");
});

// Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "서버에서 에러가 발생했습니다." }); // err.status가 있으면 출력하고 없으면 500으로
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
