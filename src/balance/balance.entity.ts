import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('balances')
export class Balance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  balance: number;
}
