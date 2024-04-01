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
  public create(data: CreateUserDto): Promise<UserDocument>{
    const user = new this.UserModel(data);

    return user.save();
  }
  public findById(id: ID): Promise<UserDocument>{
    return this.UserModel.findById(id).exec();
  }
  public findByEmail(email: string): Promise<UserDocument>{
    return this.UserModel.findOne({email: email}).exec()
  }
  public findAll(params: SearchUserParams): Promise<UserDocument>{
    return this.UserModel.find({params}).exec()
  }
}
