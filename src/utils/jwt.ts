import jwt from 'jsonwebtoken';

const SECRET_KEY = 'secretekey1'; 

export const signToken = (payload: object, expiresIn: string | number = '1h') => {
    debugger
    const token=  jwt.sign(payload, SECRET_KEY, { expiresIn }); 
    console.log(token)
    return token;
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new Error('Invalid token');
  }
};
