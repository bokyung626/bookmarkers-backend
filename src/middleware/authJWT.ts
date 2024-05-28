import { Request, NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import database from "../database";

interface DecodedToken {
  id: string;
  email: string;
  nickname: string;
  password: string;
  profileUrl: string | null;
}

export const authJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const headers = req.headers;

    // Brearer ${token} or undefined
    const authorization = headers.authorization;

    if (
      authorization &&
      typeof authorization === "string" &&
      authorization.includes("Bearer ")
    ) {
      const bearerToken = authorization.split(" ")[1];

      // jwt 토큰이 만료될 경우 에러 핸들러로 넘어간다.
      const decodedToken = jwt.verify(
        bearerToken,
        process.env.JWT_KEY!
      ) as DecodedToken;

      const user = await database.user.findUnique({
        where: {
          id: decodedToken.id,
        },
      });

      if (user) {
        req.user = user;
        next(); // 미들웨어를 통과해 다음 단계로 넘어감
      } else {
        //  DB에 해당 userId를 가진 user가 존재하지 않는 경우
        next({ status: 404, message: "유저를 찾을 수 없습니다." });
      }
    } else {
      // authorization이 존재하지 않는 경우
      // bearer에 문제가 있는 경우
      next({
        status: 401,
        message:
          "유효하지 않은 사용자 입니다. 로그인을 진행하거나 토큰을 재발급 받아주세요.",
      });
    }
  } catch (error: any) {
    next({ ...error, status: 403 });
  }
};
