import SkeletonBox from "@/app/components/SkeletonBox";
import Category from "@/public/images/components/Category.svg";

export default function InfoLoading() {
  return (
    <div className="w-full text-black">
      <div className="flex justify-between items-center mb-10">
        <h1 className="font-bold text-2xl flex items-center gap-4">
          <Category />
          <SkeletonBox width="w-32" height="h-8" />
        </h1>
        <SkeletonBox width="w-24" height="h-8" />
      </div>

      <div className="w-full bg-white rounded-2xl px-8 py-6 gap-4 max-w-[30rem]">
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-10 font-bold">
            <SkeletonBox width="w-16" />
            <SkeletonBox width="w-16" />
            <SkeletonBox width="w-16" />
          </div>
          <div className="flex flex-col gap-10">
            <SkeletonBox width="w-40" />
            <SkeletonBox width="w-40" />
            <SkeletonBox width="w-40" />
          </div>
        </div>
      </div>
    </div>
  );
}
