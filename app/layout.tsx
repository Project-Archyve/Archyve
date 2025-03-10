import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@/app/globals.css";
import { createClient } from "@/utils/supabase/server";
import { UserProvider } from "@/hooks/UserProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Archyve",
  description: "A knowledge management system for software teams.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" className={geistSans.variable} suppressHydrationWarning>
      <body className="dark">
        <UserProvider value={user}>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
