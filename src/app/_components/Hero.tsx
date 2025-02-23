import React from "react";
import { Instrument_Serif } from "next/font/google";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import Image from "next/image";

const instru = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

function Hero() {
  return (
    <section className="py-20 sm:py-24">
      <div className="absolute inset-0 -z-10 flex items-end justify-center md:mt-14">
        <div className="w-[1000px] h-[300px] bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 opacity-50 blur-3xl"></div>
      </div>
      <div className="container mx-auto p-4 text-center flex flex-col items-center justify-center">
        <h1
          className={twMerge(
            instru.className,
            "text-5xl sm:text-7xl tracking-tight"
          )}
        >
          <span className="bg-gradient-to-t  from-orange-400 via-red-500 to-orange-400 bg-clip-text text-transparent">
            Write smarter, reflect deeper.
          </span>
        </h1>
        <p className="mt-6 text-md lg:text-lg text-muted-foreground max-w-lg md:max-w-xl mx-auto tracking-tighter">
          Capture your thoughts, ideas, and learnings in one place. Araura is an
          AI app that helps you write better and reflect deeper.
        </p>
        <Link href="/sign-in" className="inline-block mt-10 md:mt-14">
          <Button className="flex items-center justify-center whitespace-nowrap rounded-lg tracking-tighter ring-offset-background transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 text-md bg-black text-white/90 hover:bg-gradient-to-tr hover:from-orange-400 hover:via-red-400 hover:to-orange-400 hover:text-white shadow-lg">
            Get started
            <Send />
          </Button>
        </Link>
        <div className="mt-16 w-[680px] h-[480px] relative rounded-lg overflow-hidden border-8 ">
          <Image
            src="/photo-2.jpg"
            alt="Dashboard Preview"
            width={680}
            height={480}
            className="w-full h-full object-cover shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
