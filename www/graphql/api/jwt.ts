export const jwtConfig = {
  issuer: 'defiverr.app',
  subject: 'viewer',
  audience: 'localhost',
};

export const jwtCookieName = 'jwt';

export interface JwtData {
  id: string;
}
