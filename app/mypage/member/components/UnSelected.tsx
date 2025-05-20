import { Divider } from "@mui/material";
import User from "@/public/images/components/User.svg";

export default function UnSelected() {
  return (
    <div className="text-black max-w-[43.75rem] bg-white rounded-xl p-4 h-5/6 flex flex-col">
      <div>
        <div className="flex justify-between items-end mb-4">
          <div className="flex items-center gap-2">
            <User />
            <h2 className="text-2xl font-bold">내전 멤버 관리</h2>
          </div>
        </div>
        <Divider sx={{ borderColor: "#888888", marginBottom: 3 }} />
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-4">멤버 정보 관리</h3>
        <div className="mb-2 flex gap-2 flex-col">
          <div className="flex gap-14 items-center">
            <span>닉네임</span>
            <input
              type="text"
              disabled
              className="border px-2 py-1 w-40 bg-gray-100 text-gray-500"
              placeholder="선수 선택 필요"
            />
          </div>
          <div className="flex gap-14 items-center">
            <span>포지션</span>
            <select disabled className="bg-gray-100 text-gray-500">
              <option>선택</option>
            </select>
          </div>
        </div>
      </div>
      <Divider sx={{ borderColor: "#888888", marginBottom: 3 }} />
      <label className="block font-semibold mb-2">ELO 관리</label>
      <div className="grid grid-cols-2 gap-4 mb-2">
        {["top", "jug", "mid", "adc", "sup"].map((lane) => (
          <div key={lane} className="flex gap-4 items-center">
            <span className="capitalize">{lane}</span>
            <input
              type="number"
              disabled
              className="border px-2 py-1 w-24 bg-gray-100 text-gray-500"
              placeholder="-"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-10">
        <button className="cursor-not-allowed bg-red-400 px-4 py-2 rounded">
          삭제하기
        </button>
        <button className="cursor-not-allowed bg-sky-400 px-4 py-2 rounded">
          수정하기
        </button>
      </div>
    </div>
  );
}
