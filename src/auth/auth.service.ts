import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { userDTO } from 'src/users/dto/users.dto';
import { loginDTO } from 'src/users/dto/login.dto';
import { changepassDTO } from 'src/users/dto/changepass.dto';
import { airlineDTO } from 'src/users/dto/airline.dto';
import { error } from 'console';
import { FlightDTO } from 'src/users/dto/flights.dto';

@Injectable()
export class AuthService {
    constructor(public UsersService:UsersService,public JwtService:JwtService
){}

    async validateUser(username: string, pass: string): Promise<any> {
           const founduser= await this.UsersService.usercheck(username)
            if (!founduser) {
                throw new HttpException('User not found', HttpStatus.UNAUTHORIZED); 
                 
            }
            if (founduser && founduser.password === pass) {
                return founduser;
              }
              return null;
             }

     async generatetoken(login:loginDTO){
        const {username,password}=login;
        
        const validuser = await this.UsersService.usercheck(username)
        console.log("valid user ",validuser);
        if(validuser && validuser.password == password)
        {
            const payload= {username};
        const token= await this.JwtService.sign(payload);
        return {token:token}
        }
        else{
            return "User Not Valid"
        }
        
       
        
  }

    async saveairline(airline:airlineDTO){
        console.log("airline in auth ",airline);
        const validairline = await this.UsersService.checkairline(airline["name"]);
        console.log("validairline  ",!validairline);
        if(!validairline)
        {
            var newuairline = await this.UsersService.savenewairline(airline);

        }
        else{
            throw new Error("airline aleready present");    
            
        }
        console.log("airline in auth from userservice ",newuairline);

        return newuairline;
    }

    async saveflight(flight:FlightDTO){
        console.log("Flightnew in auth service",flight);
        const flightaddnew = await this.UsersService.savenewflight(flight);
        return flightaddnew

    }

    async getallnewflights(){
        const allflights = await this.UsersService.getallflights();
        return allflights;
    }
}
