import todoEntryValidation from "../commands/todoEntry";
import * as erorrHandler from "../middlewares/errorHandler";
import { responseHandler } from "../middlewares/responseHandler";
import * as todoEntryService from "../service/todoService";

export const createToDoEntry = async (req, res, next) => {
  try {
    if (!req?.body?.name || !req?.body?.description || !req?.body?.status) {
      throw new erorrHandler.BadRequest("Missing required fields!");
    }

    // field level validations
    const validationSuccess = await todoEntryValidation.validateCreateTodoEntry(
      req.body
    );
    if (!validationSuccess) {
      throw new erorrHandler.BadRequest("Field Level Validation Failed");
    }

    const result = await todoEntryService.createToDoEntry(req.body);
    return responseHandler(result, res, "create todo entry successful", 201);
  } catch (err) {
    next(err);
  }
};

export const editToDoEntry = async (req, res, next) => {
  try {
    // field level validations
    const validationSuccess = await todoEntryValidation.validateEditTodoEntry(
      req.body,
      req.params
    );
    if (!validationSuccess) {
      throw new erorrHandler.BadRequest("Field Level Validation Failed");
    }

    const result = await todoEntryService.editToDoEntry(
      req.params.id,
      req.body
    );
    return responseHandler(result, res, "update todo entry successful", 200);
  } catch (err) {
    next(err);
  }
};

export const deleteToDoEntry = async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new erorrHandler.BadRequest("Missing required fields!");
    }

    // field level validations
    const validationSuccess = await todoEntryValidation.validateDeleteTodoEntry(
      req.params
    );
    if (!validationSuccess) {
      throw new erorrHandler.BadRequest("Field Level Validation Failed");
    }

    const result = await todoEntryService.deleteToDoEntry(req.params.id);
    return responseHandler(result, res, "delete todo entry successful", 204);
  } catch (err) {
    next(err);
  }
};

export const getAllToDoEntries = async (req, res, next) => {
  try {
    const result = await todoEntryService.getAllToDoEntries();

    return responseHandler(result, res, "get all todo entries successful", 200);
  } catch (err) {
    next(err);
  }
};

export const getToDoEntry = async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new erorrHandler.BadRequest("Missing required fields!");
    }

    // field level validations
    const validationSuccess = await todoEntryValidation.validateGetTodoEntry(
      req.params
    );
    if (!validationSuccess) {
      throw new erorrHandler.BadRequest("Field Level Validation Failed");
    }

    const result = await todoEntryService.getToDoEntry(req.params.id);
    return responseHandler(result, res, "get todo entry successful", 200);
  } catch (err) {
    next(err);
  }
};

export const enableStatusById = async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new erorrHandler.BadRequest("Missing required fields!");
    }

    // field level validations
    const validationSuccess =
      await todoEntryValidation.validateEnableDisableTodoEntry(
        req.body,
        req.params
      );
    if (!validationSuccess) {
      throw new erorrHandler.BadRequest("Field Level Validation Failed");
    }

    const result = await todoEntryService.editToDoEntry(
      req.params.id,
      req.body
    );

    return responseHandler(
      result,
      res,
      "enable/disable todo entry by id successful",
      200
    );
  } catch (err) {
    next(err);
  }
};
