import { Module } from "@nestjs/common";
import { StoreModule } from "src/stores/store.module";
import { StoreService } from "src/stores/store.service";
import { UserMockService } from "./user-mock.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
const createStoreService = (config: IConfig) => {
  console.log(config);
  return new StoreService();
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
    provide: "store_service",
    useFactory: createStoreService,
    // pass params
    inject: [
      {
        token: "config",
        optional: true
      }
    ]
  }
  ],

  // Share module
  imports: [
    // StoreModule.register({ dir: "test", file: "test.json" })
    StoreModule.forFeature({ file: "test.json" })
  ],
})
export class UserModule {

}