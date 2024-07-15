import { Injectable } from '@nestjs/common';
import { Model,Connection } from 'mongoose';
import { InjectModel, InjectConnection} from '@nestjs/mongoose'
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './interfaces/dto/create-user';
import { ID } from './interfaces/IUserService';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection,
  ) {}
  public async create(data: CreateUserDto): Promise<UserDocument>{
    const user = new this.UserModel(data);

    return await user.save();
  }
  public async findById(id: ID): Promise<UserDocument>{
    return await this.UserModel.findById(id).exec();
  }
  public async findByEmail(email: string): Promise<UserDocument>{
    return await this.UserModel.findOne({email: email}).exec()
  }
  public async findAll(params: SearchUserParams): Promise<UserDocument>{
    return await this.UserModel.find({params}).exec()
  }
}
