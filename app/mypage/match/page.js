"use client";

import { Alert, Slide, Snackbar } from "@mui/material";
import PlayerNicknameEditor from "./PlayerNicknameEditor";
import UploadFile from "./UploadFile";
import { useState } from "react";

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

export default function MatchPage() {
  const [parsed, setParsed] = useState(null);

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
    <div>
      <h1>매칭 관리</h1>
      <p>매칭 관리 페이지입니다.</p>
      {parsed ? (
        <PlayerNicknameEditor
          playersData={parsed?.players}
          maxDamage={parsed?.maxDamage}
          onSubmit={() => {
            setParsed(null);
          }}
          showSnack={showSnack}
        />
      ) : (
        <UploadFile
          onUploadSuccess={(data) => setParsed(data)}
          showSnack={showSnack}
        />
      )}
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
