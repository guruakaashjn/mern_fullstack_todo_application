import jwtToken from "../../model/jwtToken";
import { JwtTokenRepositoryInterface } from "../jwtToken";

class JwtTokenRepository implements JwtTokenRepositoryInterface {
  async createJwtToken(body: any) {
    const newJwtTokenObject = await jwtToken.create(body);
    return newJwtTokenObject;
  }

  async updateJwtToken(filter: any, body: any) {
    const updateJwtTokenObject = await jwtToken.findOneAndUpdate(filter, body, {
      new: true,
    });
    return updateJwtTokenObject;
  }

  async getTokenObject(filter: any) {
    const getJwtTokenObject = await jwtToken.findOne(filter);
    return getJwtTokenObject;
  }
}

const jwtTokenRepository = new JwtTokenRepository();
export default jwtTokenRepository;
