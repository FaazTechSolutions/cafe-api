import { BaseModel } from "./baseModel";
import { OrderLines } from "./orderLines";

export interface Order extends BaseModel {
  orderId: string;
  status: string;
  locationId: number;
  totalAmount: number;
  customerId?: string;

  lines?:OrderLines[]|null
}
