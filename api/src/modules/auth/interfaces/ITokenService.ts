export interface JwtPayload {
  id: string;
  email: string;
  role: 'candidate' | 'employer' | 'admin';
  exp?: number;
  iat?: number;
}

export interface ITokenService {
  generateAccessToken(payload: JwtPayload): string;
  generateRefreshToken(payload: JwtPayload): string;
  verifyAccessToken(token: string): JwtPayload | null;
  verifyRefreshToken(token: string): JwtPayload | null;
  decodeAccessToken(token: string): JwtPayload | null;
}
