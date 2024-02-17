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
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update.user.dto';
import { CreateUserDto } from './dto/create.user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  public async getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getOne(id);
  }

  @Post()
  public async create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Patch('/:id')
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.update(id, dto);
  }

  @Delete('/:id')
  public async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.delete(id);
  }
}
