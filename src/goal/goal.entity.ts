import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { BaseEntity } from '../common/base.entity';

@Entity('goals')
export class Goal extends BaseEntity {
  @Column()
  name: string;

  @Column()
  goal: number;

  @Column({ default: 0 })
  currentMoney: number;

  @Column({ default: false })
  isComplete: boolean;

  @ManyToOne(() => User, (user) => user.goals)
  user: User;
}
