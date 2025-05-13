"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import { selectedGroupAtom } from "@/store/group";
import { useQuery } from "@tanstack/react-query";
import { fetchGroupUsers } from "@/lib/api/fetchGroupUsers";
import type { GroupUserList } from "@/types/group";

export default function GroupUserList() {
  const [selectedGroup] = useAtom(selectedGroupAtom);
  const [users, setUsers] = useState([]);

  const {
    data: groupUsers = [],
    isLoading,
    isError,
    error,
  } = useQuery<GroupUserList>({
    queryKey: ["groupUsers", selectedGroup],
    queryFn: () => fetchGroupUsers(selectedGroup),
    enabled: !!selectedGroup,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 60,
  });

  return (
    <div className="">
      <h3 className=" text-lg">선택한 그룹의 유저</h3>
      {groupUsers.length === 0 ? (
        <p className="text-gray-400">해당 그룹에 유저가 없습니다.</p>
      ) : (
        <ul className="">
          {groupUsers.map((user) => (
            <li key={user._id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
