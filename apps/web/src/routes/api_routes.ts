const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";
const BACKEND_BASE_URL = `${BACKEND_URL}/api/v1`;

export const API_ROUTES = {
  BACKEND_URL,
  BACKEND_BASE_URL,
  SIGNIN_URL: `${BACKEND_BASE_URL}/auth/signin`,
};
