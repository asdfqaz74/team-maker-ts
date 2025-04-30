"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { selectedGroupAtom } from "@/store/group";
import { API } from "@/constants";
import { getToken } from "@/utils/client";

export default function GroupUserList() {
  const [selectedGroup] = useAtom(selectedGroupAtom);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!selectedGroup) return;

      const token = getToken();

      const response = await fetch(API.ME.GROUP.SELECTED_GROUP(selectedGroup), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUsers(data);
      } else {
        console.error("유저 불러오기 실패:", data.error);
      }
    };
    fetchUsers();
  }, [selectedGroup]);

  return (
    <div className="">
      <h3 className=" text-lg">선택한 그룹의 유저</h3>
      {users.length === 0 ? (
        <p className="text-gray-400">해당 그룹에 유저가 없습니다.</p>
      ) : (
        <ul className="">
          {users.map((user) => (
            <li key={user._id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
