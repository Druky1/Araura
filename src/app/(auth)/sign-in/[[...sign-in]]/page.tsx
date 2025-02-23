import Logo from "@/app/_components/Logo";
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export default function Page() {
  return (
    <main className="h-screen grid grid-cols-2 relative">
      <div className="relative w-full flex flex-col bg-black p-10 text-primary-foreground overflow:hidden">
        <Image
          src={"/cover.jpg"}
          alt="coverImg"
          fill
          className="w-full h-fulll object-cover"
        />
        <div className="absolute z-20 flex items-center">
          <Logo />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className={twMerge("text-xl tracking-tight")}>
              &ldquo;The palest ink is better than the best memory.&rdquo;
            </p>
          </blockquote>
        </div>
      </div>
      <div className="flex justify-center items-center h-screen">
        <SignIn />
      </div>
    </main>
  );
}
