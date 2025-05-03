import { Divider } from "@mui/material";

export default function UnSelected() {
  return (
    <div className="text-black max-w-[43.75rem] bg-white rounded-xl p-4 h-5/6 flex flex-col">
      <div>
        <h2 className="text-2xl font-bold mb-4">내전 멤버 관리</h2>
        <Divider sx={{ borderColor: "#888888", marginBottom: 3 }} />
      </div>

      <div>
        <span className="text-xl font-semibold">멤버 정보 관리</span>
        <div className="mb-2 flex gap-2 items-center">
          <span className="w-12">닉네임</span>
          <input
            type="text"
            disabled
            className="border px-2 py-1 w-40 bg-gray-100 text-gray-500"
            placeholder="선수 선택 필요"
          />
          <span>포지션</span>
          <select disabled className="bg-gray-100 text-gray-500">
            <option>선택</option>
          </select>
        </div>
      </div>

      <span className="text-gray-500 italic mb-2">선수 선택 전입니다.</span>

      <label className="block font-semibold mb-2 text-gray-400">ELO 관리</label>
      <div className="flex gap-4">
        {["top", "jug", "mid", "adc", "sup"].map((lane) => (
          <div key={lane} className="mb-2 flex gap-2 items-center">
            <span className="w-12 capitalize">{lane}</span>
            <input
              type="number"
              disabled
              className="border px-2 py-1 w-24 bg-gray-100 text-gray-500"
              placeholder="-"
            />
          </div>
        ))}
      </div>

      <button
        disabled
        className="cursor-not-allowed bg-gray-300 text-white p-2 rounded mt-2"
      >
        수정하기
      </button>
      <button
        disabled
        className="cursor-not-allowed bg-gray-300 text-white p-2 rounded mt-1"
      >
        삭제하기
      </button>
    </div>
  );
}
