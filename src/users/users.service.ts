import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Airline } from './airlines.entity';
import { airlineDTO } from './dto/airline.dto';
import { FlightDTO } from './dto/flights.dto';
import { loginDTO } from './dto/login.dto';
import { ticketDTO } from './dto/ticket.dto';
import { userDTO } from './dto/users.dto';
import { Flight } from './flight.entity';
import { Ticket } from './ticket.entity';
import { User } from './users.entity';

@Injectable()
export class UsersService {
constructor(@InjectRepository(User) private usersRepository: Repository<User>,
            @InjectRepository(Airline) private airlineRepository: Repository<Airline>,
            @InjectRepository(Flight) private flightRepository:Repository<Flight>,
            @InjectRepository(Ticket) private ticketRepository:Repository<Ticket>){}


async saveuser(user:userDTO):Promise<userDTO>{
const reguser= await this.usersRepository.save(user);
console.log(reguser);
return reguser;
}  

async saveadmin(user:userDTO):Promise<userDTO>{
    const regadmin= await this.usersRepository.save(user);
    console.log(regadmin);
    return regadmin;
    } 

async checkairline(name:string):Promise<airlineDTO>{
    const findairline = await this.airlineRepository.findOne({ where: { name } });
    console.log("findairline  ",findairline);
    return findairline;
}

async savenewflight(flightnew:FlightDTO){
    console.log("in user services new flight  ",flightnew);
    const newflight = {
        ...flightnew,
        "date":new Date().toLocaleDateString(),
        "round_trip":"yes"
    }

    const newflightadded = await this.flightRepository.save(newflight);

    console.log("new flight data newflightadded  ",newflightadded);
    return newflightadded
}

async bookfticket(ticket:ticketDTO, flightid):Promise<any>{
    console.log("in user services  ",ticket);
    console.log("in user services flightid ",flightid);

    const newticket={
        "id": Math.floor(Math.random() * 100),
        ...ticket,
        "pnr":"abc"+Math.floor(Math.random() * 10000),
        "status":"Active"
    };

    console.log("new ticket  ",newticket);
    const booknewticket = await this.ticketRepository.save(newticket);
    
    return {
        "pnr":newticket.pnr
    }
    /*return newticket*/
}

async getTicket(pnr:string):Promise<any>{
    console.log("pnr number  ",pnr);
    const tickebypnr = await this.ticketRepository.findOne( { where: { pnr }})
    return tickebypnr;
}

async deleteticket(pnr:string){
    console.log("pnr number",pnr);
    const deltick = await this.ticketRepository.delete({
        pnr:pnr
    })

    console.log("delticket  ",deltick);
    return deltick;
}

async getallflights(){
    const allflightdata = await this.flightRepository.findBy({
        from_place: "delhi",
        to_place: "pune"})

        return allflightdata;
}

async getallflightsbyob(obj){
    //const allflights  = await this.flightRepository.findBy({
    //    obj 
    //})
    console.log("search obj  ",obj);
    return obj; 
}

async getallticketbymail(emailId){
    const allticketbymail = await this.ticketRepository.findBy({
        email:emailId
    })

    return allticketbymail;
}

async savenewairline(airline:airlineDTO):Promise<airlineDTO>{
    console.log('airline in user service   ',airline);
    const addairline = {
        ...airline,
        "blocked":"no",
        "id":Math.floor(Math.random() * 1000)
    }  
    
    const addnewairline = await this.airlineRepository.save(addairline)  
    console.log("airline added  ",addnewairline);
    return addnewairline

}

async usercheck(username:string):Promise<loginDTO>{
return await this.usersRepository.findOne({ where: { username } });
}

async changepassword(email:string,password:string, newpassword:string){
const founduser= await this.usersRepository.find({ where: { email ,password} });
if(founduser.length>0){
    return await this.usersRepository.update(email, {password:newpassword}); 
}
else{ 
    throw new HttpException("Email or password incorrect",HttpStatus.BAD_REQUEST)
}}

async forgotpassword(email:string,username:string, resetpassword:string){
    const founduser= await this.usersRepository.find({ where: { email ,username} });
    if(founduser.length>0){
        return await this.usersRepository.update(email, {password:resetpassword}); 
    }
    else{ 
        throw new HttpException("Email or username incorrect",HttpStatus.BAD_REQUEST);
    }}




   // throw new HttpException("negative balance please credit amount", HttpStatus.EXPECTATION_FAILED)    



    //throw new HttpException("negative balance please credit amount", HttpStatus.EXPECTATION_FAILED)    



}
  