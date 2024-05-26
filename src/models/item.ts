import { BaseModel } from "./baseModel";

export interface Item extends BaseModel {
  name: string;
  description: string;
  image: string;
  status: string;
  preference: string;
  amount: number;
  type: string;
}
