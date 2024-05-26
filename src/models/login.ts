import { z } from "zod";

export interface login {
  username: string;
  password: string;
}

export const loginValidation = z.object({
  username: z.string().min(1,"User Name Required"),
  password: z.string().min(1,"Password Required"),
});
