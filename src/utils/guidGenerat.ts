import { v4 as uuidv4 } from 'uuid';

export function generateGUID(): string {
    return uuidv4();
}