import userValidation from "../commands/user";
import * as errorHandler from "../middlewares/errorHandler";
import * as userService from "../service/userService";
import { responseHandler } from "../middlewares/responseHandler";

export const createUser = async (req, res, next) => {
  try {
    if (!req?.body?.name || !req?.body?.email || !req?.body?.password) {
      throw new errorHandler.BadRequest(
        `Missing required fields! ${JSON.stringify(req.body)}`
      );
    }

    // field level validations
    const validationSuccess = await userValidation.validateCreateUser(req.body);
    if (!validationSuccess) {
      throw new errorHandler.BadRequest("Field Level Validation Failed");
    }

    const result = await userService.createUser(req.body);
    if (result)
      return responseHandler(result, res, "create user successful", 201);
    else
      throw new errorHandler.BadRequest(
        "Error Creating user please try again later"
      );
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    if (!req?.body?.email || !req?.body?.password) {
      throw new errorHandler.BadRequest("Missing required fields!");
    }

    // field level validations
    const validationSuccess = await userValidation.validateLoginUser(req.body);
    if (!validationSuccess) {
      throw new errorHandler.BadRequest("Field Level Validation Failed");
    }

    const result = await userService.loginUser(req.body);

    let response = {
      name: result.name,
      email: result.email,
    };

    let tokens = {
      isValid: result.isValid,
      token: result.token,
      refreshToken: result.refreshToken,
    };

    let finalResponse = {
      message: "User login successful",
      response,
      tokens,
    };

    if (result) {
      return responseHandler(finalResponse, res, "login user successful", 200);
    } else throw new errorHandler.BadRequest("Missing required fields!");
  } catch (err) {
    next(err);
  }
};

export const signupUser = async (req, res, next) => {
  try {
    if (!req?.body?.name || !req?.body?.email || !req?.body?.password) {
      throw new errorHandler.BadRequest("Missing required fields!");
    }

    // field level validations
    const validationSuccess = await userValidation.validateCreateUser(req.body);
    if (!validationSuccess) {
      throw new errorHandler.BadRequest("Field Level Validation Failed");
    }

    const result = await userService.signupUser(req.body);

    let response = {
      name: result.name,
      email: result.email,
    };

    let tokens = {
      isValid: result.isValid,
      token: result.token,
      refreshToken: result.refreshToken,
    };

    let finalResponse = {
      message: "User signup successful",
      response,
      tokens,
    };

    if (result) {
      return responseHandler(
        finalResponse,
        res,
        "create user/signup user successful",
        201
      );
    } else throw new errorHandler.BadRequest("Missing required fields!");
  } catch (err) {
    next(err);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    if (!req?.body?.email) {
      throw new errorHandler.BadRequest("Missing required fields!");
    }

    // field level validations
    const validationSuccess = await userValidation.validateLogoutUser(req.body);
    if (!validationSuccess) {
      throw new errorHandler.BadRequest("Field Level Validation Failed");
    }

    const result = await userService.logoutUser(req.body);

    const response = {
      name: result.name,
      email: result.email,
    };

    const tokens = {
      isValid: result.isValid,
    };

    const finalResponse = {
      message: "User logout successful",
      response,
      tokens,
    };

    if (result) {
      return responseHandler(finalResponse, res, "logout user successful", 200);
    } else throw new errorHandler.BadRequest("Missing required fields!");
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    let currentRefreshToken = req.body.refreshToken;

    const newTokenObject = await userService.refreshToken(currentRefreshToken);

    if (newTokenObject == null) {
      return responseHandler(
        newTokenObject,
        res,
        "token renewal unsuccessful",
        200
      );
    }

    return responseHandler(
      newTokenObject,
      res,
      "token renewal successful",
      200
    );
  } catch (err) {
    next(err);
  }
};
