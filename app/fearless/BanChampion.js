export default function BanChampion({ onClick }) {
  return (
    <div>
      <p>1경기</p>
      <button className="cursor-pointer bg-gray-800" onClick={onClick}>
        설정하기
      </button>
    </div>
  );
}
