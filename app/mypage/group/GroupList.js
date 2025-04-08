"use client";

import { useState, useEffect } from "react";

export default function GroupList() {
  const [groups, setGroups] = useState([]);

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
  }, []);

  return (
    <div>
      <span>그룹 불러오기</span>
      <select name="group" id="group-select">
        <option value="">그룹을 선택하세요</option>
        {groups.map((group) => (
          <option key={group._id} value={group._id}>
            {group.name}
          </option>
        ))}
      </select>
    </div>
  );
}
