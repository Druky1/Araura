import { getCollections } from '@/app/actions/collection'
import { getJournalEntries } from '@/app/actions/journal';
import React from 'react'
import MainHeader from '../_components/MainHeader';
import Collections from './_components/Collections';
import MoodAnalytics from './_components/MoodAnalytics';

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
    <>
      <MainHeader/>
      <div className='px-4 py-8 space-y-8'>
        <section className='space-y-8 max-w-7xl mx-auto'>
          {/* Daily Quote Component */}
        <MoodAnalytics />
        <Collections collections={collectionsData} groupEntriesByCollection={groupEntriesByCollection}/>
        </section>
      </div>
    </>
  )
}

export default Dashboard