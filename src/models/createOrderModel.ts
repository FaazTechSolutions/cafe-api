import { Order } from "./order"
import { OrderLines } from "./orderLines"

export interface CreateOrderModel{
    locationId:number
    orders:OrderlinesModel[]
}
export interface OrderlinesModel{
    seatId :number
    preference:string
    itemId:number
    qty:number
}
export interface OrderStatusModel{
    Id:number
    status:string
    isLineUpdate:boolean
}
export interface OrderWithLines{
    order?:Order
    lines?:OrderLines[]
}
