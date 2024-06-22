import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

// export enum todoStatusEnum{
//     DRAW = 'Черновик',
//     PUBLISHED = 'Опубликован',
//     DELETED = 'Удален'
// }

@Entity()
export class Todo {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;
  
    @ApiProperty()
    @Column()
    user_id: number;
  
    @ApiProperty()
    @Column()
    text: string;

    @ApiProperty()
    @Column({ default: false })
    is_done: boolean;

}
