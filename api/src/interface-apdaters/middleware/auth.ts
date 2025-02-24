import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AuthRequest } from "../../entities/controllerInterfaces/authType"; 

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];
  console.log("token-->",token)

  if (!token) {
    res.status(401).json({ message: "Access Denied: No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as { id: string; role: string };
    console.log("Decoded token-->",decoded)
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
    return;
  }
};

export const authorizeRoles = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ message: "Unauthorized: Insufficient permissions" });
      return;
    }
    next();
  };
};
