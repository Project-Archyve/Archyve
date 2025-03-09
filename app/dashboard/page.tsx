import { Button } from "@/components/ui/button";
import { signOut } from "../auth/actions";

export default function DashboardPage() {
  return (
    <>
      <h1>Dashboard Page</h1>
      <Button onClick={signOut}>Sign Out</Button>
    </>
  );
}
