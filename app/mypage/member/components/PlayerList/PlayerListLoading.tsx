export default function PlayerListLoading() {
  return (
    <div className="p-4 text-black max-w-[21.875rem] bg-white rounded-xl h-5/6 flex flex-col">
      <div>
        <div className="h-7 w-48 bg-gray-300 rounded mb-4 animate-pulse" />
        <div className="h-[1px] bg-gray-400 mb-3" />
      </div>
      <ul className="space-y-3 overflow-y-auto flex-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <li
            key={i}
            className="border p-4 rounded shadow-sm flex justify-between bg-white animate-pulse"
          >
            <div className="space-y-2">
              <div className="h-4 w-32 bg-gray-300 rounded" />
              <div className="h-4 w-40 bg-gray-300 rounded" />
              <div className="h-4 w-28 bg-gray-300 rounded" />
              <div className="h-4 w-48 bg-gray-300 rounded" />
            </div>
            <div className="h-4 w-12 bg-gray-300 rounded" />
          </li>
        ))}
      </ul>
    </div>
  );
}
