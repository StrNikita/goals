import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update.user.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { BalanceService } from '../balance/balance.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly balanceService: BalanceService,
  ) {}

  public async getOne(id: string) {
    return this.userRepository.findOne({
      where: { id },
      relations: { balance: true },
    });
  }

  public async create(dto: CreateUserDto) {
    const isUsernameTaken = await this.validateUsername(dto.username);
    if (isUsernameTaken) {
      throw new BadRequestException('Username already taken');
    }

    const newUser = this.userRepository.create(dto);

    const user = await this.userRepository.save(newUser);
    await this.balanceService.create(user.id);
    return user;
  }

  public async update(id: string, dto: UpdateUserDto) {
    const user = await this.getOne(id);
    if (!user) {
      return new NotFoundException('User not found');
    }

    await this.userRepository.update(id, dto);
    return this.getOne(id);
  }

  public async delete(id: string) {
    await this.userRepository.delete(id);
  }

  private async validateUsername(username: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { username } });
    console.log(!!user);
    return !!user;
  }
}
