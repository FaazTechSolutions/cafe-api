//

const saltRounds = 10;
export class PasswordHasher{
   

    async  hashPassword(password: string): Promise<string> {
        try {          
            const hashedPassword = "";
            return hashedPassword;
        } catch (error) {
            throw new Error('Error hashing password: ' + error.message);
        }
    }
    async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        try {
            const match = true;
            return match;
        } catch (error) {
            throw new Error('Error verifying password: ' + error.message);
        }
    }
}
