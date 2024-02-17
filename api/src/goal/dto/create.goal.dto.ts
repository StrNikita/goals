import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGoalDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  goal: number;
}
