import { Document } from "mongoose";

// 패스워드 제외한 멤버 타입
export interface ExceptPasswordMember {
  userId: string;
  name: string;
  email: string;
  password?: string;
}

// 몽구스 Document 타입 결합
export type ExceptPasswordMemberDocument = Document<
  unknown,
  {},
  ExceptPasswordMember
> &
  ExceptPasswordMember;
