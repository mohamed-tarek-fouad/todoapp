/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsPositive, MinLength } from "class-validator";
export class CreateTodoDto {
  @MinLength(3)
  @IsNotEmpty()
  title: string;
  @MinLength(3)
  @IsNotEmpty()
  todo: string;
  @IsNotEmpty()
  @IsOptional()
  @IsPositive()
  tagsId: number;
}
