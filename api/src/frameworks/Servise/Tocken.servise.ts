// src/application/services/TokenService.ts
import jwt from "jsonwebtoken";

export class TokenService {
  static generateAccessToken(payload: { id: string; role?: string }): string {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
      expiresIn: "30m",
    });
  }

  static generateRefreshToken(payload: { id: string; role?: string }): string {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {
      expiresIn: "7d",
    });
  }

  static verifyRefreshToken(token: string): { id: string; role?: string } | null {
    try {
      return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string) as {
        id: string;
        role?: string;
      };
    } catch (error) {
      return null;
    }
  }
}