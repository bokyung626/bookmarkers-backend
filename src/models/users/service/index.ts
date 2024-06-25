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

  async checkUserByNickname(nickname: string) {
    const user = database.user.findUnique({
      where: {
        nickname,
      },
    });

    if (!user) return false;
    return user;
  }

  async findUserById(id: string) {
    const user = await database.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw { status: 404, message: "유저를 찾을 수 없습니다." };

    return user;
  }

  async findIdByNickname(nickname: string) {
    const user = await database.user.findUnique({
      where: {
        nickname,
      },
      select: {
        id: true,
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
        profileImage: props.profileImage,
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
