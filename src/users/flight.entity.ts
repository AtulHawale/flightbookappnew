import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToOne, ManyToOne,OneToMany } from "typeorm";
import { Airline } from "./airlines.entity";
import { Ticket } from "./ticket.entity";


@Entity()
export class Flight {
    @PrimaryGeneratedColumn()
    flight_number:string

    @Column()
    airline_id:number

    @Column()
    from_place:string

    @Column()
    to_place:string

    @Column()
    start_time:string

    @Column()
    end_time:string

    @Column()
    total_number_of_business_class_seats:string

    @Column()
    total_number_of_nonbusiness_class_seats:string 

    @Column()
    ticket_cost:string

    @Column()
    total_number_of_seats:string

    
    @ManyToOne(type=>Airline,airline=>airline.flights,{
        nullable:true,
        cascade:true
    })
    airline:Airline;

    @Column()
    meal:string

    @OneToMany(type=>Ticket,ticket=>ticket.flight)
    tickets:Ticket[]



}

/**{
    "flight_number" : "dp234",
    "airline_id" : 21,
    "from_place" : "delhi",
    "to_place" : "pune",
    "start_time" : "10:35",
    "end_time" : "13:45",
    "total_number_of_business_class_seats" : "50",
    "total_number_of_nonbusiness_class_seats" : "50",
    "ticket_cost" : "5000",
    "total_number_of_seats" : "100",
    "meal" : "veg"
}	 */