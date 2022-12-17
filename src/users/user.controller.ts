import { Body, Controller, Get, Param, ParseEnumPipe, ParseIntPipe, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { EUser, IUserDto } from "./user.dto";
import { plainToClass } from 'class-transformer';
@Controller('users')
export class UserController {
  // Pipe
  // Transformer
  // Validator


  // (2) Validation pipes, must install class-validator and class-transformer
  // @UsePipes(new ValidationPipe())
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