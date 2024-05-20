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
    try {
      const body = await req.body;

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
