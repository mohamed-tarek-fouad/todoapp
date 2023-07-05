/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, MinLength } from "class-validator";
export class UpdateTodoDto {
  @MinLength(3)
  @IsNotEmpty()
  @IsOptional()
  title: string;
  @MinLength(3)
  @IsNotEmpty()
  @IsOptional()
  todo: string;
  @IsNotEmpty()
  @IsOptional()
  done: boolean;
}
