/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
export class UpdateTodoDto {
  @MinLength(3)
  @IsNotEmpty()
  @IsOptional()
  title: string;
  @MinLength(3)
  @IsNotEmpty()
  @IsOptional()
  discription: string;
  @IsNotEmpty()
  @IsOptional()
  done: boolean;
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  dueDate: string;
}
