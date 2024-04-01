import { ObjectId } from "mongoose"

export default interface User{
  _id:ObjectId,
  email: string,
  passwordHash: string,
  name: string,
  contactPhone?: string,
  role: string,
}