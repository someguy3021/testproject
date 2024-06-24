import * as Joi from 'joi';

export class CreateUserDto {
  name: string;
  password: string;
}

export const CreateUserSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required().min(6),
})