import gsap from "gsap";
import { API } from "@/constants";
import SplitText from "gsap/SplitText";
import { Parsed } from "@/types/match";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ToastContextType } from "@/app/components/ToastContext";

type UploadFileProps = {
  onUploadSuccess: (data: Parsed) => void;
  showSnack: ToastContextType["showSnack"];
};

export default function UploadFile({
  onUploadSuccess,
  showSnack,
}: UploadFileProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isUploading || !textRef.current) return;

    let split: SplitText;
    let tl: gsap.core.Timeline;

    document.fonts.ready.then(() => {
      split = new SplitText(textRef.current!, { type: "chars" });
      gsap.set(textRef.current, { opacity: 1 });

      tl = gsap.timeline({ repeat: 30 });
      tl.from(split.chars, {
        duration: 1,
        y: 30,
        rotation: 90,
        opacity: 0,
        ease: "elastic",
        stagger: 0.03,
      });
    });

    return () => {
      if (tl) tl.kill();
      if (split) split.revert();
    };
  }, [isUploading]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
      setPreview(selectedFile.name);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      showSnack("파일을 선택해주세요.", "error");
      return;
    }

    if (!file.name.endsWith(".rofl")) {
      showSnack("잘못된 파일 형식입니다. .rofl 파일을 선택해주세요.", "error");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(API.ME.MATCH.UPLOAD, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        showSnack("파일 업로드 성공", "success");

        onUploadSuccess(data.match);
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
    <div className="p-4 border rounded flex justify-between items-center w-2/3">
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
        className={`mt-2 px-4 py-2 text-white rounded ${
          isUploading
            ? "cursor-not-allowed bg-gray-500"
            : "cursor-pointer bg-blue-600 hover:bg-blue-700"
        }`}
        onClick={() => handleUpload()}
        disabled={isUploading}
      >
        {isUploading ? (
          <div className="text-center">
            <div id="split" ref={textRef} className="opacity-0">
              업로드 중...
            </div>
          </div>
        ) : (
          "업로드"
        )}
      </button>
    </div>
  );
}
