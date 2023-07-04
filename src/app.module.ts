import { TagsModule } from "./tags/tags.module";
import { TodosModule } from "./todos/todos.module";
import { AuthModule } from "./auth/auth.module";
import { Module } from "@nestjs/common";
import { JwtAuthGuard } from "./jwtAuthGuard";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
@Module({
  imports: [
    TagsModule,
    TodosModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot(),
  ],

  controllers: [],
  providers: [JwtAuthGuard],
})
export class AppModule {}
