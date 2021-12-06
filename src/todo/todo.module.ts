import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';

@Module({
  providers: [TodoService],
})
export class TodoModule {}
