"use client"

import { Button } from "@/components/ui/button";
import { signOut } from "../auth/actions";
import { useUser } from "@/hooks/UserProvider";

export default function DashboardPage() {

  const user = useUser();

  return (
    <>
      <h1>Welcome to the Dashboard {user?.email}</h1>
      <Button onClick={signOut}>Sign Out</Button>
    </>
  );
}
