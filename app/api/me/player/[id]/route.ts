import User from "@/models/User";
import { NextRequest } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { nickName, position, eloRating } = body;

    const asyncParams = await params;
    const { id } = asyncParams;

    const updated = await User.findByIdAndUpdate(
      id,
      {
        nickName,
        position,
        eloRating,
      },
      { new: true }
    );

    return Response.json({ message: "수정 완료", updated }, { status: 200 });
  } catch (error) {
    console.error("사용자 수정 중 오류: ", error);
    return Response.json(
      { error: "사용자 수정 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const asyncParams = await params;
    const { id } = asyncParams;

    if (!id) {
      return Response.json({ error: "ID가 없습니다." }, { status: 400 });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return Response.json(
        { error: "사용자를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return Response.json({ message: "삭제 완료" }, { status: 200 });
  } catch (error: any) {
    if (error.message === "NOT_FOUND") {
      return Response.json(
        { error: "존재하지 않는 사용자입니다." },
        { status: 401 }
      );
    }

    console.error("사용자 삭제 중 오류: ", error);
    return Response.json(
      { error: "사용자 삭제 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
