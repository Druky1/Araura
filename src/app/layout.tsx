import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {ClerkProvider} from "@clerk/nextjs";
import "./globals.css";
import { neobrutalism} from '@clerk/themes'
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
})


export const metadata: Metadata = {
  title: "Araura",
  description: "Your own safe space for your thoughts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{baseTheme: neobrutalism, layout: {unsafe_disableDevelopmentModeWarnings: true}}} >
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-[#F7F4ED] overflow-x-hidden`}
      >
        <main>
          {children}
        </main>
        <Toaster richColors/>
      </body>
    </html>
    </ClerkProvider>
  );
}
