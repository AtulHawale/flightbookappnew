import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { Airline } from './airlines.entity';

import { UsersService } from './users.service';
import { Flight } from './flight.entity';
import { Ticket } from './ticket.entity';


@Module({
    imports: [TypeOrmModule.forFeature([User]),TypeOrmModule.forFeature([Airline]),TypeOrmModule.forFeature([Flight]),TypeOrmModule.forFeature([Ticket])],
    exports: [TypeOrmModule,UsersModule,UsersService],
    providers:[UsersService],
    controllers:[UsersController]
})
export class UsersModule {}
