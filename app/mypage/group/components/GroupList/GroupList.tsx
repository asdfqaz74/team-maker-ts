"use client";

import { ChangeEvent } from "react";
import { useAtom } from "jotai";
import { selectedGroupAtom } from "@/store/group";
import { useQuery } from "@tanstack/react-query";
import { fetchGroupList } from "@/lib/api/fetchGroupList";
import IsLoading from "./IsLoading";
import IsError from "./IsError";

export default function GroupList() {
  const [, setSelectedGroup] = useAtom(selectedGroupAtom);

  const {
    data: groupList = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["groupList"],
    queryFn: fetchGroupList,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 60,
  });

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedGroup(e.target.value);
  };

  if (isLoading) return <IsLoading />;
  if (isError) return <IsError error={error} />;

  return (
    <div className="flex flex-col gap-4 items-end">
      <span>그룹 불러오기</span>
      <select name="group" id="group-select" onChange={handleSelect}>
        <option value="" className="text-black">
          그룹을 선택하세요
        </option>
        {groupList.map((group) => (
          <option key={group._id} value={group._id} className="text-black">
            {group.name}
          </option>
        ))}
      </select>
    </div>
  );
}
