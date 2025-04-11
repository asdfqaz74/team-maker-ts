"use client";

import { useState } from "react";

export default function UploadFile({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
      setPreview(selectedFile.name);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/me/match/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      alert("파일 업로드 성공: " + data.message);
      onUploadSuccess(data.data);
    } else {
      alert("파일 업로드 실패: " + data.error);
    }
  };

  return (
    <div className="p-4 border rounded">
      <input type="file" accept=".rofl" onChange={handleFileChange} />
      {preview && <p className="mt-2">선택한 파일: {preview}</p>}
      <button
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleUpload}
      >
        업로드
      </button>
    </div>
  );
}
