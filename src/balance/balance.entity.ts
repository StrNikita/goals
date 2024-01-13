import { BaseEntity } from '../common/base.entity';

@Entity('balances')
export class Balance extends BaseEntity {
  @Column()
  balance: number;
}
