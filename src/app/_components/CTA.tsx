import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Instrument_Serif } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { Send } from "lucide-react";

const instru = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

function CTA() {
  return (
    <section className="relative py-14 bg-[#F7F4ED] text-primary-foreground mx-auto max-w-7xl px-4 md:px-8 overflow-hidden">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-10 mx-auto">
        {/* Left SVG Section */}
        <div className="flex justify-center md:justify-start w-full max-w-xs md:max-w-md">
          <Image
            src="/Chill-Time.svg"
            alt="Illustration 1"
            width={300}
            height={300}
            className="w-full object-contain"
          />
        </div>

        {/* Center CTA Content */}
        <div className="text-center md:text-left flex flex-col items-center md:items-center gap-6">
          <h1
            className={twMerge(
              instru.className,
              "text-4xl md:text-6xl tracking-tight text-black whitespace-nowrap px-4"
            )}
          >
            Document your journey
          </h1>
          <p className="text-md sm:text-lg text-black/60 text-center md:text-left tracking-tighter">
            and let your words shape your legacy.
          </p>
          <Button className="flex items-center justify-center whitespace-nowrap rounded-lg tracking-tighter ring-offset-background transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 text-md bg-black text-white/90 hover:bg-gradient-to-tr hover:from-orange-400 hover:via-red-400 hover:to-orange-400 hover:text-white shadow-lg animate-bounce mt-6">
          <Link href="/sign-in">Get started for free</Link>
            
            <Send />
          </Button>
        </div>

        {/* Right SVG Section */}
        <div className="flex justify-center md:justify-end w-full max-w-xs md:max-w-md">
          <Image
            src="/Painting.svg"
            alt="Illustration 2"
            width={300}
            height={300}
            className="w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}

export default CTA;
