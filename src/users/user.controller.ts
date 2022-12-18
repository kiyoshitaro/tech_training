import { Body, Controller, Get, Inject, Param, ParseEnumPipe, ParseIntPipe, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { EUser, IUserDto } from "./user.dto";
import { plainToClass } from 'class-transformer';
import { UserService } from "./user.service";
import { ModuleRef } from "@nestjs/core";
import { IConfig } from "./user.module";
import { StoreService } from "src/stores/store.service";
@Controller('users')
export class UserController {
  // C1: moduleRef
  // constructor(private moduleRef: ModuleRef) {
  // }

  // C2: contructor injection
  // constructor(private readonly userService: UserService) {
  // }

  // C3: contructor injection
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject('config') private readonly config: IConfig,
    @Inject("store_service") private readonly store_service: StoreService
  ) {
    console.log(config);
  }

  // C1: moduleRef
  // testInjectCreateUser(@Body() user: IUserDto) {
  //   const userService = this.moduleRef.get(UserService); r
  //   return userService.createUser(user)
  // }

  // C2
  testInjectCreateUser(@Body() user: IUserDto) {
    return this.userService.createUser(user)
  }


  // Pipe
  // Transformer
  // Validator
  // (2) Validation pipes, must install class-validator and class-transformer
  @UsePipes(new ValidationPipe())
  @Post()
  createUser(@Body() user: IUserDto): IUserDto {
    // transformation
    const userFormat = plainToClass(IUserDto, user, { excludeExtraneousValues: true });
    console.log(userFormat);
    return {
      username: "Admin",
      password: "Admin"
    }
  }

  @Get()
  getAllUsers() {
    return [{ name: "An", age: 18 }, { name: "Binh", age: 22 },]
  }

  @Get(':id')
  getUserById(
    @Param(
      'id',
      // (1) params pipes
      // ParseIntPipe
      new ParseEnumPipe(EUser)
    )
    id: number) {
    console.log(id);
    return 'dddd'
  }
}