import { getCollections } from '@/app/actions/collection'
import { getJournalEntries } from '@/app/actions/journal';
import React from 'react'
import MainHeader from '../_components/MainHeader';

const Dashboard = async () => {

  const collectionsData = await getCollections();
  const entriesData = await getJournalEntries();

  const groupEntriesByCollection = entriesData?.data?.entries.reduce((acc : any, entry : any) => {
    const collectionId = entry.collectionId || "unorganized";
    if(!acc[collectionId]) {
      acc[collectionId] = [];
    }
    acc[collectionId].push(entry);
    return acc;
  }, {})

  return (
    <div>
      <MainHeader/>
      <div className='px-4 py-8 space-y-8'>
        <section className='space-y-4'>
          {/* Mood Analytics*/}
        </section>
      </div>
    </div>
  )
}

export default Dashboard