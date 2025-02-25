import React from "react";
import { Instrument_Serif } from "next/font/google";
import { twMerge } from "tailwind-merge";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircleMore } from "lucide-react";

const instru = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

function FAQ() {
  return (
    <section className="py-20 sm:py-24" id="faq">
      <div className="container flex flex-col items-center justify-center mx-auto p-4 text-center">
        <div className="text-sm text-center mb-10 gap-2 flex items-center justify-center text-[#6C6E74]">
          <MessageCircleMore className="h-5 w-5" />
          FAQs
        </div>
        <h1
          className={twMerge(
            instru.className,
            "text-3xl md:text-5xl mb-10 font-medium tracking-tight inline-block"
          )}
        >
          <span className="">Your questions, answered.</span>
        </h1>
        <p className="text-md md:text-lg text-muted-foreground tracking-tighter">
          Get detailed answers to the most common questions about Araura.
        </p>
      </div>
      <Accordion
        type="single"
        collapsible
        className="mx-auto md:max-w-3xl mt-16 max-w-md space-y-2"
      >
        <AccordionItem
          value="item-1"
          className="rounded-lg border-2 border-orange-200 px-4 shadow-md tracking-tight"
        >
          <AccordionTrigger className="text-base">
            Is my journal data secure?
          </AccordionTrigger>
          <AccordionContent>
            Yes! We use enterprise-grade encryption and security measures to
            ensure your entries remain private and secure.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-2"
          className="rounded-lg border-2 border-orange-200 px-4 shadow-md tracking-tight"
        >
          <AccordionTrigger className="text-base">
            How does the mood tracking work?
          </AccordionTrigger>
          <AccordionContent>
            Each entry can be tagged with a mood, and our analytics tool creates
            visual representations of your emotional journey over time.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-3"
          className="rounded-lg border-2 border-orange-200 px-4 shadow-md tracking-tight"
        >
          <AccordionTrigger className="text-base">
            Is there a mobile app?
          </AccordionTrigger>
          <AccordionContent>
            This platform is fully responsive and works beautifully on all
            devices. A dedicated mobile app is coming soon!
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className=" text-center mt-5 tracking-tighter text-muted-foreground">
        Have more questions? <a href="/contact" className="border-b border-black text-black">Contact us</a>
      </div>
    </section>
  );
}

export default FAQ;
