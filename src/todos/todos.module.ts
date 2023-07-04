import { TodosService } from "./todos.service";
import { TodosController } from "./todos.controller";

import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Module({
  imports: [],
  controllers: [TodosController],
  providers: [TodosService, PrismaService],
})
export class TodosModule {}
