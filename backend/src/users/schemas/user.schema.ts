import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, Mongoose } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User{
  /*@Prop({type: , required: true})
  public _id: ObjectId;*/

  @Prop({required: true, unique: true })
  public email: string;

  @Prop({required: true})
  public passwordHash: string;

  @Prop({required: true})
  public name: string;

  @Prop()
  public contactPhone: string;

  @Prop({required: true, default: 'client'})
  public role: 'client' | 'admin' | 'manager';
}
export const UserSchema = SchemaFactory.createForClass(User)