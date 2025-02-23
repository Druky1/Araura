import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {ClerkProvider} from "@clerk/nextjs";
import "./globals.css";
import { neobrutalism} from '@clerk/themes'

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
    <ClerkProvider appearance={{baseTheme: neobrutalism}}>
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-[#F7F4ED]`}
      >
        <main>
          {children}
        </main>
      </body>
    </html>
    </ClerkProvider>
  );
}
