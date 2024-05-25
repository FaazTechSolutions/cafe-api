import { BaseModel } from "./baseModel";
import { z } from "zod";

export interface Employee extends BaseModel {
  employeeId: string;
  employeeName: string;
  profession: string;
  mobileNumber: string;
}

export const EmployeeValidation = z.object({
  employeeId: z.string().min(1, "EmployeeId is required"),
  employeeName: z.string().min(1, "Employee Name is required"),
  profession: z.string().min(1, "Profession is required"),
  mobileNumber: z.string().min(10, "Mobile Number is required"),
});
