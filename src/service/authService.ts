import { signToken } from "../utils/jwt";

export class AuthService {
  private users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' },
  ];

  authenticate(username: string, password: string) {
    debugger;
    const user = this.users.find(u => u.username == username && u.password == password);
    if (user) {
      // Generate a JWT token for the authenticated user
      
      const token = signToken(user);
      return { token, user };
    } else {
      throw new Error('Invalid username or password');
    }
  }
}
