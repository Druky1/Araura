import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="relative max-w-4xl w-full lg:h-[680px] overflow-hidden">
        <div className="absolute inset-0 opacity-80 pointer-events-none hidden md:block">
          <Image
            src="/soy.svg"
            alt="404 meme"
            height={1600}
            width={900}
            objectFit="contain"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center mx-auto px-8">
          <h1 className="text-6xl font-bold mb-2 bg-gradient-to-t  from-orange-400 via-red-500 to-orange-400 bg-clip-text text-transparent">404</h1>
          <h2 className="text-xl font-semibold mb-3 tracking-tight">Page Not Found</h2>
          <p className="mb-5 tracking-tighter text-muted-foreground">
            Oops! The page you're looking for does not exist.
          </p>
          <Link href="/">
            <Button className="flex items-center justify-center whitespace-nowrap rounded-lg tracking-tighter ring-offset-background transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 text-md bg-black text-white/90 hover:bg-gradient-to-tr hover:from-orange-400 hover:via-red-400 hover:to-orange-400 hover:text-white shadow-lg">
              Return Home
              <Home size={18} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
