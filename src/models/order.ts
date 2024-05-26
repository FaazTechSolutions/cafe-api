import { BaseModel } from "./baseModel";

export interface Order extends BaseModel {
  orderId: string;
  status: string;
  locationId: number;
  totalAmount: number;
  customerId: string;
}
