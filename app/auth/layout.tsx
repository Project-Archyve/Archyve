export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <h1>Auth Layout</h1>
      {children}
    </div>
  );
}
