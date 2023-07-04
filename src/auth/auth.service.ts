/* eslint-disable prettier/prettier */
import { Cron, CronExpression } from "@nestjs/schedule";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "./../prisma.service";
import { CreateUserDto } from "./dtos/createUser.dto";
import * as bcrypt from "bcrypt";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
import { UpdateUserDto } from "./dtos/updateUser.dto";
@Injectable()
export class AuthService {
  constructor(private jwtServise: JwtService, private prisma: PrismaService) {}
  async validateUser(email: string, password: string) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          email,
        },
      });

      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          return user;
        }
      }
      return null;
    } catch (err) {
      return err;
    }
  }
  async validateToken(id: string) {
    try {
      const token = await this.prisma.tokens.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      return token;
    } catch (err) {
      return err;
    }
  }
  async login(user: any): Promise<any> {
    try {
      const token = await this.prisma.tokens.create({
        data: {
          userId: user.id,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
        },
      });
      delete user.password;

      return {
        message: "loged in successfully",
        ...user,
        access_token: this.jwtServise.sign({
          user: { userId: user.id, role: user.role, tokenId: token.id },
        }),
      };
    } catch (err) {
      return err;
    }
  }
  async register(userDto: CreateUserDto) {
    try {
      const userExist = await this.prisma.users.findUnique({
        where: {
          email: userDto.email,
        },
      });
      if (userExist) {
        throw new HttpException("user already exist", HttpStatus.BAD_REQUEST);
      }
      const saltOrRounds = 10;
      userDto.password = await bcrypt.hash(userDto.password, saltOrRounds);
      const user = await this.prisma.users.create({
        data: userDto,
      });
      return { ...user, message: "user has been created successfully" };
    } catch (err) {
      return err;
    }
  }
  async logout(req) {
    try {
      const user = await this.prisma.tokens.delete({
        where: {
          id: req.user.tokenId,
        },
      });
      return { ...user, message: "loged out successfully" };
    } catch (err) {
      return err;
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!user) {
        throw new HttpException("user doesn't exist", HttpStatus.BAD_REQUEST);
      }
      console.log(updateUserDto);
      const updatedUser = await this.prisma.users.update({
        where: { id: parseInt(id) },
        data: updateUserDto,
      });
      delete updatedUser.password;
      return { ...updatedUser, message: "user updated successfully" };
    } catch (err) {
      return err;
    }
  }

  @Cron(CronExpression.EVERY_HOUR)
  async deleteExpiredTokens() {
    try {
      console.log("Checking for expired tokens...");
      const expiredTokens = await this.prisma.tokens.findMany({
        where: {
          expiresAt: {
            lte: new Date(),
          },
        },
      });
      if (expiredTokens.length > 0) {
        console.log(`Found ${expiredTokens.length} expired tokens`);
        for (const token of expiredTokens) {
          await this.prisma.tokens.delete({
            where: {
              id: token.id,
            },
          });
        }
        console.log("Deleted expired tokens");
      } else {
        console.log("No expired tokens found");
      }
    } catch (err) {
      return err;
    }
  }
}
