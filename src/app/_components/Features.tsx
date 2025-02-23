import { GraduationCap } from 'lucide-react'
import React from 'react'

function Features() {
  return (
    <section className='py-20 sm:py-24' id="features">
      <div className='container mx-auto p-4 text-center'>
      <div className="text-sm text-center mb-10 gap-2 flex items-center justify-center text-[#6C6E74]">
          <GraduationCap className="h-5 w-5" />
          FEATURES
        </div>
      </div>
    </section>
  )
}

export default Features