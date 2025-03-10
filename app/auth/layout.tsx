import ThemeSwitch from "@/components/global/ThemeSwitch";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <ThemeSwitch />
      {children}
    </div>
  );
}
