import Logo from "@/app/_components/Logo";
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <main className="h-screen grid grid-cols-1 lg:grid-cols-2 relative">
      <div className="hidden lg:block relative w-full  flex-col bg-black p-10 text-primary-foreground overflow-hidden">
        <Image
          src={"/cover.jpg"}
          alt="coverImg"
          fill
          className="w-full h-full object-cover"
        />
        <div className="absolute z-20 flex items-center">
          <Logo />
        </div>
      </div>
      
      <div className="flex justify-center items-center h-screen">
        <SignIn fallbackRedirectUrl={"/dashboard"} />
      </div>
    </main>
  );
}