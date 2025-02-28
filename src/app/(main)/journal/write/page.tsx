"use client";

import dynamic from "next/dynamic";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import "react-quill-new/dist/quill.snow.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { journalSchema } from "@/app/data/form-schema";
import { BarLoader } from "react-spinners";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getMoodById, MOODS } from "@/app/data/moods";
import { Button } from "@/components/ui/button";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const WriteNew = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }, watch,
  } = useForm({
    resolver: zodResolver(journalSchema),
    defaultValues: {
      title: "",
      content: "",
      mood: "",
      collectionId: "",
    },
  });

  const onSubmit = handleSubmit(async(data : any) => {
    console.log(data);
  })

  const selectedMood = watch("mood");

  return (
    <div className="py-4 lg:max-w-7xl mx-auto">
      <form className="mx-auto" onSubmit={onSubmit}>
        <h1 className="text-5xl md:text-6xl tracking-tighter bg-gradient-to-t py-2 from-orange-400 via-red-500 to-orange-400 bg-clip-text text-transparent md:text-center">
          What&apos;s on your mind?
        </h1>
        <h1 className="tracking-tight text-muted-foreground md:text-center">Express yourself freely. Your thoughts are safe here.</h1>
        {/* <BarLoader color="orange" width={"100%"} /> */}
        <div className="space-y-2 mt-8">
          <label className="font-medium tracking-tight">Title</label>
          <Input
            {...register("title")}
            placeholder="Give your entry a title..."
            className={`text-sm ${errors.title ? "border-red-500" : ""}`}
          />
          {errors.title && (<p className="text-red-500 text-sm">{errors.title.message}</p>)}
        </div>
        
        <div className="space-y-2 mt-4">
          <label className="font-medium tracking-tight">
            How are you feeling?
          </label>
          <Controller
            name="mood"
            control={control}
            render={({ field }) => {
              return (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    className={errors.mood ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select a mood..." />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(MOODS).map((mood) => (
                      <SelectItem key={mood.id} value={mood.id}>
                        <span>
                          {mood.emoji} {mood.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              );
            }}
          />
          {errors.mood && (<p className="text-red-500 text-sm">{errors.mood.message}</p>)}
        </div>
        <div className="space-y-2 mt-4">
          <label className="font-medium tracking-tight">
            {getMoodById(selectedMood)?.prompt ?? "What's on your mind?"}
          </label>
          <Controller
            name="content"
            control={control}
            render={({field}) => (
              <ReactQuill
                theme="snow"
                value={field.value}
                onChange={field.onChange}
                modules={{
                  toolbar: [
                    [{ header: "1" }, { header: "2" }, { font: [] }],
                    [{ size: [] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image", "video"],
                    ["clean"],
                    ["code-block"],
                    ["emoji"],
                  ]
                }}
                placeholder="Write your thoughts..."
              />
            )}
          />
        </div>

        <div className="space-y-4 mt-4">
          <label className="font-medium tracking-tight">
            Add to Collection (Optional)
          </label>
          {/* <Controller
            name="content"
            control={control}
            
            /> */}
            {errors.collectionId && (<p className="text-red-500 text-sm">{errors.collectionId.message}</p>)}
        </div>
        <div className="mt-4 flex">
          <Button className="bg-gradient-to-tr from-orange-400 via-red-400 to-orange-400 text-white">
            Publish
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WriteNew;
