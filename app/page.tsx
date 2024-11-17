import { redirect } from "next/navigation";
import { getApiKey } from "./util/cookies";

export default async function Home() {
  const apiKey = await getApiKey();

  if (!apiKey) {
    redirect("/api-key");
  }

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
