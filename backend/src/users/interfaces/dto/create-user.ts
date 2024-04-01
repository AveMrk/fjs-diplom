import { ObjectId } from "mongoose";

export interface CreateUserDto {
  _id: ObjectId,
  email: string,
  passwordHash: string,
  name: string,
  contactPhone?: string,
  role: string,
}