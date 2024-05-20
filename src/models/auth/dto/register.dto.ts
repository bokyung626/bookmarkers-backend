import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export class RegisterDTO {
  nickname: string;
  email: string;
  password: string;
  profileUrl: string;

  constructor(props: {
    nickname: string;
    email: string;
    password: string;
    profileUrl: string;
  }) {
    this.nickname = props.nickname;
    this.email = props.email;
    this.password = props.password;
    this.profileUrl = props.profileUrl ?? undefined;
  }

  async hashPassword() {
    const hashedpassword = await bcrypt.hash(
      this.password,
      Number(process.env.PASSWORD_SALT)
    );

    return hashedpassword;
  }
}
