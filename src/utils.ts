import jwt from 'jsonwebtoken';

export const validatePassword = (password: string): boolean => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return password.length
  >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
};

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const VERIFICATION_TOKEN_EXPIRY = '1d'; // 1 day

export const generateVerificationToken = (userId: number): string => jwt.sign({
  userId,
  purpose: 'email_verification',
}, JWT_SECRET, {
  expiresIn: VERIFICATION_TOKEN_EXPIRY,
});

export const verifyToken = (token: string): { userId: number } | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; purpose: string };
    if (decoded.purpose !== 'email_verification') {
      return null;
    }
    return { userId: decoded.userId };
  } catch (error) {
    return null;
  }
};
