import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  UsePipes,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto, CreateTodoSchema } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Todo as todoEntity } from './entities/todo.entity';
import { JoiValidationPipe } from '../pipes/ValidationPipe';
import { LoggingInterceptor } from 'src/interceptiors/logging.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Todos')
@ApiBearerAuth()
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @ApiResponse({
    status: 201,
    description: 'Туду успешно добавлено',
    type: todoEntity,
  })
  @ApiResponse({ status: 401, description: 'Неавторизовано' })
  @Post()
  @UsePipes(new JoiValidationPipe(CreateTodoSchema))
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Туду успешно получены',
    type: todoEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Туду по ID успешно получено',
    type: todoEntity,
  })
  @Get(':id')
  @UseInterceptors(LoggingInterceptor)
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.todosService.findOne(+id);
  }

  @ApiResponse({
    status: 200,
    description: 'Туду успешно изменено',
    type: todoEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @UsePipes(new JoiValidationPipe(CreateTodoSchema))
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(+id, updateTodoDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Туду успешно удалено',
    type: todoEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file)
  }
}
