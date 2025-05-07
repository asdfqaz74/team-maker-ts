"use client";

import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
import { createContext, useContext, useState } from "react";

interface ShowSnackType {
  message: string;
  type: "success" | "error" | "warning" | "info";
}

export type ToastContextType = {
  showSnack: (message: string, type: ShowSnackType["type"]) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

function SlideTransition(props: SlideProps) {
  return (
    <Slide {...props} direction="left">
      {props.children}
    </Slide>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  // 토스트 관리를 위한 상태
  const [snackMessage, setSnackMessage] = useState("");
  const [snackColor, setSnackColor] =
    useState<ShowSnackType["type"]>("success");
  const [state, setState] = useState({
    open: false,
    Transition: SlideTransition,
  });

  // 토스트 핸들러
  const showSnack = (
    message: string,
    type: ShowSnackType["type"] = "success"
  ) => {
    setSnackMessage(message);
    setSnackColor(type);
    setState({ open: true, Transition: SlideTransition });
  };

  const handleSnackClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <ToastContext.Provider value={{ showSnack }}>
      {children}
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
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast는 ToastProvider 안에서만 사용할 수 있습니다.");
  }
  return context;
};
