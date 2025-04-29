import Category from "@/public/images/components/Category.svg";

export default function InfoEmpty() {
  return (
    <div className="w-full text-black">
      <div className="flex justify-between items-center mb-10">
        <h1 className="font-bold text-2xl flex items-center gap-4">
          <Category />
          <span>내 정보</span>
        </h1>
        <button className="px-2 py-1 bg-[#FF5B32] rounded-2xl text-sm text-white cursor-pointer hover:bg-[#d9483a] transition-colors duration-200">
          수정하기
        </button>
      </div>

      <div className="w-full bg-white rounded-2xl px-8 py-6 gap-4">
        <div className="flex justify-between gap-4 max-w-[30rem]">
          <div className="flex flex-col gap-10 font-bold">
            <h2>아이디</h2>
            <h2>이메일</h2>
            <h2>이름</h2>
          </div>
          <div className="flex flex-col gap-10">
            <p>-</p>
            <p>-</p>
            <p>-</p>
          </div>
        </div>
      </div>
    </div>
  );
}
