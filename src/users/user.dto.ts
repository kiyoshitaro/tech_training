import { IsNotEmpty, Length } from 'class-validator';
import { Expose } from 'class-transformer';

// Cannot use interface with class-validator decorator 
export class IUserDto {

  @IsNotEmpty({ message: 'test message' })
  @Length(5, 7)
  // @Expose()
  username: string;

  // @Expose()
  password: string;
}
export enum EUser {
  Admin,
  Test
}