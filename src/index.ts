import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import Controllers from "./models";
import { authJWT } from "./middleware";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 8000;
const originUrl = "http://localhost:3000";

const corsOptions = {
  origin: "http://localhost:3000", // 클라이언트 도메인 명시
  credentials: true, // 자격 증명(쿠키) 허용
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Middleware
app.use(helmet());
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "700mb" }));
// app.use(authJWT);

Controllers.forEach((controller) => {
  app.use("/api" + controller.path, controller.router);
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
