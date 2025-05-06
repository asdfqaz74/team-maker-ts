import Group from "@/models/Group";
import { checkToken, findMember, verifyToken } from "@/utils/server";
import { NextRequest } from "next/server";

export async function POST(request: Request) {
  const result = await checkToken(request.headers);

  if (!result.ok) return result.response;

  const token = result.token;

  try {
    const decoded = verifyToken(token);
    const userId = decoded.userId;

    const member = await findMember({ userId });

    const body = await request.json();
    const { name } = body;

    if (!name) {
      return Response.json(
        { error: "그룹 이름은 필수입니다." },
        { status: 400 }
      );
    }

    const newGroup = await Group.create({
      name,
      createdBy: member._id,
    });

    return Response.json({ group: newGroup }, { status: 201 });
  } catch (error: any) {
    if (error.message === "NOT_FOUND") {
      return Response.json(
        { error: "존재하지 않는 사용자입니다." },
        { status: 401 }
      );
    }

    console.error("그룹 생성 중 오류: ", error);
    return Response.json(
      { error: "그룹 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// 그룹 목록 조회
export async function GET(request: NextRequest) {
  const userId = await checkToken(request);

  try {
    const member = await findMember({ userId });

    const memberId = member._id;
    const groups = await Group.find({ createdBy: memberId }).select(
      "-__v -createdAt -createdBy -updatedAt"
    );

    return Response.json({ groups }, { status: 200 });
  } catch (error: any) {
    if (error.message === "NOT_FOUND") {
      return Response.json(
        { error: "존재하지 않는 사용자입니다." },
        { status: 401 }
      );
    }

    console.error("그룹 조회 중 오류: ", error);
    return Response.json(
      { error: "그룹 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
