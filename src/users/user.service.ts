export class UserService {
  constructor() {

  }
  createUser(user: any) {
    user.createdAt = new Date();
    user.id = 1
    user.updatedAt = new Date();
    return user
  }
}