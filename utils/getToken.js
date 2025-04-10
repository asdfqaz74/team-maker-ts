export function getToken() {
  if (typeof window !== "undefined") {
    const token = sessionStorage.getItem("token");

    if (!token) {
      alert("로그인이 필요합니다.");
      return null;
    }

    return token;
  }

  return null;
}
