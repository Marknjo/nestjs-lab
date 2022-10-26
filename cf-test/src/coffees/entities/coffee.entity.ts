import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('coffees')
export class Coffee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ unique: true })
  name: string;

  @Column()
  brand: string;

  @Column('json', { nullable: true })
  flavors: Array<string>;
}
