import { Users2 } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import { Instrument_Serif } from "next/font/google";
import { twMerge } from "tailwind-merge";

const instru = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never used anything like this before. It's amazing. I love it.",
    img: "https://notion-avatar.app/api/svg/eyJmYWNlIjo5LCJub3NlIjo4LCJtb3V0aCI6MSwiZXllcyI6MSwiZXllYnJvd3MiOjcsImdsYXNzZXMiOjUsImhhaXIiOjEwLCJhY2Nlc3NvcmllcyI6MCwiZGV0YWlscyI6MCwiYmVhcmQiOjAsImZsaXAiOjAsImNvbG9yIjoiI2ZhNTQxYyIsInNoYXBlIjoiY2lyY2xlIn0=",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I used to struggle with organizing my thoughts. Now, my ideas flow effortlessly onto the journal.",
    img: "https://notion-avatar.app/api/svg/eyJmYWNlIjoxNCwibm9zZSI6MTAsIm1vdXRoIjo5LCJleWVzIjoxMCwiZXllYnJvd3MiOjEsImdsYXNzZXMiOjMsImhhaXIiOjU0LCJhY2Nlc3NvcmllcyI6MCwiZGV0YWlscyI6MCwiYmVhcmQiOjAsImZsaXAiOjAsImNvbG9yIjoidHJhbnNwYXJlbnQiLCJzaGFwZSI6ImNpcmNsZSJ9",
  },
  {
    name: "John",
    username: "@john",
    body: "As someone who writes daily, I can confidently say this is the best online journal I've ever used.",
    img: "https://notion-avatar.app/api/svg/eyJmYWNlIjozLCJub3NlIjo5LCJtb3V0aCI6MTQsImV5ZXMiOjEwLCJleWVicm93cyI6OSwiZ2xhc3NlcyI6NCwiaGFpciI6NCwiYWNjZXNzb3JpZXMiOjAsImRldGFpbHMiOjAsImJlYXJkIjowLCJmbGlwIjowLCJjb2xvciI6InRyYW5zcGFyZW50Iiwic2hhcGUiOiJjaXJjbGUifQ==",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I was skeptical at first, but wow—this is like having a professional editor in my pocket!",
    img: "https://notion-avatar.app/api/svg/eyJmYWNlIjoxMywibm9zZSI6MTAsIm1vdXRoIjoxNCwiZXllcyI6MSwiZXllYnJvd3MiOjQsImdsYXNzZXMiOjEzLCJoYWlyIjo1MiwiYWNjZXNzb3JpZXMiOjAsImRldGFpbHMiOjAsImJlYXJkIjowLCJmbGlwIjowLCJjb2xvciI6InRyYW5zcGFyZW50Iiwic2hhcGUiOiJjaXJjbGUifQ==",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://notion-avatar.app/api/svg/eyJmYWNlIjoxMiwibm9zZSI6MTMsIm1vdXRoIjoxMSwiZXllcyI6MCwiZXllYnJvd3MiOjQsImdsYXNzZXMiOjAsImhhaXIiOjU0LCJhY2Nlc3NvcmllcyI6MCwiZGV0YWlscyI6MCwiYmVhcmQiOjAsImZsaXAiOjAsImNvbG9yIjoidHJhbnNwYXJlbnQiLCJzaGFwZSI6ImNpcmNsZSJ9",
  },
  {
    name: "Laura",
    username: "@laura",
    body: "It's like having a pocket journal, pretty easy to use ngl.",
    img: "https://notion-avatar.app/api/svg/eyJmYWNlIjoyLCJub3NlIjo1LCJtb3V0aCI6MiwiZXllcyI6NywiZXllYnJvd3MiOjEyLCJnbGFzc2VzIjo2LCJoYWlyIjozMCwiYWNjZXNzb3JpZXMiOjAsImRldGFpbHMiOjAsImJlYXJkIjowLCJmbGlwIjowLCJjb2xvciI6InRyYW5zcGFyZW50Iiwic2hhcGUiOiJjaXJjbGUifQ==",
  },
];

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl p-4 border-2 border-orange-200",
        // light styles
        "bg-orange-50 hover:bg-orange-100",
        // dark styles
        "dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium tracking-tight dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40 ">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm tracking-tight">{body}</blockquote>
    </figure>
  );
};

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

function Testimonials() {
  return (
    <section className="py-20 sm:py-24" id="testimonials">
      <div className="container p-4 text-center flex justify-center items-center flex-col">
        <div className="text-sm text-center mb-10 gap-2 flex items-center justify-center text-[#6C6E74]">
          <Users2 className="h-5 w-5" />
          TESTIMONIALS
        </div>
        <h1
          className={twMerge(
            instru.className,
            "text-3xl md:text-5xl mb-10 font-medium tracking-tight inline-block"
          )}
        >
          <span className="bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 bg-clip-text text-transparent pl-3">
            Write fearlessly,{" "}
          </span>
          explore freely.
        </h1>
        <p className="text-md md:text-lg text-muted-foreground tracking-tighter">
          Real stories from real writers, see how Araura transforms the way they
          express.
        </p>
        <div className="relative flex w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex-col items-center justify-center overflow-x-hidden mt-14 bg-[#F7F4ED]">
          <Marquee pauseOnHover className="[--duration:20s]">
            {firstRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]">
            {secondRow.map((review) => (
              <ReviewCard key={review.username} {...review} /> 
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#F7F4ED]"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#F7F4ED]"></div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
