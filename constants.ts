export const MONGODB_URI = process.env.MONGODB_URI!;

export const SECRET = process.env.JWT_SECRET!;
export const JWT_EXPIRES_IN = "7d";
export const JWT_EXPIRES_IN_FORGOT_PASSWORD = "1h";
export const DEFAULT_POINTS = 1000;
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET!;
export const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;

export const MAX_AGE = 60 * 60 * 24;

export const API = {
  AUTH: {
    FIND_ID: "/api/auth/find-id",
    FIND_PASSWORD: "/api/auth/find-password",
    RESET_PASSWORD: "/api/auth/reset-password",
    LOGIN: "/api/auth/login",
    SIGNUP: "/api/auth/signup",
  },
  ME: {
    GROUP: {
      LIST: "/api/me/group",
      SELECTED_GROUP: (selectedGroup: string) =>
        `/api/me/group/${selectedGroup}/users`,
      PLAYER: "/api/me/group/player",
      PLAYER_ID: (selectedGroup: string) =>
        `/api/me/group/player/${selectedGroup}`,
    },
    MATCH: {
      PLAYER: "/api/me/match/player",
      SUBMIT: "/api/me/match/submit",
      UPLOAD: `${baseUrl}/match/upload`,
    },
    PLAYER: {
      LIST: "/api/me/player",
      ID: (id: string) => `/api/me/player/${id}`,
    },
  },
  TEAM: {
    PLAYER: "/api/team",
  },
};
