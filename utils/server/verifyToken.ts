import { SECRET } from "@/constants";
import jwt from "jsonwebtoken";

interface DecodedToken {
  userId: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
}

export function verifyToken(token: string): DecodedToken {
  try {
    const verified = jwt.verify(token, SECRET) as DecodedToken;
    return verified;
  } catch (error) {
    throw new Error("INVALID_TOKEN");
  }
}
