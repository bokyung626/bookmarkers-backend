import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export class RegisterDTO {
  nickname: string;
  email: string;
  password: string;
  profileImage: string;

  constructor(props: {
    nickname: string;
    email: string;
    password: string;
    profileImage: string;
  }) {
    this.nickname = props.nickname;
    this.email = props.email;
    this.password = props.password;
    this.profileImage =
      props.profileImage ??
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  }

  async hashPassword() {
    const hashedpassword = await bcrypt.hash(
      this.password,
      Number(process.env.PASSWORD_SALT)
    );

    return hashedpassword;
  }
}
