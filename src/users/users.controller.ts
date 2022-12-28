import { Body, Controller, Get, Param, Post,Put,Query, Req ,UseGuards } from '@nestjs/common';
import { changepassDTO } from './dto/changepass.dto';
import { forgotpasswordDTO } from './dto/forgotpass.dto';
import { checkbalanceDTO } from './dto/checkbalance.dto';
import { creditamountDto } from './dto/creditamount.dto';
import { UsersService } from './users.service';
import {userDTO} from './dto/users.dto';
import { loginDTO } from './dto/login.dto';
import {paybillsDTO} from './dto/paybills.dto'
import { AuthGuard } from '@nestjs/passport';
import { ticketDTO } from './dto/ticket.dto';
import { Request } from 'express';

@Controller('app/v1')  //bank
export class UsersController {
    constructor(public _UsersService:UsersService){}

@Get('/greet')
greetuser():string{
  return "welcome user in filghtbokk application"
}

@Post('/register/user')
register(@Body() reguser:userDTO){
  console.log("save user ",reguser);
const save= this._UsersService.saveuser(reguser);
return save;
}


@Post('/register/admin')
registeradmin(@Body() reguser:userDTO){
  console.log("save user ",reguser);
const save= this._UsersService.saveadmin(reguser);
return save;
}

@Post('flight/booking/:flightid')
async bookticket(@Body() ticket:ticketDTO, @Param('flightid') flightid){

  const tbook = await this._UsersService.bookfticket(ticket,flightid);
  return tbook;

}

@Post('/login')
@UseGuards(AuthGuard('local'))
loginuser(@Body()loguser:loginDTO){
const login=this._UsersService.usercheck(loguser.username);
return login;
}

@Post('/changepassword')
@UseGuards(AuthGuard('jwt'))
changePassword(@Body() chnagepass:changepassDTO){
const updatedpassword= this._UsersService.changepassword(chnagepass.email,chnagepass.oldpassword,chnagepass.newpassword);
return updatedpassword;
}

@Post('/forgotpassword')
@UseGuards(AuthGuard('jwt'))
forgotpassword(@Body() forgotpass:forgotpasswordDTO){
const resetpassword= this._UsersService.changepassword(forgotpass.email,forgotpass.username,forgotpass.resetpassword);
return resetpassword;
}





@Get('flight/ticket/:pnr')
async getticketbypnr(@Param('pnr') pnr){
  const ticketpnr = await this._UsersService.getTicket(pnr)
  return ticketpnr;
}

@Get('flight/booking/history/:emailId')
async getticketbymail(@Param('emailId') emailId){
  const ticketbymail = await this._UsersService.getallticketbymail(emailId);
  return ticketbymail;
}

@Put('flight/booking/cancel/:pnr')
async deleteticketbypnr(@Param('pnr') pnr){
  const delticket = await this._UsersService.deleteticket(pnr);
  return delticket;
}

@Get('flight/search')
getallflights(@Req() req:Request){
  console.log("req obj",req);
  //const getallflightbyobj = await this._UsersService.getallflightsbyob(searchobj);
}




}
