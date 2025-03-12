"use client";
import React, { useEffect, useState } from "react";
import { deleteCollection as deleteCollectionAction } from "@/app/actions/collection";
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
import { useRouter } from "next/navigation";
import useFetch from "@/app/hooks/use-fetch";
import { toast } from "sonner";

interface Collection {
  id: string;
  name: string;
  description?: string;
}

interface DeleteCollectionDialogModalProps {
  collection: Collection;
  entriesCount: number;
}

const DeleteCollectionDialogModal = ({
  collection,
  entriesCount,
}: DeleteCollectionDialogModalProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const {
    loading: isDeleting,
    fn: deleteCollection,
    data: deletedCollection
  } = useFetch(deleteCollectionAction);

  useEffect(() => {
    if(deletedCollection && !isDeleting){
      setOpen(false);
      toast.success(`Collection "${collection.name}" and all it's entries are deleted!`);
      router.push("/dashboard");
    }
  }, [deletedCollection, isDeleting])

  const handleDelete = () => {
    deleteCollection(collection.id)
  }

  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">
            <Trash2 className="h-4 w-4" />
            <span className="hidden md:block">Delete</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="tracking-tight text-red-500">
              Are you sure you want to delete &quot;{collection.name}&quot;?
            </AlertDialogTitle>
            <div className="space-y-2 text-muted-foreground text-sm">
              <p>This will permanently delete:</p>
              <ul className="list-disc list-inside">
                <li>
                  The collection &quot;{collection.name}&quot;
                </li>
                <li>
                  {entriesCount} journal{" "}
                  {entriesCount === 1 ? "entry" : "entries"}
                </li>
              </ul>
            </div>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              collection and your entries associated with it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600" disabled={isDeleting}>
              <Trash2/>
              {isDeleting ? "Deleting..." : "Delete Collection"}
              </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteCollectionDialogModal;
