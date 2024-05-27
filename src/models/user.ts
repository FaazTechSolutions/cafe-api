import { BaseModel } from "./baseModel";
import { z } from "zod";

export interface User extends BaseModel {
  userName: string;
  email: string;
  mobileNumber: string;
  password: string;
}

export const userValidation=z.object({
    userName:  z.string().min(1,"UserName Required"),
    email:  z.string().min(1,"Email Required"),
    mobileNumber:  z.string().min(10,"Mobile Number Required"),
    password:  z.string().min(1,"Password Required")
})