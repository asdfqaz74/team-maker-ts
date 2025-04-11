export const config = {
  api: {
    bodyParser: false,
  },
};

import { connectDB } from "@/lib/mongoose";
import { processRoflFile } from "@/utils/processRoflFile";
const fs = require("fs");
const path = require("path");
const os = require("os");

export async function POST(request) {
  await connectDB();

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return Response.json(
        { error: "파일이 유효하지 않습니다." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const tempPath = path.join(os.tmpdir(), `${Date.now()}-${file.name}`);
    fs.writeFileSync(tempPath, buffer);

    const parsed = await processRoflFile(tempPath);

    fs.unlinkSync(tempPath);

    return Response.json(
      { message: "파일 업로드 성공", data: parsed },
      { status: 200 }
    );
  } catch (error) {
    console.error("파일 업로드 중 오류: ", error);
    return Response.json(
      { error: "파일 업로드 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
