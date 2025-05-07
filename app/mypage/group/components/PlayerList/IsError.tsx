import { useToast } from "@/app/components/ToastContext";

export default function IsError({ error }: { error: Error }) {
  const { showSnack } = useToast();

  showSnack(error.message, "error");

  return (
    <div className="flex flex-col gap-4">
      <span>선수목록</span>
      <span>선수목록 로딩에 실패하였습니다.</span>
    </div>
  );
}
