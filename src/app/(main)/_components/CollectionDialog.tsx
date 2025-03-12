"use client";
import { collectionSchema } from "@/app/data/form-schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { BarLoader } from "react-spinners";

function CollectionForm({loading, onSuccess, open, setOpen }: any) {

  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      name: "",
      description: "",
    }
  })

  const onSubmit = handleSubmit(async (data) => {
    onSuccess(data);
  })

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Collection</DialogTitle>
          </DialogHeader>

          {loading && <BarLoader color="orange" width={"100%"}/>}
          <DialogDescription>
            Organize your notes by creating a new collection
          </DialogDescription>

          <form onSubmit={onSubmit} className="space-y-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Collection Name</label>
              <Input disabled={loading} {...register("name")} placeholder="Enter collection name..." className={`${errors.name ? "border-red-500" : ""}`} />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description (Optional)</label>
              <Textarea disabled={loading} {...register("description")} placeholder="Describe your collection..." className={`${errors.name ? "border-red-500" : ""}`} />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description.message}</p>
              )}
            </div>

            <div className="flex justify-end space-x-4 pt-2">
              <Button type="button" variant={"ghost"}  onClick={() => setOpen(false)} className="tracking-tight">Cancel</Button>
              <Button type="submit" className="bg-gradient-to-tr from-orange-400 via-red-400 to-orange-400 text-white hover:from-orange-500 hover:via-red-500 hover:to-orange-500 tracking-tight">Create Collection</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CollectionForm;
