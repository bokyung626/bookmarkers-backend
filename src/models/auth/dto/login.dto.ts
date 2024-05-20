import bcrypt from "bcrypt";

export class LoginDTO {
  email: string;
  password: string;

  constructor(props: { email: string; password: string }) {
    this.email = props.email;
    this.password = props.password;
  }

  async comparePassword(password: string) {
    console.log(this.password, password);
    const isCorrect = await bcrypt.compare(this.password, password);
    return isCorrect;
  }
}
