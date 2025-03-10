import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@/app/globals.css";
import { createClient } from "@/utils/supabase/server";
import { UserProvider } from "@/hooks/UserProvider";
import { ThemeProvider } from "@/hooks/ThemeProvider";

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
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" className={geistSans.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider value={user}>
            {children}
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
