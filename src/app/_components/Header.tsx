import React from "react";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignedIn, SignedOut} from "@clerk/nextjs";
import { FolderOpen, PenBox } from "lucide-react";
import UserMenu from "./UserMenu";

function Header() {
  return (
    <header className="md:py-4">
      <nav className="container mx-auto max-w-xl lg:max-w-3xl py-4 px-5 sm:px-6 lg:px-6 bg-black md:rounded-2xl sticky shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center space-x-10 text-white/90">
            <Logo />
            <Link
              href="#features"
              className="hidden md:inline text-sm tracking-tighter"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="hidden md:inline text-sm tracking-tighter"
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="hidden md:inline text-sm tracking-tighter"
            >
              FAQ
            </Link>
          </div>

          {/* When user is signed in */}
          <SignedIn>
            <div className="flex justify-center items-center space-x-6">
              <Link href="/dashboard#collections">
                <Button className="font-normal tracking-tighter rounded-lg bg-white text-black hover:text-white hover:bg-black border border-white/40">
                  <FolderOpen size={20} />
                  <span className="md:inline hidden">Collections</span>
                </Button>
              </Link>
              <Link href="/journal/write">
                <Button className="font-normal tracking-tighter rounded-lg bg-white text-black hover:text-white hover:bg-black border border-white/40">
                  <PenBox size={20} />
                  <span className="md:inline hidden">Write New</span>
                </Button>
              </Link>
              {/* UserMenu component */}
              <div className="flex items-center border-2 border-white rounded-full">
                <UserMenu />
              </div>
              
            </div>
          </SignedIn>

          {/* When user is signed out */}
          <SignedOut>
            <Button className="font-normal tracking-tighter rounded-lg bg-white text-black hover:text-white hover:bg-black border border-white/40">
              <Link href="/sign-in">Get started for free</Link>
            </Button>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
}

export default Header;
