import { getApiKey } from "@/util/cookies";
import { redirect } from "next/navigation";

export default async function Page() {
  const apiKey = await getApiKey();

  if (apiKey) {
    redirect("/crime-stats");
  }
  return "hello";
}
