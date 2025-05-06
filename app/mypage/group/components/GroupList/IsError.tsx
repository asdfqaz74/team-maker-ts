import { useToast } from "@/app/components/ToastContext";

export default function IsError({ error }: { error: Error }) {
  const { showSnack } = useToast();

  showSnack(error.message, "error");
  return (
    <div className="flex flex-col gap-4 items-end">
      <span>그룹을 불러오는데 실패하였습니다.</span>
    </div>
  );
}
