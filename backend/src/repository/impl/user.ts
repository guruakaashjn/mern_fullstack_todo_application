import userModel from "../../model/userModel";
import { UserRepositoryInterface } from "../user";

class UserRepository implements UserRepositoryInterface {
  async createUser(body: any) {
    const newUser = await userModel.create(body);
    return newUser;
  }
  async getUserById(userId: any) {
    const getUser = await userModel.findById(userId);
    return getUser;
  }
  async getUser(filter: any) {
    const getUser = await userModel.findOne(filter).lean();
    return getUser;
  }
}
