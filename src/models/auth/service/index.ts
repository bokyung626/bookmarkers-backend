import database from "../../../database";
import { CreateUserDTO } from "../../users/dto";
import { UserService } from "../../users/service";
import { LoginDTO, RegisterDTO } from "../dto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class AuthService {
  userService;

  constructor() {
    this.userService = new UserService();
  }

  async register(props: RegisterDTO) {
    const isExist = await this.userService.checkUserByEmail(props.email);

    if (isExist) throw { status: 400, message: "이미 존재하는 이메일 입니다." };

    const newUserId = await this.userService.createUser(
      new CreateUserDTO({
        ...props,
        password: await props.hashPassword(),
      })
    );

    const accessToken = jwt.sign({ id: newUserId }, process.env.JWT_KEY!, {
      expiresIn: "2h",
    });

    // Refresh Token
    const refreshToken = jwt.sign({ id: newUserId }, process.env.JWT_KEY!, {
      expiresIn: "14d",
    });

    console.log("Tokens : ", accessToken, refreshToken);

    return { accessToken, refreshToken };
  }

  async login(props: LoginDTO) {
    const user = await this.userService.checkUserByEmail(props.email);
    if (!user) throw { status: 404, message: "가입되지 않은 사용자 입니다." };

    //패스워드 비교
    const isCorrect = await props.comparePassword(user.password);
    if (!isCorrect) throw { status: 404, message: "잘못된 패스워드 입니다." };

    //토큰 발급
    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_KEY!, {
      expiresIn: "2h",
    });

    // Refresh Token
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_KEY!, {
      expiresIn: "14d",
    });

    console.log("Tokens : ", accessToken, refreshToken);

    return { accessToken, refreshToken };
  }
}
