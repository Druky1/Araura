import { getCollection } from '@/app/actions/collection';
import { getJournalEntries } from '@/app/actions/journal';
import React from 'react'
import DeleteCollectionDialogModal from '../_components/DeleteCollectionDialogModal';
import JournalEntries from '../_components/JournalEntries';

const CollectionPage = async({params} : any) => {

  const {collectionId} = await params;
  const entries = await getJournalEntries(collectionId);
  const collection = await getCollection(collectionId);

  return (
    <div className='space-y-6 md:max-w-7xl mx-auto mt-16 mb-4'>
      <div className='flex flex-col justify-between'>
        <div className='flex justify-between'>
          <h1 className='text-3xl md:text-4xl bg-gradient-to-t from-orange-400 via-red-500 to-orange-400 bg-clip-text text-transparent tracking-tight'>
            {collectionId === "unorganized" ? "Unorganized Entries" : collection?.name || "Collection"}
          </h1>
          {collection && <DeleteCollectionDialogModal collection={collection} entriesCount={entries.data?.entries.length}/>}
        </div>
        {collection?.description && (
          <h2 className='mt-2 tracking-tighter text-muted-foreground'>{collection?.description}</h2>
        )}
      </div>

      <JournalEntries entries={entries.data?.entries}/>
    </div>
  )
}

export default CollectionPage