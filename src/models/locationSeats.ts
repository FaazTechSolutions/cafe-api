import { BaseModel } from "./baseModel";
import { z } from "zod";
export interface LocationSeat extends BaseModel {
    locationId: number;
    seatId: number;
    seatNo: string;
    orderUrl: string;
}

export const LocationSeatsValidation=z.object({
    locationId: z.string().min(1, "Name is required"),
    seatId:z.string().min(1, "Seat Id is required"),
    seatNo: z.string().min(1, "Seat Number is required"),
    orderUrl: z.string().url("Invalid url"),
})