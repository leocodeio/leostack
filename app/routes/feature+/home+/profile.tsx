import { useState } from "react";
import { useLoaderData, Form, Link } from "@remix-run/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserInput } from "@/components/self/user-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { getSession } from "~/server/services/auth/db.server";
import { redirect } from "@remix-run/node";
import { User } from "@/types/user";

export async function loader({ request }: any) {
  const session = await getSession(request);
  const user = session?.user;
  console.log("---2---start home/profile.ts", user);
  if (!user) {
    return redirect("/auth/signin");
  }
  return { user: user };
}

export default function Profile() {
  const { user } = useLoaderData<typeof loader>();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Profile</CardTitle>
          <CardDescription>
            Manage your account settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/logo.png" alt="@user" />
                <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <Button disabled variant="secondary" size="sm">
                Hello {name}
              </Button>
            </div>

            {/* Profile Form */}
            <Form method="post" className="flex flex-col gap-4">
              <div className="grid gap-2">
                <UserInput
                  id="name"
                  label="Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  placeholder="Enter your email"
                  disabled
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" type="text" value={"todo"} disabled />
              </div>
              <Button disabled type="submit" className="w-full">
                Save Changes
              </Button>
              <Link
                to="/home"
                className="w-full text-center outline outline-1 outline-gray-300 rounded-md p-2 hover:bg-gray-900"
              >
                Home
              </Link>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
