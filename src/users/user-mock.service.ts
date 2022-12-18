export class UserMockService {
  constructor() {

  }
  createUser(user: any) {
    return { username: "mock", password: "mock" }
  }
}