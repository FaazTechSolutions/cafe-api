import { drizzle } from "drizzle-orm/d1";
import { Organization, OrganizationUser } from "../models/organization";
import { User } from "../models/user";
import { signToken } from "../utils/jwt";
import { PasswordHasher } from "../utils/passwordHasher";
import { tables } from "../db/drizzle";
import { generateGUID } from "../utils/guidGenerat";
const hasher = new PasswordHasher();

export class AuthService {
  private users = [
    { id: 1, username: "user1", password: "password1", role: "R" },
    { id: 2, username: "user2", password: "password2", role: "P" },
  ];

  authenticate(username: string, password: string,d1:D1Database) {
    
    const user = d1.prepare(`SELECT * FROM users WHERE username=?`).bind(username).first() as Partial<User>
    if (user) {      
      const match=hasher.verifyPassword(password,user.password)
      if(match){
        // Verify and Generate a JWT token for the authenticated user
       // const token = signToken(user);
       const token=generateGUID();
        return { token, user };
      }      
    } else {
      throw new Error("Invalid username or password");
    }
  }

  async SignUp(user: User, d1: D1Database) {
   
    let createdUser: User;
    hasher.hashPassword(user.password).then((pwd) => {
      user.password = pwd;
    });
    await drizzle(d1).insert(tables.users).values(user).execute() 
  }

  async OrganizationSetUp(orgUser: OrganizationUser, d1: D1Database) {
    await drizzle(d1).insert(tables.organizationUsers).values(orgUser).execute() 
  }
  async createOrganaization(org:Organization,d1:D1Database){
    await drizzle(d1).insert(tables.organizations).values(org).execute() 
  }
}
