import { Injectable } from "@nestjs/common";
import { StoreService } from "src/stores/store.service";

@Injectable()
export class UserService {
  constructor(private readonly storeSerive: StoreService) {

  }
  createUser(user: any) {
    user.createdAt = new Date();
    user.id = 1
    user.updatedAt = new Date();
    this.storeSerive.save(user);
    return user
  }
}