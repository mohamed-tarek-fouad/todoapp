import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateTagDto } from "./dtos/createTag.dto";
import { UpdateTagDto } from "./dtos/updatetag.dt";
import { title } from "process";

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}
  async createTag(createTagDto: CreateTagDto, req) {
    const checktag = await this.prisma.tags.findFirst({
      where: { title: createTagDto.title },
    });
    if (checktag)
      throw new HttpException(
        "tag title already exist",
        HttpStatus.BAD_REQUEST,
      );
    const tag = await this.prisma.tags.create({
      data: { ...createTagDto, usersId: parseInt(req.user.userId) },
    });
    return { message: "tag created successfully", tag };
  }
  async updateTag(updateTagDto: UpdateTagDto, req, id: string) {
    const checktag = await this.prisma.tags.findFirst({
      where: { title: updateTagDto.title },
    });
    if (checktag)
      throw new HttpException(
        "tag title already exist",
        HttpStatus.BAD_REQUEST,
      );
    await this.prisma.tags.updateMany({
      where: {
        id: parseInt(id),
        usersId: parseInt(req.user.userId),
      },
      data: updateTagDto,
    });
    const tag = await this.prisma.tags.findFirst({
      where: {
        id: parseInt(id),
        usersId: parseInt(req.user.userId),
      },
    });
    return { message: "updated tag successfully", tag };
  }
  async allTags(req, take: string, skip: string, searsh: string) {
    console.log(take, skip, searsh);
    const tags = await this.prisma.tags.findMany({
      take: take ? parseInt(take) : undefined,
      skip: skip ? parseInt(skip) : undefined,
      where: {
        usersId: parseInt(req.user.userId),
        title: {
          contains: searsh,
        },
      },

      include: { todos: true },
    });
    return { message: "retrieved tags successfully", tags };
  }
  async tagById(req, id: string) {
    const tag = await this.prisma.tags.findFirst({
      where: {
        id: parseInt(id),
        usersId: parseInt(req.user.userId),
      },
      include: { todos: true },
    });
    return { message: "retrieved tag sucessfully", tag };
  }
}
