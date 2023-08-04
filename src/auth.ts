import jwt from 'jsonwebtoken';

export const APP_SECRET = 'your-app-secret';

export const generateAccessToken = (user: { id: number }): string => {
  return jwt.sign({ userId: user.id }, APP_SECRET, { expiresIn: '7d' });
};

export const getUserId = (token: string) => {
  const user = jwt.verify(token, APP_SECRET) as { userId: number };
  // console.log('User ID:', user);
  return user.userId;
};

  
