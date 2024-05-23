import { Router, Request, Response, NextFunction } from "express";
import { AuthService } from "../service";
import { LoginDTO, RegisterDTO } from "../dto";

export class AuthController {
  router;
  path = "/auth";
  authService;

  constructor() {
    this.router = Router();
    this.authService = new AuthService();
    this.init();
  }

  init() {
    this.router.post("/login", this.login.bind(this));
    this.router.post("/register", this.register.bind(this));
  }

  // 회원가입 API
  async register(req: Request, res: Response, next: NextFunction) {
    const body = await req.body;
    try {
      const { accessToken, refreshToken } = await this.authService.register(
        new RegisterDTO(body)
      );

      res.status(200).json({
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  }

  // 로그인 API
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;

      const { accessToken, refreshToken } = await this.authService.login(
        new LoginDTO(body)
      );

      // 리퀘스트 헤더에서 토큰 받아옴
      const token = req.cookies.accessToken;

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true, // httpOnly 속성 추가
        //secure: true, // https 요청만 받음
        maxAge: 1000 * 60 * 60 * 24 * 14, // 14d
      });

      res.status(200).json({
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  }
}

const authController = new AuthController();
export default authController;
