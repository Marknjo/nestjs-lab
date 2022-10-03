import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Coffees } from './coffees-entity';

@Entity('flavors')
export class Flavors {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany((type) => Coffees, (coffees) => coffees.flavors)
  coffees: Coffees[];
}
