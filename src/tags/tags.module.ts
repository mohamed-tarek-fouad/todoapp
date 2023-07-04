import { TagsService } from "./tags.service";
import { TagsController } from "./tags.controller";

import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Module({
  imports: [],
  controllers: [TagsController],
  providers: [TagsService, PrismaService],
})
export class TagsModule {}
