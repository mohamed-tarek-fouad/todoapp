/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from "class-validator";
import {
  PasswordValidation,
  PasswordValidationRequirement,
} from "class-validator-password-check";
const passwordRequirement: PasswordValidationRequirement = {
  mustContainLowerLetter: true,
  mustContainNumber: true,
  mustContainSpecialCharacter: true,
  mustContainUpperLetter: true,
};
export class CreateUserDto {
  @MinLength(3)
  @IsNotEmpty()
  firstname: string;
  @MinLength(3)
  @IsNotEmpty()
  lastname: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Validate(PasswordValidation, [passwordRequirement])
  password: string;
}
