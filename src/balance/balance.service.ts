import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Balance } from './balance.entity';
import { GoalService } from '../goal/goal.service';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(Balance)
    private readonly balanceRepository: Repository<Balance>,
    private readonly goalService: GoalService,
  ) {}

  public async get(): Promise<any> {
    const [balance] = await this.balanceRepository.find();
    return balance;
  }

  public async topup(sum: number) {
    const balance = await this.get();
    balance.balance = Math.round(balance.balance + +sum);
    await this.balanceRepository.update(balance.id, balance);
    await this.goalService.topupGoals(sum);
    return this.get();
  }
}
