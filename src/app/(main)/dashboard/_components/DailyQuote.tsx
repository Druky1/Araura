import { getDailyPrompt } from '@/app/actions/public';
import React from 'react'
import { Instrument_Serif } from 'next/font/google'
import { twMerge } from 'tailwind-merge';

const instru = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic"});

const DailyQuote = async () => {
  const advice = await getDailyPrompt();
  return (
    <section className=''>
      <div className='flex justify-center items-center p-4'>
        <h1 className={twMerge(instru.className, "text-5xl bg-gradient-to-t from-orange-400 via-red-500 to-orange-400 bg-clip-text text-transparent p-2")}>
          {advice ? advice : "Have a wonderful day!"}
        </h1>      
      </div>
    </section>
  )
}

export default DailyQuote