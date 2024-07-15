import { Controller, Post, Get, Put, Body } from '@nestjs/common';
import { UserService } from './users.service';
import { UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './interfaces/dto/create-user';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService){}
  
  @Post()
  public create(@Body() body: CreateUserDto): Promise<UserDocument>{
    return this.userService.create(body);
  }
  /*
  create(data: Partial<User>): Promise<User>;
  findById(id: ID): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findAll(params: 
  */
}

