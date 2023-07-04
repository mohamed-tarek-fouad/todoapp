import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateTagDto } from "./dtos/createTag.dto";
import { UpdateTagDto } from "./dtos/updatetag.dt";

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}
  async createTag(createTagDto: CreateTagDto, req) {
    const tag = await this.prisma.tags.create({
      data: { ...createTagDto, usersId: parseInt(req.user.userId) },
    });
    return { message: "tag created successfully", tag };
  }
  async updateTag(updatetagDto: UpdateTagDto, req, id: string) {
    await this.prisma.tags.updateMany({
      where: {
        id: parseInt(id),
        usersId: parseInt(req.user.userId),
      },
      data: updatetagDto,
    });
    const tag = await this.prisma.tags.findFirst({
      where: {
        id: parseInt(id),
        usersId: parseInt(req.user.userId),
      },
    });
    return { message: "updated tag successfully", tag };
  }
  async allTags(req, take: string, skip: string) {
    const tags = await this.prisma.tags.findMany({
      where: { usersId: parseInt(req.user.userId) },
      take: parseInt(take),
      skip: parseInt(skip),
    });
    return { message: "retrieved tags successfully", tags };
  }
  async tagById(req, id: string) {
    const tag = await this.prisma.tags.findFirst({
      where: {
        id: parseInt(id),
        usersId: parseInt(req.user.userId),
      },
    });
    return { message: "retrieved tag sucessfully", tag };
  }
}
