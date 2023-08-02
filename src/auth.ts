import jwt from 'jsonwebtoken';

export const APP_SECRET = 'your-app-secret';

export const generateAccessToken = (user: { id: number }): string => {
  return jwt.sign({ userId: user.id }, APP_SECRET, { expiresIn: '15m' });
};

export const getUserId = (context: any): number => {
  const Authorization = context.req.headers.accessToken;
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, APP_SECRET) as { userId: number };
    return userId;
  }
  throw new Error('Not authenticated');
};
