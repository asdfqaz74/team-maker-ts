import Member from "@/models/Member";

export async function findMember(query) {
  const member = await Member.findOne(query);

  if (!member) throw new Error("NOT_FOUND");

  return member;
}
