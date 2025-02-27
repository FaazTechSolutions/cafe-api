import appHono from "../honoAppBinding";
import { validateRequest } from "../middleware/validateRequest";
import { loginValidation } from "../models/login";
import { Organization, OrganizationUser, OrganizationUserValidation, OrganizationValidatoin } from "../models/organization";
import { User, userValidation } from "../models/user";
import { AuthService } from "../service/authService";
import { errorResponse, successResponse } from "../utils/apiResponce";

const authService = new AuthService();
const app = appHono;

app.post("/login", validateRequest(loginValidation), async (c) => {
  const { username, password } = await c.req.json();
  try {
    const { token, user } = await authService.authenticate(username, password,c.env.DB);
    return c.json(successResponse({ token, user }));
  } catch (err) {
    return c.json(errorResponse("Invalid username or password"), 401);
  }
})

app.post('/signup',validateRequest(userValidation),async(c)=>{
   const user=await c.req.json() as User
    const isExists =await authService.checkUserAlreadyExists(user.userName,c.env.DB)
    debugger;
    if(isExists){
      return c.json(errorResponse("User Already Exists"))
    }
    await authService.SignUp(user,c.env.DB);
    return c.json(successResponse(user.id));
})

app.post('/orgSetup',validateRequest(OrganizationUserValidation),async(c)=>{
  const orgUser=await c.req.json() as OrganizationUser  
 await authService.OrganizationSetUp(orgUser,c.env.DB);
 return c.json(successResponse(orgUser));
})
app.post('/createOrg/:userName',validateRequest(OrganizationValidatoin),async(c)=>{
  const p = c.req.param()
  const org=await c.req.json() as Organization
 const createdOrg= await authService.createOrganaization(org,p.userName,c.env.DB);
  return c.json(successResponse(org));
})
app.post('/changePassword',validateRequest(userValidation),async(c)=>{
  
})

export default app;
