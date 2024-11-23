"use server";

import { redirect } from "next/navigation";
import { setApiKey } from "../../util/cookies";

export const addApiKey = async (formData: FormData) => {
  const apiKey = formData.get("apiKey");
  if (!apiKey) {
    throw new Error("API key is required");
  }

  await setApiKey(apiKey as string);
  redirect("/");
};
