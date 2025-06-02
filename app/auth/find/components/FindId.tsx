import { API } from "@/constants";
import { useReducer } from "react";
import { useToast } from "@/app/components/ToastContext";

type State = {
  name: string;
  email: string;
  userId: string;
};

type Action =
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_USER_ID"; payload: string }
  | { type: "RESET_USER_ID" };

const initialState: State = {
  name: "",
  email: "",
  userId: "",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_USER_ID":
      return { ...state, userId: action.payload };
    case "RESET_USER_ID":
      return { ...state, userId: "" };
    default:
      return state;
  }
}

type FindIdResponse =
  | {
      message: string;
      userId: string;
    }
  | {
      error: string;
    };

export default function FindId() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { showSnack } = useToast();

  const handleFindId = async () => {
    const response = await fetch(API.AUTH.FIND_ID, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        findIdName: state.name,
        findIdEmail: state.email,
      }),
    });
    const data: FindIdResponse = await response.json();

    if ("userId" in data) {
      dispatch({ type: "SET_USER_ID", payload: data.userId });
      showSnack("아이디 찾기 성공", "success");
    } else {
      dispatch({ type: "RESET_USER_ID" });
      showSnack(data.error || "아이디 찾기 실패", "error");
    }
  };

  return (
    <div className="flex flex-col gap-4 items-start">
      <h1 className="text-xl font-bold">아이디 찾기</h1>
      <span>이름</span>
      <input
        type="text"
        placeholder="이름을 입력하세요"
        onChange={(e) =>
          dispatch({ type: "SET_NAME", payload: e.target.value })
        }
        className="bg-gray-400 placeholder-gray-700"
      />
      <span>이메일</span>
      <input
        type="email"
        placeholder="이메일을 입력하세요"
        onChange={(e) =>
          dispatch({ type: "SET_EMAIL", payload: e.target.value })
        }
        className="bg-gray-400 placeholder-gray-700"
      />
      <button
        onClick={handleFindId}
        className="bg-sky-700 rounded p-2 cursor-pointer"
      >
        아이디 찾기
      </button>
      {state.userId && <p>아이디: {state.userId}</p>}
    </div>
  );
}
