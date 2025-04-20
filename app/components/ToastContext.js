"use client";

import { Alert, Slide, Snackbar } from "@mui/material";
import { createContext, useContext, useState } from "react";

const ToastContext = createContext(null);

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

export function ToastProvider({ children }) {
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

export const useToast = () => useContext(ToastContext);
