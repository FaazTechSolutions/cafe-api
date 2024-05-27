import * as bcrypt from 'bcrypt';

const saltRounds = 10;
export class PasswordHasher{
   

    async  hashPassword(password: string): Promise<string> {
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt);
            return hashedPassword;
        } catch (error) {
            throw new Error('Error hashing password: ' + error.message);
        }
    }
    async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        try {
            const match = await bcrypt.compare(password, hashedPassword);
            return match;
        } catch (error) {
            throw new Error('Error verifying password: ' + error.message);
        }
    }
}
