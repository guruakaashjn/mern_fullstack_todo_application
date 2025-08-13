import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/requests";
import * as errorHandler from "../middlewares/errorHandler";
import jwtTokenRepository from "../repository/impl/jwtToken";
import jwt from "jsonwebtoken";

export const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // get the token from teh header if present

  let token: string | undefined = req.headers.authorization as
    | string
    | undefined;

  // if no token found, throw error (without going to the next middleware)
  if (!token) throw new errorHandler.Unauthorized("Unauthorized");

  try {
    // check token verification, expiry and decode to get the token claims.
    let { jwtToken, tokenClaims } = await tokenDecode(token);

    console.log(jwtToken);

    // check token is blacklisted or its whitelisted.
    let isTokenBlackListed = await checkIsTokenBlackListed(jwtToken);
    if (!isTokenBlackListed) {
      throw new errorHandler.Unauthorized("Token Expired or Blacklisted");
    }

    req.user = tokenClaims;

    next();
  } catch (err: any) {
    throw new errorHandler.Unauthorized("Token Expired or Blacklisted");
  }
};

export const checkIsTokenBlackListed = async (token) => {
  try {
    const getTokenObject = await jwtTokenRepository.getTokenObject({
      token: token,
    });
    if (getTokenObject != null && getTokenObject.isValid) {
      // white listed token
      return true;
    }

    // black listed token
    return false;
  } catch (err: any) {
    console.log(err);
    throw new errorHandler.Unauthorized(
      "Error occured inside checkIsTokenBlackListed"
    );
  }
};

export const tokenDecode = async (token) => {
  try {
    if (token.includes("Bearer")) {
      token = token.split(" ")[1];
    }

    // if verification is successful, set req.user and pass to next middleware
    const tokenClaims = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

    return { jwtToken: token, tokenClaims: tokenClaims };
  } catch (err: any) {
    throw new errorHandler.Unauthorized("Invalid Token");
  }
};
