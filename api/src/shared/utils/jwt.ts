import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

export const generateAccessToken = (user: { id: string; role: string }) => {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (user: { id: string; role: string }) => {
  return jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};
