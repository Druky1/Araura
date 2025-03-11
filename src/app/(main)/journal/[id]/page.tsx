import { getJournalEntry } from "@/app/actions/journal";
import { getMoodById } from "@/app/data/moods";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";
import DeleteDialog from "./_components/DeleteDialog";
import EditButton from "./_components/EditButton";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const JournalPage = async ({ params }: any) => {
  const { id } = await params;
  const entry = await getJournalEntry(id);
  const mood = getMoodById(entry?.mood);

  return (
    <>
      {entry.moodImageUrl && (
        <div className="relative h-48 md:h-64">
          <Image
            src={entry.moodImageUrl}
            alt="Mood Image"
            className="object-contain"
            fill
            priority
          />
        </div>
      )}
      <div className="space-y-6 md:max-w-7xl mx-auto mt-7 mb-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl md:text-4xl bg-gradient-to-t from-orange-400 via-red-500 to-orange-400 bg-clip-text text-transparent tracking-tight">
                {entry.title}
              </h1>
              <p className="text-muted-foreground text-sm">
                Created on {format(new Date(entry.createdAt), "PPP")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <EditButton entryId={id} />
              <DeleteDialog entryId={id} />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {entry.collection && (
              <Link href={`/collection/${entry.collection.id}`}>
                <Badge className="p-1 bg-gradient-to-tr from-orange-400 via-red-400 to-orange-400 text-white hover:from-orange-500 hover:via-red-500 hover:to-orange-500">Collection: {entry.collection.name}</Badge>
              </Link>
            )}
            <Badge
              variant="outline"
              style={{
                backgroundColor: `var(--${mood?.color}-50)`,
                color: `var(--${mood?.color}-700)`,
                borderColor: `var(--${mood?.color}-200)`,
              }}
            >
              Feeling {mood?.label} {mood?.emoji}
            </Badge>
          </div>
        </div>

        <div className="border-2 border-orange-200 py-6 px-4 rounded-xl">

        <div className="ql-snow">
          <div className="ql-editor tracking-tighter" dangerouslySetInnerHTML={{__html: entry.content}}/>
        </div>
        </div>

        <footer className="text-sm text-muted-foreground pt-4 tracking-tight">
          Last updated {format(new Date(entry.updatedAt), "PPP 'at' p")}
        </footer>
      </div>
    </>
  );
};

export default JournalPage;
