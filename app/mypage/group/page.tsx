"use client";

import { useState } from "react";
import GroupList from "./GroupList";
import { useAtom } from "jotai";
import { groupListAtom } from "@/store/group";
import PlayerList from "./PlayerList";
import GroupUserList from "./GroupUserList";
import { getToken } from "@/utils/getToken";
import { useToast } from "@/app/components/ToastContext";
import { API } from "@/constants";

export default function GroupPage() {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [, setGroups] = useAtom(groupListAtom);
  const { showSnack } = useToast();

  const handleCreateGroupButton = async () => {
    setButtonClicked((c) => !c);
  };

  const handleCreateGroup = async () => {
    const token = getToken();

    if (!groupName.trim()) {
      showSnack("그룹 이름을 입력해주세요.", "error");
      return;
    }

    const response = await fetch(API.ME.GROUP.LIST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: groupName }),
    });

    const data = await response.json();

    if (response.ok) {
      showSnack("그룹 생성 완료", "success");
      setGroupName("");
      setButtonClicked(false);

      const response = await fetch(API.ME.GROUP.LIST, {
        headers: { authorization: `Bearer ${token}` },
      });

      const newData = await response.json();
      setGroups(newData.groups);
    } else {
      showSnack(data.error, "error");
    }
  };

  return (
    <div className="w-full text-black">
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
      <GroupList />
      <div className="flex mt-10 justify-evenly">
        <PlayerList />
        <GroupUserList />
      </div>
    </div>
  );
}
