import { Column, Entity, OneToMany, OneToOne, Unique } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { Exclude } from 'class-transformer';
import { Balance } from '../balance/balance.entity';
import { Goal } from '../goal/goal.entity';

@Unique(['username'])
@Entity('users')
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column()
  username: string;

  @Exclude()
  @Column()
  password: string;

  @OneToOne(() => Balance, (balance) => balance.user)
  balance: Balance;

  @OneToMany(() => Goal, (goal) => goal.user)
  goals: Goal[];
}
