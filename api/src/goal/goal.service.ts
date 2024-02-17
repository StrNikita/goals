import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Goal } from './goal.entity';
import { Repository } from 'typeorm';
import { CreateGoalDto } from './dto/create.goal.dto';
import { UpdateGoalDto } from './dto/update.goal.dto';

@Injectable()
export class GoalService {
  constructor(
    @InjectRepository(Goal)
    private readonly goalRepository: Repository<Goal>,
  ) {}
  public async findAll() {
    return this.goalRepository.find();
  }

  public async create(dto: CreateGoalDto) {
    const goal = this.goalRepository.create(dto);
    return this.goalRepository.save(goal);
  }

  public async update(id: string, dto: UpdateGoalDto) {
    const goal = await this.goalRepository.findOne({ where: { id } });
    if (!goal) {
      throw new NotFoundException('Goal with this id not found');
    }

    await this.goalRepository.update(id, dto);
    return this.goalRepository.findOne({ where: { id } });
  }

  public async topupGoals(sum: number) {
    sum = Number(sum);
    const uncompletedGoals = await this.goalRepository.find({
      where: { isComplete: false },
      order: { createdAt: 'ASC' },
    });

    for (const goal of uncompletedGoals) {
      if (sum === 0) {
        return;
      }

      if (goal.goal > goal.currentMoney) {
        const diff = goal.goal - goal.currentMoney;
        if (diff >= sum) {
          goal.currentMoney += sum;
          sum = 0;
        } else if (diff < sum) {
          goal.currentMoney += diff;
          sum -= diff;
        }

        await this.goalRepository.update(goal.id, goal);
      }
    }
  }

  public async delete(id: string) {
    await this.goalRepository.delete(id);
  }
}
