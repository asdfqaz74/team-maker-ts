"use client";

import { Alert, Slide, Snackbar } from "@mui/material";
import { useState } from "react";

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

export default function UploadFile({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // 토스트 관리를 위한 상태
  const [snackMessage, setSnackMessage] = useState("");
  const [snackColor, setSnackColor] = useState("success");
  const [state, setState] = useState({
    open: false,
    Transition: SlideTransition,
  });

  // 토스트 핸들러
  const showSnack = (message, type = "success") => {
    setSnackMessage(message);
    setSnackColor(type);
    setState({ open: true, Transition: SlideTransition });
  };

  const handleSnackClose = () => {
    setState({ ...state, open: false });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
      setPreview(selectedFile.name);
    }
  };

  const handleUpload = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!file) {
      showSnack("파일을 선택해주세요.", "error");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${baseUrl}/match/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        showSnack("파일 업로드 성공");

        setTimeout(() => {
          onUploadSuccess(data.match);
        }, 800);
      } else {
        showSnack(`파일 업로드 실패: ${data.error}`, "error");
      }
    } catch (error) {
      showSnack("파일 업로드 중 에러 발생", "error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-4 border rounded flex justify-between items-center">
      <div className="flex gap-4">
        <label
          htmlFor="fileInput"
          className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer inline-block"
        >
          파일선택
        </label>
        <input
          id="fileInput"
          type="file"
          accept=".rofl"
          onChange={handleFileChange}
          className="hidden"
        />
        {preview ? (
          <p className="mt-2">{preview}</p>
        ) : (
          <p className="mt-2 text-gray-400">선택된 파일 없음</p>
        )}
      </div>
      <button
        className={`mt-2 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 ${
          isUploading ? "cursor-not-allowed bg-gray-500" : ""
        }`}
        onClick={() => handleUpload()}
        disabled={isUploading}
      >
        업로드
      </button>
      <Snackbar
        open={state.open}
        autoHideDuration={3000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        slots={{ transition: state.Transition }}
      >
        <Alert onClose={handleSnackClose} severity={snackColor}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
