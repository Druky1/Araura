
import Link from "next/link";
import React, { Suspense } from "react";
import {BarLoader} from "react-spinners";

function WriteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container mx-auto px-4">
      <div className="py-4">
        <Link
          href="/dashboard"
          className="text-sm font-medium text-orange-500 hover:text-orange-600 cursor-pointer tracking-tighter "
        >
           Go to Dashboard
        </Link>
      </div>
      <Suspense fallback={<BarLoader color="orange" width={"100%"}/>}>{children}</Suspense>
    </div>
  );
}

export default WriteLayout;
