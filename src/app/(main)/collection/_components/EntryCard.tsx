import { Card, CardContent } from '@/components/ui/card'
import { format } from 'date-fns'
import Link from 'next/link'
import React from 'react'

const EntryCard = ({entry} : any) => {
  
  return (
    <Link href={`/journal/${entry.id}`}>
      <Card className='hover:shadow-md transition-shadow border-2 border-orange-200'>
        <CardContent className='p-6 '>
          <div className='flex items-start justify-between'>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <span className='text-2xl'>{entry.moodData?.emoji}</span>
                <h3 className='font-normal tracking-tight  text-lg'>{entry.title}</h3>
              </div>
              <div className='text-muted-foreground line-clamp-2 tracking-tight' dangerouslySetInnerHTML={{__html: entry.content}}/>
            </div>
            <time className='text-sm text-muted-foreground'>{format(new Date(entry.createdAt), "MMM d, yyyy")}</time>
          </div>
          {entry.collection && (
            <div className='mt-4 flex items-center gap-2'>
              <span className='text-sm px-2 py-1 bg-orange-100 text-orange-600 rounded tracking-tight'>
                {entry.collection.name}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}

export default EntryCard