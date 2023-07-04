import {
  Controller,
  Get,
  Param,
  UseGuards,
  Req,
  Post,
  Body,
  Patch,
  Query,
} from "@nestjs/common";
import { TodosService } from "./todos.service";
import { JwtAuthGuard } from "../jwtAuthGuard";
import { CreateTodoDto } from "./dtos/createTodo.dto";
import { UpdateTodoDto } from "./dtos/updateTodo.dto";

@Controller("todos")
export class TodosController {
  constructor(private todosService: TodosService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  createTodo(@Body() createTodoDto: CreateTodoDto, @Req() req) {
    return this.todosService.createTodo(createTodoDto, req);
  }
  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  updateTodo(
    @Body() updateTodoDto: UpdateTodoDto,
    @Param() id: string,
    @Req() req,
  ) {
    return this.todosService.updateTodo(updateTodoDto, id, req);
  }
  @UseGuards(JwtAuthGuard)
  @Get("allTodos")
  allUsers(@Query() take: string, @Query() skip: string, @Req() req) {
    return this.todosService.allTodos(take, skip, req);
  }
  @Get(":id")
  @UseGuards(JwtAuthGuard)
  userById(@Param("id") id: string, @Req() req) {
    return this.todosService.todoById(id, req);
  }
}
