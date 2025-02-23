import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Lock, Book, Sparkles } from "lucide-react";
import { Instrument_Serif } from "next/font/google";
import React from "react";
import { twMerge } from "tailwind-merge";

const instru = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

const features = [
  {
    icon: Book,
    title: "Speak Your Mind",
    description:
      "Express yourself with a powerful editor supporting markdown, formatting, and more.",
  },
  {
    icon: Sparkles,
    title: "Daily Inspiration",
    description:
      "Get inspired with daily prompts and mood-based imagery to spark your creativity.",
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description:
      "Your thoughts are safe with enterprise-grade security and privacy features.",
  },
];

function Features() {
  return (
    <section className="py-20 sm:py-24" id="features">
      <div className="container mx-auto p-4 text-center">
        <div className="text-sm text-center mb-10 gap-2 flex items-center justify-center text-[#6C6E74]">
          <GraduationCap className="h-5 w-5"/>
          FEATURES
        </div>
        <h1 className={twMerge(instru.className,"text-3xl md:text-5xl mb-10 font-medium tracking-tight inline-block")}>
          <span className="bg-gradient-to-t from-orange-400 via-red-500 to-orange-400 bg-clip-text text-transparent pl-3">Just write. </span>Let Araura handle the rest.
        </h1>
        <p className="text-md md:text-lg text-muted-foreground tracking-tighter">
          Explore the features that help you write better and reflect deeper
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto py-20">
          {features.map((feature) => (
            <Card key={feature.title} className="shadow-lg border-4 border-orange-100 rounded-xl">
            <CardContent className="p-6 flex flex-col items-start space-y-4">
              {/* Icon Section */}
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-orange-500" />
              </div>
          
              {/* Title */}
              <h2 className="text-xl tracking-tighter text-left w-full">
                {feature.title}
              </h2>
          
              {/* Description */}
              <p className="text-left tracking-tighter text-muted-foreground">
                {feature.description}
              </p>
            </CardContent>
          </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
