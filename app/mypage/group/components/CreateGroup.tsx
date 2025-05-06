import { useState } from "react";
import { API } from "@/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/app/components/ToastContext";

export default function CreateGroup() {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [groupName, setGroupName] = useState("");
  const { showSnack } = useToast();
  const queryClient = useQueryClient();

  const handleCreateGroupButton = async () => {
    setButtonClicked((c) => !c);
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      showSnack("그룹 이름을 입력해주세요.", "error");
      return;
    }

    try {
      const response = await fetch(API.ME.GROUP.LIST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name: groupName }),
      });

      if (response.ok) {
        showSnack("그룹 생성 완료", "success");
        setGroupName("");
        setButtonClicked(false);
        queryClient.invalidateQueries({ queryKey: ["groupList"] });
      }
    } catch (error: any) {
      showSnack(error.message, "error");
    }
  };

  return (
    <>
      <div className="flex justify-between items-end">
        <h1 className="text-4xl">그룹 관리</h1>
        <button className="cursor-pointer" onClick={handleCreateGroupButton}>
          그룹 생성
        </button>
      </div>
      {buttonClicked && (
        <div>
          <span>그룹 생성하기</span>
          <input
            type="text"
            placeholder="그룹 이름"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <button className="cursor-pointer" onClick={handleCreateGroup}>
            생성하기
          </button>
        </div>
      )}
    </>
  );
}
