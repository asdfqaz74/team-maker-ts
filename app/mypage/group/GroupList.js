"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { groupListAtom, selectedGroupAtom } from "@/store/group";

export default function GroupList() {
  const [groups, setGroups] = useAtom(groupListAtom);
  const [, setSelectedGroup] = useAtom(selectedGroupAtom);

  useEffect(() => {
    const fetchGroups = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      const response = await fetch("/api/me/group", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setGroups(data.groups);
      }
    };

    fetchGroups();
  }, [setGroups]);

  const handleSelect = (e) => {
    setSelectedGroup(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4 items-end">
      <span>그룹 불러오기</span>
      <select name="group" id="group-select" onChange={handleSelect}>
        <option value="" className="text-black">
          그룹을 선택하세요
        </option>
        {groups.map((group) => (
          <option key={group._id} value={group._id} className="text-black">
            {group.name}
          </option>
        ))}
      </select>
    </div>
  );
}
