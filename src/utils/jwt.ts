import { decode, sign, verify } from "hono/jwt";
import { User } from "../models/user";

const SECRET_KEY = "secretekey1";

export const signToken = async (user: User) => {
  debugger;
  const _payload = {
    sub: user.name,
    role: "admin",
    org: "testOrg",
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token expires in 60 minutes 
  };
  const token = await sign(_payload, SECRET_KEY);
  console.log(token);
  return token;
};

export const verifyToken = async (token: string) => {
  try {
    return await verify(token, SECRET_KEY);
  } catch (err) {
    throw new Error("Invalid token");
  }
};
