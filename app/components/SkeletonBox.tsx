export default function SkeletonBox({ width = "w-full", height = "h-6" }) {
  return (
    <div className={`bg-gray-200 animate-pulse rounded ${width} ${height}`} />
  );
}
