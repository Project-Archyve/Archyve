import { Card, CardContent } from "@/components/ui/card";
import LoginForm from "@/components/auth/login/LoginForm";
import { cn } from "@/lib/utils";

export default function LoginCard({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="flex flex-col gap-6 p-6 md:p-8">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">Welcome back</h1>
              <p className="text-balance text-muted-foreground">
                Login to your Archyve account
              </p>
            </div>
            <div className="grid gap-2">
              <LoginForm />
            </div>
            <div className="text-center text-muted-foreground text-sm">
              If you don&apos;t already have an account, the form will create
              one for you.
            </div>
          </div>
          <div className="relative hidden bg-muted md:block">
            <span>Image</span> {/* TODO: ANIMATION */}
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our{" "}
        <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
