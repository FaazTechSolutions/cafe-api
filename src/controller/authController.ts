import appHono from "../honoAppBinding";
import { validateRequest } from "../middleware/validateRequest";
import { loginValidation } from "../models/login";
import { AuthService } from "../service/authService";
import { errorResponse, successResponse } from "../utils/apiResponce";

const authService = new AuthService();
const app = appHono;

app.post("/login", validateRequest(loginValidation), async (c) => {
  const { username, password } = await c.req.json();
  try {
    const { token, user } = authService.authenticate(username, password);
    return c.json(successResponse({ token, user }));
  } catch (err) {
    return c.json(errorResponse("Invalid username or password"), 401);
  }
});

export default app;
