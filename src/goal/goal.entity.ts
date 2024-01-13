import { Column, Entity, ManyToOne } from 'typeorm';
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

  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date;
}
