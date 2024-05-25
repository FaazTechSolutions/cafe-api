import { BaseModel } from "./baseModel";

export interface LocationSeats extends BaseModel {
    locationId: string;
    seatId: string;
    seatNo: string;
    orderUrl: string;
}
