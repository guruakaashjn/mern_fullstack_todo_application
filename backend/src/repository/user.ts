export interface UserRepositoryInterface {
  createUser(body): any;
  getUserById(userId): any;
  getUser(filter): any;
}
