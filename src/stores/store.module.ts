import { DynamicModule, Module } from "@nestjs/common";
import { StoreService } from "./store.service";

export interface IStoreConfigRoot {
  dir: string;
}

export interface IStoreConfigFeature {
  file: string;
}
export type IStoreConfig = Partial<IStoreConfigFeature & IStoreConfigRoot>
export const DEFAULT_DIR_CONFIG = "test";
export const DEFAULT_FILE_CONFIG = "test,json";
let rootStoreConfig: IStoreConfig;
@Module({})
export class StoreModule {
  // Dynamic module
  // register
  // forRoot
  // forFeature

  // register
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
  private static _createConfig(config: IStoreConfig) {
    const defaultConfig: IStoreConfig = {
      dir: DEFAULT_DIR_CONFIG,
      file: DEFAULT_FILE_CONFIG
    }
    return { ...defaultConfig, ...config }
  }

  static forRoot(config?: IStoreConfigRoot): DynamicModule {
    rootStoreConfig = StoreModule._createConfig(config);
    return {
      module: StoreModule,
      providers: [
        StoreService,
        {
          provide: 'STORE_CONFIG',
          useValue: rootStoreConfig
        }
      ],
      // Share module
      exports: [StoreService]
    }
  }


  static forFeature(config?: IStoreConfigFeature): DynamicModule {
    const featureStoreConfig = StoreModule._createConfig({ ...rootStoreConfig, ...config });
    return {
      module: StoreModule,
      providers: [
        StoreService,
        {
          provide: 'STORE_CONFIG',
          useValue: featureStoreConfig
        }
      ],
      // Share module
      exports: [StoreService]
    }
  }
}