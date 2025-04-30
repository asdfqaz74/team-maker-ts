import { IGroup } from "@/models/Group";
import User from "@/models/User";
import { UserDocument } from "@/types/user";
import { checkToken, findMember, verifyToken } from "@/utils/server";

export async function GET(request: Request) {
  const result = await checkToken(request.headers);

  if (!result.ok) return result.response;

  const token = result.token;

  try {
    const decoded = verifyToken(token);
    const userId = decoded.userId;

    const member = await findMember({ userId });

    const users = await User.find<UserDocument>({ createdBy: member._id })
      .select("name nickName position group eloRating")
      .populate("group", "name");

    const formattedUsers = users.map((user) => ({
      ...user.toObject(),
      groupName: (user.group as IGroup).name || "그룹 없음",
    }));

    return Response.json(formattedUsers, { status: 200 });
  } catch (error: any) {
    if (error.message === "NOT_FOUND") {
      return Response.json(
        { error: "존재하지 않는 사용자입니다." },
        { status: 401 }
      );
    }

    console.error("사용자 조회 중 오류: ", error);
    return Response.json(
      { error: "사용자 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const result = await checkToken(request.headers);

  if (!result.ok) return result.response;

  const token = result.token;

  try {
    const decoded = verifyToken(token);
    const userId = decoded.userId;

    const member = await findMember({ userId });

    const body = await request.json();
    const { name, nickName, position } = body;

    if (!name || !nickName) {
      return Response.json(
        { error: "이름과 닉네임은 필수입니다." },
        { status: 400 }
      );
    }

    const newUser = await User.create({
      name,
      nickName,
      position,
      createdBy: member._id,
    });

    return Response.json(newUser, { status: 201 });
  } catch (error: any) {
    if (error.message === "NOT_FOUND") {
      return Response.json(
        { error: "존재하지 않는 사용자입니다." },
        { status: 401 }
      );
    }

    console.error("사용자 생성 중 오류: ", error);
    return Response.json(
      { error: "사용자 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function Delete(request: Request) {
  const result = await checkToken(request.headers);

  if (!result.ok) return result.response;

  const token = result.token;

  try {
    const decoded = verifyToken(token);
    const userId = decoded.userId;

    const member = await findMember({ userId });

    const body = await request.json();
    const { id } = body;

    if (!id) {
      return Response.json({ error: "ID는 필수입니다." }, { status: 400 });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return Response.json(
        { error: "사용자를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return Response.json(
      { message: "사용자가 삭제되었습니다." },
      { status: 200 }
    );
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
