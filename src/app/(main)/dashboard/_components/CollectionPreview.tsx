"use client";
import { getMoodById } from "@/app/data/moods";
import { formatDistanceToNow } from "date-fns";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const colorSchemes = {
  unorganized: {
    bg: "bg-amber-100 hover:bg-amber-50",
    tab: "bg-amber-200 group-hover:bg-amber-300",
  },
  collection: {
    bg: "bg-blue-100 hover:bg-blue-50",
    tab: "bg-blue-200 group-hover:bg-blue-300",
  },
  createCollection: {
    bg: "bg-white/50 hover:bg-gray-50",
    tab: "bg-gray-200 hover:bg-gray-300",
  },
};

interface CollectionPreviewProps {
  id: string; // Unique identifier for the collection
  name: string; // Name of the collection
  entries?: Array<{
    createdAt: string | number | Date;
    id: string;
    title: string;
    content: string;
  }>; // Array of entries in the collection (optional)
  isUnorganized?: boolean; // Flag to indicate if this is the "unorganized" collection (optional)
  isCreateNew?: boolean; // Flag to indicate if this is the "Create New Collection" button (optional)
  onCreateNew?: () => void; // Callback function for creating a new collection (optional)
}

const FolderTab = ({ colorClass }: any) => {
  return (
    <div
      className={`absolute inset-x-4 -top-2 h-2 rounded-t-md transform -skew-x-6 transition-colors ${colorClass}`}
    />
  );
};

const EntryPreview = ({ entry }: any) => {
  return (
    <div className="bg-white/50 p-2 rounded text-sm truncate">
      <span className="mr-2">{getMoodById(entry.mood)?.emoji}</span>
      {entry.title}
    </div>
  );
};

const CollectionPreview: React.FC<CollectionPreviewProps> = ({
  id,
  name,
  entries = [],
  isUnorganized = false,
  isCreateNew = false,
  onCreateNew,
}) => {
  if (isCreateNew) {
    return (
      <button 
        className='group relative w-full cursor-pointer inline-flex flex-col' 
        onClick={onCreateNew}
      >
        <div className={`relative h-full rounded-lg p-6 shadow-md group-hover:shadow-lg transition-all flex flex-col items-center justify-center gap-4 ${colorSchemes["createCollection"].bg}`}>
          <FolderTab colorClass={`${colorSchemes["createCollection"].tab}`} />
          <div className='h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center'>
            <Plus className='h-6 w-6 text-orange-500'/>
          </div>
          <p className='text-muted-foreground/70 tracking-tight'>Create new collection</p>
        </div>
      </button>
    );
  }
  return (
    <Link
      href={`/collection/${isUnorganized ? "unorganized" : id}`}
      className="group relative"
    >
      <FolderTab
        colorClass={
          colorSchemes[isUnorganized ? "unorganized" : "collection"].tab
        }
      />
      <div
        className={`relative rounded-lg p-6 shadow-md hover:shadow-lg transition-all  ${
          colorSchemes[isUnorganized ? "unorganized" : "collection"].bg
        }cursor-pointer`}
      >
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center h-10 w-10 rounded-full bg-orange-100">
            {isUnorganized ? "📂" : "📁"}
          </span>
          <h3 className="text-md truncate tracking-tight">{name}</h3>
        </div>
        <div className="space-y-2 mt-4">
          <div className="flex justify-between text-sm text-muted-foreground/70">
            <span className="tracking-tight">
              {entries.length > 0
                ? `${entries.length} ${
                    entries.length === 1 ? "entry" : "entries"
                  }`
                : <i>No entries yet</i>}
            </span>
            {entries.length > 0 && (
              <span className="tracking-tight">
                {formatDistanceToNow(new Date(entries[0].createdAt), {
                  addSuffix: true,
                })}
              </span>
            )}
          </div>
        </div>
        <div className="space-y-2 mt-4 tracking-tight">
          {entries.length > 0 &&
            entries
              .slice(0, 2)
              .map((entry) => <EntryPreview key={entry.id} entry={entry} />)}
        </div>
      </div>
    </Link>
  );
};

export default CollectionPreview;
