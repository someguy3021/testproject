import { ApiProperty } from "@nestjs/swagger"

export class CreateTodoDto {
    @ApiProperty({
        description:'Туду-ID',
        minimum: 1
    })
    id: number

    @ApiProperty({
        description:'Туду-имя пользователя'
    })
    name: string
}
