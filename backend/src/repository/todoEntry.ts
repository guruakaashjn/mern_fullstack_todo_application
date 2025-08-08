export interface TodoEntryInterface {
  createToDoEntry(body): any;
  editToDoEntry(todoEntryId, body): any;
  deleteToDoEntry(todoEntryId): any;
  getToDoEntry(todoEntryId): any;
  getAllToDoEntries(start: any, end: any): any;
  getToDoEntryByName(todoEntryName: any): any;
}
