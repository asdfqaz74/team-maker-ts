interface PickLoadingProps {
  title: "BEST" | "WORST" | "BAN";
}

const titleColor = {
  BEST: "#0FA4FE",
  WORST: "#F53B3B",
  BAN: "#B217CE",
} as const;

export default function PickLoading({ title }: PickLoadingProps) {
  const color = titleColor[title];

  return (
    <div className="border border-[#0FA4FE] p-10 rounded-2xl min-w-[17.5rem] max-w-[25rem] mx-auto lg:mx-0">
      <div className="font-[BlackOps] text-3xl flex gap-4 items-center justify-center whitespace-nowrap">
        <p style={{ color }}>{title}</p>
        <p>PICK 5</p>
      </div>

      <div className="flex flex-col gap-4 mt-10">
        {[...Array(5)].map((_, idx) => (
          <div
            key={idx}
            className="bg-white/10 flex w-[13.75rem] mx-auto rounded-2xl p-2 gap-4 items-center animate-pulse"
          >
            <div className="w-[100px] h-[100px] rounded-2xl bg-gray-700" />
            <div className="flex flex-col gap-2">
              <div className="w-24 h-4 bg-gray-600 rounded" />
              <div className="flex gap-2">
                <div className="w-16 h-3 bg-gray-600 rounded" />
                <div className="w-10 h-3 bg-gray-600 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
