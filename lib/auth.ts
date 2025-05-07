import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export async function getSessionAuth() {
  return await getServerSession(authOptions);
}
