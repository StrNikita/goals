import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { User } from '../user/user.entity';

@Entity('balances')
export class Balance extends BaseEntity {
  @Column({ default: 0 })
  balance: number;

  @Column({ nullable: false })
  userId: string;

  @OneToOne(() => User, (user) => user.balance)
  @JoinColumn()
  user: User;
}
