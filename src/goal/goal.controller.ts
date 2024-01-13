import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateGoalDto } from './dto/create.goal.dto';
import { UpdateGoalDto } from './dto/update.goal.dto';
import { GoalService } from './goal.service';

@Controller('goals')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Get()
  public async findAll() {
    return this.goalService.findAll();
  }

  @Post()
  public async create(@Body() dto: CreateGoalDto) {
    return this.goalService.create(dto);
  }

  @Patch(':id')
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateGoalDto,
  ) {
    return this.goalService.update(id, dto);
  }

  @Delete(':id')
  public async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.goalService.delete(id);
  }
}
