import { Module } from "@nestjs/common";
import { UserMockService } from "./user-mock.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
const createUserService = (config: IConfig) => {
  console.log(config);
  return new UserService();
}
export interface IConfig {
  id: string;
  secret: string;
}
const config: IConfig = {
  id: "test",
  secret: "test"
}
@Module({
  controllers: [UserController],
  // Custom providers: 
  // useFactory
  // UseClass
  // UseValue


  // C2: contructor injection
  // providers: [UserService]

  // C3
  providers: [{
    provide: UserService,
    // UseClass
    useClass: UserMockService
  },

  // useValue
  {
    provide: 'config',
    useValue: config,
  },
  // useFactory
  {
    provide: "user_service",
    useFactory: createUserService,
    // pass params
    inject: [
      {
        token: "config",
        optional: true
      }
    ]
  }

  ],
})
export class UserModule {

}