export default function IsLoading() {
  return (
    <div className="flex flex-col gap-4 items-end">
      <span>그룹 불러오기</span>
      <select name="group" id="group-select">
        <option value="" className="text-black">
          불러오는 중입니다...
        </option>
      </select>
    </div>
  );
}
