import Member from "@/models/Member";

type FindMemberQuery = Partial<{
  userId: string;
  name: string;
  email: string;
}>;

export async function findMember(query: FindMemberQuery) {
  const member = await Member.findOne(query);

  if (!member) throw new Error("NOT_FOUND");

  return member;
}
