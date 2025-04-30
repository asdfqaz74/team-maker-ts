import Member from "@/models/Member";
import { ExceptPasswordMemberDocument } from "@/types/member";

type FindMemberQuery = Partial<{
  userId: string;
  name: string;
  email: string;
  password?: string;
}>;

export async function findMember(query: FindMemberQuery) {
  const member = await Member.findOne<ExceptPasswordMemberDocument>(
    query
  ).select("-password");

  if (!member) throw new Error("NOT_FOUND");

  return member;
}

export async function findMemberWithPassword(query: FindMemberQuery) {
  const member = await Member.findOne<ExceptPasswordMemberDocument>(query);

  if (!member) throw new Error("NOT_FOUND");

  return member;
}
