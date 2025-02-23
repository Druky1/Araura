import React from 'react'
import { Instrument_Serif } from 'next/font/google'
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

const instru = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic"});

const Logo = () => {
  return (
    <Link href={'/'}>
      <span className={twMerge(instru.className, "text-2xl text-white/90 tracking-tight")}>Araura</span>
    </Link>
  )
}

export default Logo