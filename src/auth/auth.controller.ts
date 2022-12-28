import { Controller, Post, UseGuards,Body, Req, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { loginDTO } from '../users/dto/login.dto';
import { airlineDTO } from '../users/dto/airline.dto';

import { AuthService } from './auth.service';
import { Request } from 'express';
import { FlightDTO } from 'src/users/dto/flights.dto';

@Controller('app/v1')
export class AuthController {
    constructor(public _AuthService:AuthService){}

@Post('/profiletoken')
async gettoken(@Body() login:loginDTO, @Req() req:Request){
    console.log("login ---",login);
    const token=await this._AuthService.generatetoken(login);
    return token;
}

@Get('allflights')
async getallflights(){
  const allflights = await this._AuthService.getallnewflights();
  return allflights;
}

@Post('/flight/admin/login')
async getnewtoken(@Body() login:loginDTO, @Req() req:Request){
    console.log("login ---",login);
    const token=await this._AuthService.generatetoken(login);
    return token;
}

@Post('/flight/user/login')
async getusertoken(@Body() login:loginDTO, @Req() req:Request){
    console.log("login ---",login);
    const token=await this._AuthService.generatetoken(login);
    return token;
}

@Post('airline')
@UseGuards(AuthGuard("jwt"))
async addnewairline(@Body() airline:airlineDTO, @Req() req:Request){
  console.log(airline);
  const airlinenew = await this._AuthService.saveairline(airline);

  return airlinenew;
}

@Post('airline/flight')
@UseGuards(AuthGuard("jwt"))
async addnewflight(@Body() flight:FlightDTO, @Req() req:Request){
  console.log("add new flight start");
  const flightadd = await this._AuthService.saveflight(flight);
  return flight;
}

@Get('/auth')
justhello(){
  return "in Auth Controller";
}

  @Get('/user')
  @UseGuards(AuthGuard("jwt"))
  getProfile(@Req() req:Request) {
    return req['user'];
  }
}

