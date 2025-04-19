import { connectDB } from "@/lib/mongoose";

export async function GET(request, { params }) {
  await connectDB();
}
