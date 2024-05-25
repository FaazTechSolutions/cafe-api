import { BaseModel } from "./baseModel";
import { LocationSeats } from "./locationSeats";

export interface Location extends BaseModel {
    name: string
    status: string
    image: string
    officeBoy: string
    officeBoyMobile: string
    
   //locationSeats:LocationSeats[] 
}
