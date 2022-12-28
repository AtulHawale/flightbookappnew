import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn,OneToMany } from 'typeorm';
import { isNumber } from 'util';
import { Flight } from './flight.entity';

@Entity()
export class Airline {


  @PrimaryColumn()
  name: string;
 
  @Column()
  blocked: string;


  @Column()
  id: number;

  @OneToMany(type=>Flight,flight=>flight.airline)
  flights:Flight[]

  
}