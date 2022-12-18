import { DynamicModule, Module } from "@nestjs/common";
import { StoreService } from "./store.service";

export interface IStoreConfig {
  dir: string;
  file: string;
}

@Module({})
export class StoreModule {
  // Dynamic module
  static register(config: IStoreConfig): DynamicModule {
    return {
      module: StoreModule,
      providers: [
        StoreService,
        {
          provide: 'STORE_CONFIG',
          useValue: config
        }
      ],
      // Share module
      exports: [StoreService]
    }
  }
}