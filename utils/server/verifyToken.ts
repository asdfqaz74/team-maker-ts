import { SECRET } from "@/constants";
import jwt from "jsonwebtoken";

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    throw new Error("INVALID_TOKEN");
  }
}
