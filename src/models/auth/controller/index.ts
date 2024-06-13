import { Router, Request, Response, NextFunction } from "express";
import { AuthService } from "../service";
import { LoginDTO, RegisterDTO } from "../dto";
import { authJWT } from "../../../middleware";

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
    this.router.post("/refresh", this.refresh.bind(this));
    this.router.get("/check", authJWT, this.check.bind(this));
  }

  // 회원가입 API
  async register(req: Request, res: Response, next: NextFunction) {
    const body = await req.body;
    try {
      await this.authService.register(new RegisterDTO(body));

      res.status(200).json({});
    } catch (error) {
      next(error);
    }
  }

  // 로그인 API
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;

      const { userData, accessToken, refreshToken } =
        await this.authService.login(new LoginDTO(body));

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true, // httpOnly 속성 추가
        //secure: true, // https 요청만 받음
        maxAge: 1000 * 60 * 60 * 24 * 14, // 14d
      });

      res.status(200).json({
        userData,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = req.body.accessToken;
      const refreshToken = req.cookies.refreshToken;

      // refresh token이 없는 경우
      if (!refreshToken)
        throw { status: 403, message: "리프레시 토큰이 없습니다." };

      // 새로운 access token 발급
      const newAccessToken = await this.authService.refresh(
        accessToken,
        refreshToken
      );

      res.status(200).json({
        accessToken: newAccessToken,
      });
    } catch (error) {
      next(error);
    }
  }

  async check(req: Request, res: Response, next: NextFunction) {
    // authJWT를 문제없이 거쳤을 경우
    res.status(200).json({
      isAuthenticated: true,
    });
  }
}

const authController = new AuthController();
export default authController;
