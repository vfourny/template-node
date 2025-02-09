import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  title!: string

  @IsBoolean()
  completed?: boolean

  @IsString()
  @IsNotEmpty()
  userId!: string
}
