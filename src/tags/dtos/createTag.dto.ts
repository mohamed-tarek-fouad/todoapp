import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateTagDto {
  @MaxLength(200)
  @IsNotEmpty()
  @IsString()
  title: string;
  @MaxLength(20)
  @IsNotEmpty()
  @IsString()
  color: string;
}
