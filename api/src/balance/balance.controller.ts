import { Controller, Get, Param, Patch } from '@nestjs/common';
import { BalanceService } from './balance.service';

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get()
  public async get() {
    return this.balanceService.get();
  }

  @Patch(':sum')
  public async topup(@Param('sum') sum: number) {
    return this.balanceService.topup(sum);
  }
}
