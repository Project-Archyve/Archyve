import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AuthForm from "@/components/auth/AuthForm";

export default function AuthCard() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AuthForm />
        <div className="mt-4 text-center text-sm">
          <small>
            If you do not have an existing account, this form will create one
            for you.
          </small>
        </div>
      </CardContent>
    </Card>
  );
}
