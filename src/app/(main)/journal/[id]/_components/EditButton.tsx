"use client"
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const EditButton = ({entryId} : any) => {
  
  const router = useRouter();

  return (
    <Button variant="outline" onClick={() => router.push(`/journal/write?edit=${entryId}`)}>
      <Edit/>
      Edit Entry
    </Button>

  )
}

export default EditButton