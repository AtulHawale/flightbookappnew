import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToOne, ManyToOne } from "typeorm";
import { Flight } from "./flight.entity";
import { Airline } from "./airlines.entity";



@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    flight_id:number

    @Column()
    booked_by:string

    @Column()
    email:string

    @Column()
    number_of_seats:number

    @Column()
    passengers:string

    @Column()
    selected_meal:string

    @Column()
    selected_seat_number:number

    @Column()
    pnr:string
  
    @ManyToOne(type=>Flight,flight=>flight.tickets,{
        nullable:true,
        cascade:true
    })
    flight:Flight;

    


}
