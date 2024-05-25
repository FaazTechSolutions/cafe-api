import { BaseModel } from  './baseModel'

export interface Employee extends BaseModel{
employeeId :string
employeeName:string
profession:string
mobileNumber:string
}
