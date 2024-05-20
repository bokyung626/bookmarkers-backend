//import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import database from "../../../database";
import { CreateUserDTO, UserDTO } from "../dto";

export class UserService {
  async checkUserByEmail(email: string) {
    const user = database.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return false;
    return user;
  }

  async createUser(props: CreateUserDTO) {
    const newUser = await database.user.create({
      data: {
        email: props.email,
        nickname: props.nickname,
        password: props.password,
      },
    });
    // 새로운 유저의 id 반환
    return newUser.id;
  }

  async deleteUser(id: string) {
    await database.user.delete({
      where: {
        id,
      },
    });
  }
}
