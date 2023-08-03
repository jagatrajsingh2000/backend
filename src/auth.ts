import jwt from 'jsonwebtoken';

export const APP_SECRET = 'your-app-secret';

export const generateAccessToken = (user: { id: number }): string => {
  return jwt.sign({ userId: user.id }, APP_SECRET, { expiresIn: '15m' });
};

export const getUserId = (req: any): number | undefined => {
    const AccessToken = req.headers.accesstoken; // Use "AccessToken" instead of "authorization"
    if (AccessToken) {
        console.log(AccessToken);
      const token = AccessToken.replace('Bearer ', '');
      const  userId  = jwt.verify(AccessToken, APP_SECRET)
      console.log(userId);
      return 1;
    }
    return undefined; // Return undefined if the user is not authenticated
  };
  
