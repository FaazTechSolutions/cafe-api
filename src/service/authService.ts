import { drizzle } from "drizzle-orm/d1";
import { Organization, OrganizationUser } from "../models/organization";
import { User } from "../models/user";
import { signToken } from "../utils/jwt";
import { tables } from "../db/drizzle";
import { generateGUID } from "../utils/guidGenerat";

export class AuthService {

 async authenticate(username: string, password: string, d1: D1Database) {
    const _user =await d1
      .prepare(`SELECT * FROM users WHERE username=?`)
      .bind(username)
      .first() as Partial<User>;
    if (_user) {
      const match =(_user.password===password)
      //const match=hasher.verifyPassword(password,user.password)
       if(match){
      // Verify and Generate a JWT token for the authenticated user
      // const token = signToken(user);
      const token = generateGUID();
      let user :Partial<User>={
          id:_user.id,
          userName:_user.userName,
          email:_user.email
      }

      return { token, user };
       }
    } else {
      throw new Error("Invalid username or password");
    }
  }

  async SignUp(user: User, d1: D1Database) {
    let createdUser: User;
    // hasher.hashPassword(user.password).then((pwd) => {
    //   user.password = pwd;
    // });
    await drizzle(d1)
      .insert(tables.users)
      .values(user)
      .returning({ id: tables.users.id, username: tables.users.userName });
  }
async checkUserAlreadyExists(username:string, d1:D1Database):Promise<boolean>{
   const _user =await d1
  .prepare(`SELECT * FROM users WHERE userName=?`)
  .bind(username)
  .first() as Partial<User>;
  return (_user!=null)
}
  async OrganizationSetUp(orgUser: OrganizationUser, d1: D1Database) {
    await drizzle(d1)
      .insert(tables.organizationUsers)
      .values(orgUser)
      .returning();
  }
  async createOrganaization(org: Organization,userName: string,d1: D1Database) {
    const [createdOrg] = await drizzle(d1)
      .insert(tables.organizations)
      .values(org)
      .returning();

    await drizzle(d1)
      .insert(tables.organizationUsers)
      .values({
        isDefault: 0,
        organizationId: createdOrg.id,
        username: userName,
      })
      .returning();
  }
}
