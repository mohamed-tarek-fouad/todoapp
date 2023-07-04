import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateTodoDto } from "./dtos/createTodo.dto";
import { UpdateTodoDto } from "./dtos/updateTodo.dto";

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}
  async createTodo(createTodoDto: CreateTodoDto, req) {
    const todo = await this.prisma.todos.create({
      data: {
        ...createTodoDto,
        userId: parseInt(req.user.userId),
      },
    });
    return { message: "created Todo successfully", todo };
  }
  async updateTodo(updateTodoDto: UpdateTodoDto, id: string, req) {
    await this.prisma.todos.updateMany({
      where: {
        id: parseInt(id),
        userId: parseInt(req.user.userId),
      },
      data: {
        ...updateTodoDto,
      },
    });
    const todo = await this.prisma.todos.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return { message: "updated todo successfully", todo };
  }
  async allTodos(take: string, skip: string, req) {
    const todos = await this.prisma.todos.findMany({
      where: { userId: parseInt(req.user.userId) },
      take: parseInt(take),
      skip: parseInt(skip),
    });
    const count = await this.prisma.todos.count({});
    return { message: "retreived todos sucessfully", todos, count };
  }
  async todoById(id: string, req) {
    const todo = await this.prisma.todos.findFirst({
      where: {
        id: parseInt(id),
        userId: req.user.userId,
      },
    });
    return { message: "retreived todo successfully", todo };
  }
}
