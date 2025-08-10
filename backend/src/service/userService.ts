import userRepository from "../repository/impl/user";
import * as errorHandler from "../middlewares/errorHandler";
import * as Crypto from "crypto";
import jwt from "jsonwebtoken";
import jwtTokenRepository from "../repository/impl/jwtToken";

export const createUser = async (body) => {
  try {
    const existingUser = await userRepository.getUser({ email: body.email });
    if (existingUser) throw new errorHandler.BadRequest("User Already Exists");

    body.passwordSalt = Crypto.randomBytes(16).toString("hex");
    body.password = Crypto.pbkdf2Sync(
      body.password,
      body.passwordSalt,
      1000,
      64,
      `sha512`
    ).toString(`hex`);

    const newUser = await userRepository.createUser(body);
    console.log("Completed");
    return newUser;
  } catch (err) {
    console.log("error occured in create user --> ", err);
    throw new Error(err);
  }
};

export const loginUser = async (body) => {
  try {
    const existingUser = await userRepository.getUser({ email: body.email });
    if (!existingUser) throw new errorHandler.BadRequest("User does not exist");

    const currentPasswordHash = Crypto.pbkdf2Sync(
      body.password,
      existingUser.passwordSalt,
      1000,
      64,
      `sha512`
    ).toString(`hex`);

    console.log(currentPasswordHash, "----", existingUser.password);
    if (existingUser.password !== currentPasswordHash) {
      throw new errorHandler.BadRequest(
        "please check your credentials and try again!"
      );
    }

    const token = jwt.sign(
      {
        _id: existingUser._id,
        email: existingUser.email,
        name: existingUser.name,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    const refreshToken = jwt.sign(
      {
        _id: existingUser._id,
        email: existingUser.email,
        name: existingUser.name,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );

    const newTokensObject = await jwtTokenRepository.updateJwtToken(
      { userEmail: existingUser.email },
      {
        userEmail: existingUser.email,
        token: token,
        refreshToken: refreshToken,
        isValid: true,
      }
    );

    let response = {
      name: existingUser.name,
      email: existingUser.email,
      token: token,
      refreshToken: refreshToken,
      isValid: newTokensObject.isValid,
    };

    return response;
  } catch (err) {
    console.log("error occured in login user -->", err);
    throw new Error(err);
  }
};

export const signupUser = async (body) => {
  try {
    const existingUser = await userRepository.getUser({ email: body.email });
    if (existingUser) throw new errorHandler.BadRequest("User already exists");

    body.passwordSalt = Crypto.randomBytes(16).toString(`hex`);
    body.password = Crypto.pbkdf2Sync(
      body.password,
      body.passwordSalt,
      1000,
      64,
      `sha512`
    ).toString(`hex`);

    const newUser = await userRepository.createUser(body);

    const token = jwt.sign(
      { _id: newUser._id, email: newUser.email, name: newUser.name },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { _id: newUser._id, email: newUser.email, name: newUser.name },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );

    // add token entry to the DB for future token/refresh token validations.
    const newTokensObject = await jwtTokenRepository.createJwtToken({
      userEmail: newUser.email,
      token: token,
      refreshToken: refreshToken,
      isValid: true,
    });

    let response = {
      name: newUser.name,
      email: newUser.email,
      token: token,
      refreshToken: refreshToken,
      isValid: newTokensObject.isValid,
    };

    return response;
  } catch (err) {
    console.log("error occured in signup user -->", err);
    throw new Error(err);
  }
};

export const logoutUser = async (body) => {
  try {
    const existingUser = await userRepository.getUser({ email: body.email });
    if (!existingUser) throw new errorHandler.BadRequest("User does not exist");

    const updatedTokenObject = await jwtTokenRepository.updateJwtToken(
      { userEmail: existingUser.email },
      {
        userEmail: existingUser.email,
        isValid: false,
      }
    );

    const response = {
      name: existingUser.name,
      email: existingUser.email,
      msg: "logout successful",
      isValid: updatedTokenObject.isValid,
    };

    return response;
  } catch (err) {
    console.log("error occured in logout user -->", err);
    throw new Error(err);
  }
};

export const refreshToken = async (refreshToken) => {
  try {
    const getTokenObject = await jwtTokenRepository.getTokenObject({
      refreshToken: refreshToken,
    });

    if (getTokenObject != null && getTokenObject.isValid) {
      // token is valid
      const tokenClaims = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET_KEY as string
      );

      const rawTokenClaimsTemp = JSON.parse(JSON.stringify(tokenClaims));
      const rawTokenClaims = {
        _id: rawTokenClaimsTemp._id,
        name: rawTokenClaimsTemp.name,
        email: rawTokenClaimsTemp.email,
      };

      const newToken = jwt.sign(rawTokenClaims, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });

      const newRefreshToken = jwt.sign(
        rawTokenClaims,
        process.env.JWT_SECRET_KEY,
        { expiresIn: "24h" }
      );

      const newTokensObject = await jwtTokenRepository.updateJwtToken(
        { userEmail: rawTokenClaims.email },
        {
          token: newToken,
          refreshToken: newRefreshToken,
        }
      );

      return newTokensObject;
    }

    // token in not valid
    return null;
  } catch (err) {
    console.log("error occured in refresh token -->", err);
    throw new Error(err);
  }
};
