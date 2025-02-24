// src/infrastructure/controllers/RefreshTokenController.ts
import { Request, Response } from "express";
import { TokenService } from "../../../../frameworks/Servise/Tocken.servise";

export class RefreshTokenController {
  async refreshAccessToken(req: Request, res: Response): Promise<void> {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(401).json({ message: "Refresh token required" });
      return;
    }

    const user = TokenService.verifyRefreshToken(refreshToken);
    if (!user) {
      res.status(403).json({ message: "Invalid refresh token" });
      return;
    }

    const newAccessToken = TokenService.generateAccessToken({
      id: user.id,
      role: user.role,
    });

    res.json({ accessToken: newAccessToken });
  }
}