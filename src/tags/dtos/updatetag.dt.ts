import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateTagDto {
  @MaxLength(200)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  title: string;
  @MaxLength(20)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  color: string;
}
