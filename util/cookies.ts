import { cookies } from "next/headers";

const API_KEY_COOKIE = "tornApiKey";

export const getApiKey = async () => {
  const cookieStore = await cookies();
  return cookieStore.get(API_KEY_COOKIE)?.value;
};

export const setApiKey = async (apiKey: string) => {
  const cookieStore = await cookies();
  cookieStore.set(API_KEY_COOKIE, apiKey, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    sameSite: "strict",
  });
};
