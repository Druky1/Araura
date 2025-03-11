"use client";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import useFetch from "@/app/hooks/use-fetch";
import { toast } from "sonner";
import { deleteJournalEntry } from "@/app/actions/journal";

const DeleteDialog = ({entryId} : any) => {
    const router = useRouter();
    const [deleteEntryDialog, setDeleteEntryDialog] = useState(false);
  
    const {
      loading: isDeleting,
      fn: deleteEntryFn,
      data: deletedEntry,
    } = useFetch(deleteJournalEntry);
  
    useEffect(() => {
      if (deletedEntry && !isDeleting) {
        setDeleteEntryDialog(false);
        toast.success("Journal entry deleted successfully");
        redirect(
          `/collection/${
            deletedEntry.collectionId ? deletedEntry.collectionId : "unorganized"
          }`
        );
      }
    }, [deletedEntry, isDeleting]);
  
    const handleJounralEntryDelete = async () => {
      await deleteEntryFn(entryId)
    }
  
    return (
      <div>
        <AlertDialog open={deleteEntryDialog} onOpenChange={setDeleteEntryDialog}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <Trash2 className="h-4 w-4" />
              <span className="hidden md:block tracking-tight">Delete</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="tracking-tight text-red-500">
                Are you sure you want to delete this entry?
              </AlertDialogTitle>
              <AlertDialogDescription className="tracking-tighter">
                This action cannot be undone. This will permanently delete your entry.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button onClick={handleJounralEntryDelete} className="bg-red-500 hover:bg-red-600" disabled={isDeleting}>
                <Trash2/>
                {isDeleting ? "Deleting..." : "Delete Entry"}
                </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  };

export default DeleteDialog