import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/hooks/ThemeProvider";
import { AuthProvider } from "@/hooks/AuthProvider";
import { createClient } from "@/lib/supabase/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Archyve",
  description: "Knowledge sharing for business teams.",
};

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
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
          <AuthProvider value={user}>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
