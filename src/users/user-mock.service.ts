import { Injectable } from "@nestjs/common";

@Injectable()
export class UserMockService {
  constructor() {

  }
  createUser(user: any) {
    return { username: "mock", password: "mock" }
  }
}