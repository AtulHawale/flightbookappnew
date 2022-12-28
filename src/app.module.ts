import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './auth/constants';
import { AuthController } from './auth/auth.controller';
import { Airline } from './users/airlines.entity';
import { Flight } from './users/flight.entity';
import { Ticket } from './users/ticket.entity';



@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'HareKrishna@108',
    database: 'flightbookapp',
    entities: [User,Airline,Flight,Ticket],
    autoLoadEntities:true,
    synchronize: true,
  }), forwardRef(()=>UsersModule) ,forwardRef(()=>AuthModule)  
],
  controllers: [AppController,AuthController,UsersController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource){}
}
