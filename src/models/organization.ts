import { z } from "zod";
import { BaseModel } from "./baseModel";

export interface Organization extends BaseModel {
  name: string;
  shortCode: string;
}

export interface OrganizationUser extends BaseModel {
  organizationId: number;
  userId: number;
  isDefault: number;
}

export const OrganizationUserValidation = z.object({
  organizationId: z.number().int("organizatioId Required"),
  userId: z.number().int("userId Required"),
  isDefault: z.number().int("isDefault Required as 0 or 1").gte(0).lte(1),
});

export const OrganizationValidatoin = z.object({
    name:z.string().min(1,"Name Required"),
    shortCode:z.string().min(1,"shortCode Required")
})