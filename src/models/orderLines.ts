import { BaseModel } from "./baseModel";

export interface OrderLines extends BaseModel {
  orderId: string;
  seatId: number;
  itemId: string;
  Preference: string;
  locationId: number;
  quantity: number;
  amount: number;
  totalAmount: number;
  status: string;
}
