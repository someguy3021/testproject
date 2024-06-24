import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export class CreateTodoDto {
  @ApiProperty({
    description: 'Туду-ID',
    minimum: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Туду-имя пользователя',
  })
  name: string;
}

export const CreateTodoSchema = Joi.object({
  name: Joi.string().required()
})