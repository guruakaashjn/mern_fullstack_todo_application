import todoEntryModel from "../../model/todoEntryModel";
import { TodoEntryInterface } from "../todoEntry";

class TodoEntryRepository implements TodoEntryInterface {
  async createToDoEntry(body: any) {
    let createdTodoEntry = await todoEntryModel.create(body);
    return createdTodoEntry;
  }

  async editToDoEntry(todoEntryId: any, body: any) {
    let updatedTodoEntry = await todoEntryModel.findByIdAndUpdate(
      todoEntryId,
      body,
      {
        new: true,
      }
    );
    return updatedTodoEntry;
  }

  async deleteToDoEntry(todoEntryId: any) {
    const deleteToDoEntry = await todoEntryModel.findByIdAndUpdate(
      todoEntryId,
      {
        deleted: true,
        deletedAt: new Date(),
      }
    );

    return deleteToDoEntry;
  }

  async getToDoEntry(todoEntryId: any) {
    const getToDoEntry = await todoEntryModel.findOne({
      _id: todoEntryId,
      deleted: { $ne: true },
    });
    return getToDoEntry;
  }

  async getAllToDoEntries(start: any, end: any) {
    const toDoEntries = await todoEntryModel
      .find({ deleted: { $ne: true } })
      .sort({ createdDate: -1 });
    return toDoEntries;
  }

  async getToDoEntryByName(todoEntryName: any) {
    const getToDoEntry = await todoEntryModel.findOne({
      name: todoEntryName,
      deleted: { $ne: true },
    });
    return getToDoEntry;
  }
}

const todoEntryRepository = new TodoEntryRepository();
export default todoEntryRepository;
