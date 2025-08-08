import { NotFound } from "../middlewares/errorHandler";
import todoEntryRepository from "../repository/impl/todoEntry";

export const createToDoEntry = async (body) => {
  try {
    // create new todo entry in mongoDB
    const newTodoEntry = await todoEntryRepository.createToDoEntry(body);
    if (newTodoEntry === null) {
      throw new Error("unable to create new todo entry");
    }

    console.log("create todo entry service successful");
    return newTodoEntry;
  } catch (err) {
    console.log("error occured in create todo entry -->", err);
    throw new Error(err);
  }
};

export const editToDoEntry = async (todoEntryId, body) => {
  try {
    // validations
    const getTodoEntryById = await todoEntryRepository.getToDoEntry(
      todoEntryId
    );
    if (getTodoEntryById == null) {
      throw new NotFound("todo entry id does not exist");
    }

    // update todo entry in mongoDB
    const updatedTodoEntry = await todoEntryRepository.editToDoEntry(
      todoEntryId,
      body
    );

    console.log("update todo entry service successful");
    return updatedTodoEntry;
  } catch (err) {
    console.log("error occured in edit todo entry -->", err);
    throw new Error(err);
  }
};

export const deleteToDoEntry = async (todoEntryId) => {
  try {
    // validations
    const getTodoEntryById = await todoEntryRepository.getToDoEntry(
      todoEntryId
    );
    if (getTodoEntryById == null) {
      throw new NotFound("todo entry id does not exist");
    }

    // delete todo entry in mongoDB
    const deleteTodoEntry = await todoEntryRepository.deleteToDoEntry(
      todoEntryId
    );

    console.log("delete todo entry service successful");
    return deleteTodoEntry;
  } catch (err) {
    console.log("error occured in delete todo entry -->", err);
    throw new Error(err);
  }
};

export const getToDoEntry = async (todoEntryId) => {
  try {
    // validations and get todo entry by id from mongoDB
    const getTodoEntryById = await todoEntryRepository.getToDoEntry(
      todoEntryId
    );
    if (getTodoEntryById == null) {
      throw new NotFound("todo entry id does not exist");
    }

    console.log("get todo entry by id service successful");
    return getTodoEntryById;
  } catch (err) {
    console.log("error occured in get todo entry -->", err);
    throw new Error(err);
  }
};

export const getAllToDoEntries = async () => {
  try {
    // get all todo entries from mongoDB
    const getTodoEntries = await todoEntryRepository.getAllToDoEntries(0, 10);

    console.log("get todo entries service successful");
    return getTodoEntries;
  } catch (err) {
    console.log("error occured in get all todo entries -->");
    throw new Error(err);
  }
};
