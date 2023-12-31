import {
  Body,
  Controller,
  UseGuards,
  Post,
  Req,
  Patch,
  Get,
  Param,
  Query,
} from "@nestjs/common";
import { TagsService } from "./tags.service";
import { JwtAuthGuard } from "src/jwtAuthGuard";
import { CreateTagDto } from "./dtos/createTag.dto";
import { UpdateTagDto } from "./dtos/updatetag.dt";

@Controller("tags")
export class TagsController {
  constructor(private tagsService: TagsService) {}
  @Post("")
  @UseGuards(JwtAuthGuard)
  createTag(@Body() createtagDto: CreateTagDto, @Req() req) {
    return this.tagsService.createTag(createtagDto, req);
  }
  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  updateTag(
    @Body() updateTagDto: UpdateTagDto,
    @Req() req,
    @Param("id") id: string,
  ) {
    return this.tagsService.updateTag(updateTagDto, req, id);
  }
  @Get("allTags")
  @UseGuards(JwtAuthGuard)
  allTags(
    @Req() req,
    @Query("take") take: string,
    @Query("skip") skip: string,
    @Query("searsh") searsh: string,
  ) {
    return this.tagsService.allTags(req, take, skip, searsh);
  }
  @Get(":id")
  @UseGuards(JwtAuthGuard)
  tagById(@Req() req, @Param("id") id: string) {
    return this.tagsService.tagById(req, id);
  }
}
