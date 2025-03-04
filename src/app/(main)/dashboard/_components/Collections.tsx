"use client"

import React, { useEffect } from "react";
import CollectionPreview from "./CollectionPreview";
import CollectionForm from "../../_components/CollectionDialog";
import useFetch from "@/app/hooks/use-fetch";
import { toast } from "sonner";
import { createCollection } from "@/app/actions/collection";

function Collections({ collections, groupEntriesByCollection }: any) {
  const [isCollectionModalOpen, setIsCollectionModalOpen] =
    React.useState(false);

  const handleCreateCollection = async (data : any) => {
    createCollectionFn(data)
  }

  const {
    loading: createCollectionLoading,
    fn: createCollectionFn,
    data: createdCollection,
  } = useFetch(createCollection);

  useEffect(() => {
    if(createdCollection) {
      setIsCollectionModalOpen(false);
      toast.success(`Collection ${createdCollection.name} created successfully!`);
    }
  }, [createdCollection]);
  
  if(collections?.length === 0) return <></>

  return (
    <section className="space-y-8" id="collections">
      <h2 className="text-3xl md:text-4xl bg-gradient-to-t from-orange-400 via-red-500 to-orange-400 bg-clip-text text-transparent tracking-tight">
        Collections
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <CollectionPreview
          id="new"
          name="New Collection"
          isCreateNew={true}
          onCreateNew={() => setIsCollectionModalOpen(true)}
        />
        {groupEntriesByCollection?.unorganized?.length > 0 && (
          <CollectionPreview
            name="Unorganized"
            id="unorganized"
            isUnorganized={true}
            entries={groupEntriesByCollection?.unorganized}
          />
        )}

        {collections?.map((collection: any) => (
          <CollectionPreview
            key={collection.id}
            id={collection.id}
            name={collection.name}
            entries={groupEntriesByCollection?.[collection.id] || []}
          />
        ))}

        <CollectionForm
          loading={createCollectionLoading}
          onSuccess={handleCreateCollection}
          open={isCollectionModalOpen}
          setOpen={setIsCollectionModalOpen}
        />
      </div>
    </section>
  );
}

export default Collections;
