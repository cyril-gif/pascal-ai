import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const generateToken = (
  id: string,
  email: string,
  role: string
) => {
  return jwt.sign(
    {
      id,
      email,
      role,
    },
    env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};