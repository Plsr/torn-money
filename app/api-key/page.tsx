import { Label } from "@/components/ui/label";
import { addApiKey } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getApiKey } from "../../util/cookies";
import { redirect } from "next/navigation";

export default async function ApiKey() {
  const apiKey = await getApiKey();

  if (apiKey) {
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md">
        <form action={addApiKey}>
          <CardHeader>
            <CardTitle>Add API key</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor="apiKey">API Key</Label>
            <Input type="text" id="apiKey" name="apiKey" />
          </CardContent>
          <CardFooter>
            <Button type="submit">Add</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
