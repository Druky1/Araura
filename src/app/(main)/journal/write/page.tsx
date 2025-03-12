"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
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
import useFetch from "@/app/hooks/use-fetch";
import {
  createJournalEntry,
  enhanceText,
  getDraft,
  getJournalEntry,
  saveDraft,
  updateJournalEntry,
} from "@/app/actions/journal";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { createCollection, getCollections } from "@/app/actions/collection";
import CollectionForm from "../../_components/CollectionDialog";
import { Loader2, Sparkles } from "lucide-react";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

type ActionResult = {
  collectionId?: string;
};

const WriteNew = () => {
  const editSearchParams = useSearchParams();
  const editId = editSearchParams.get("edit");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const [textContent, setTextContent] = useState("");

  const {
    loading: entryLoading,
    data: existingEntry,
    fn: fetchEntry,
  } = useFetch(getJournalEntry);

  const {
    loading: draftLoading,
    data: draftData,
    fn: fetchDraft,
  } = useFetch(getDraft);

  const {
    loading: savingDraft,
    fn: saveDraftFn,
    data: savedDraft,
  } = useFetch(saveDraft);

  const {
    loading: actionLoading,
    fn: actionFn,
    data: actionResult,
  } = useFetch<ActionResult>(
    isEditMode ? updateJournalEntry : createJournalEntry
  );

  const {
    loading: collectionsLoading,
    fn: fetchCollections,
    data: collections,
  } = useFetch(getCollections);

  const {
    loading: createCollectionLoading,
    fn: createCollectionFn,
    data: createdCollection,
  } = useFetch(createCollection);

  const router = useRouter();

  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
    watch,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(journalSchema),
    defaultValues: {
      title: "",
      content: "",
      mood: "",
      collectionId: "",
    },
  });

  const onSubmit = handleSubmit(async (data: any) => {
    const mood = getMoodById(data.mood);
    actionFn({
      ...data,
      moodScore: mood?.score,
      moodQuery: mood?.pixabayQuery,
      ...(isEditMode && { id: editId }),
    });
  });

  const formData = watch();

  const handleSaveDraft = async () => {
    if (!isDirty) {
      toast.error("No Changes To Save!");
      return;
    }
    await saveDraftFn(formData);
  };

  useEffect(() => {
    if (savedDraft?.success && !savingDraft) {
      toast.success("Draft saved successfully!");
    }
  }, [savedDraft, savingDraft]);

  const isLoading =
    actionLoading ||
    collectionsLoading ||
    entryLoading ||
    draftLoading ||
    savingDraft;

  // Fetch collections on page load
  useEffect(() => {
    fetchCollections();
    if (editId) {
      setIsEditMode(true);
      fetchEntry(editId);
    } else {
      setIsEditMode(false);
      fetchDraft();
    }
  }, [editId]);

  useEffect(() => {
    if (isEditMode && existingEntry) {
      reset({
        title: existingEntry.title || "",
        content: existingEntry.content || "",
        mood: existingEntry.mood || "",
        collectionId: existingEntry.collectionId || "",
      });
      setTextContent(existingEntry.content || "");
    } else if (draftData?.success && draftData?.data) {
      reset({
        title: draftData.data.title || "",
        content: draftData.data.content || "",
        mood: draftData.data.mood || "",
        collectionId: "",
      });
      setTextContent(draftData.data.content || "");
    } else {
      reset({
        title: "",
        content: "",
        mood: "",
        collectionId: "",
      });
    }
  }, [draftData, isEditMode, existingEntry, reset]);

  useEffect(() => {
    if (actionResult && !actionLoading) {
      // Clear Draft On Entry Creation
      if (!isEditMode) {
        saveDraftFn({ title: "", content: "", mood: "" });
      }
      router.push(
        `/collection/${
          actionResult.collectionId ? actionResult.collectionId : "unorganized"
        }`
      );
      toast.success(
        `Entry ${isEditMode ? "updated" : "created"} successfully!`
      );
    }
  }, [actionResult, actionLoading]);

  // Handle newly collection creation
  useEffect(() => {
    if (createdCollection) {
      setIsCollectionModalOpen(false);
      fetchCollections();
      setValue("collectionId", createdCollection.id);
      toast.success(
        `Collection ${createdCollection.name} created successfully!`
      );
    }
  }, [createdCollection]);

  const handleCreateCollection = async (data: any) => {
    createCollectionFn(data);
  };

  const enhancedWriting = async () => {
    if (!textContent) {
      toast.error("Please write something to enhance!");
      return;
    }
    setIsEnhancing(true);
    try {
      const enhancedText = await enhanceText(textContent);
      if (enhancedText !== null) {
        setTextContent(enhancedText);
        setValue("content", enhancedText);
        toast.success("Your writing has been enhanced by AI!");
      }
    } catch (error: any) {
      console.error("Error enhancing writing:", error);
      toast.error("Oops! Something went wrong with our AI!");
    } finally {
      setIsEnhancing(false);
    }
  };

  const selectedMood = watch("mood");

  return (
    <div className="py-4 lg:max-w-7xl mx-auto">
      <form className="mx-auto" onSubmit={onSubmit}>
        <h1 className="text-5xl md:text-6xl tracking-tighter bg-gradient-to-t py-2 from-orange-400 via-red-500 to-orange-400 bg-clip-text text-transparent md:text-center">
          {isEditMode ? "Changed your mind?" : "What's on your mind?"}
        </h1>
        <h1 className="tracking-tight text-muted-foreground md:text-center">
          {isEditMode
            ? "Just write your heart out! 😄"
            : "Express yourself freely. Your thoughts are safe here."}
        </h1>
        {isLoading && (
          <BarLoader color="orange" width={"100%"} className="mt-5" />
        )}
        <div className="space-y-2 mt-8">
          <label className="font-medium tracking-tight">Title</label>
          <Input
            {...register("title")}
            placeholder="Give your entry a title..."
            className={`text-sm ${errors.title ? "border-red-500" : ""}`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2 mt-4">
          <label className="font-medium tracking-tight">
            How are you feeling today?
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
          {errors.mood && (
            <p className="text-red-500 text-sm">{errors.mood.message}</p>
          )}
        </div>
        <div className="space-y-2 mt-4">
          <label className="font-medium tracking-tight">
            {getMoodById(selectedMood)?.prompt ??
              "What's going on in your world?"}
          </label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <ReactQuill
                theme="snow"
                value={field.value}
                onChange={(value) => {
                  field.onChange(value); // Update form state
                  setTextContent(value); // Sync with local state
                }}
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
                  ],
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
          <Controller
            name="collectionId"
            control={control}
            render={({ field }) => {
              return (
                <Select
                  onValueChange={(value) => {
                    if (value === "new") {
                      setIsCollectionModalOpen(true);
                    } else {
                      field.onChange(value);
                    }
                  }}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a collection..." />
                  </SelectTrigger>
                  <SelectContent>
                    {collections?.map((collection: any) => {
                      return (
                        <SelectItem key={collection.id} value={collection.id}>
                          {collection.name}
                        </SelectItem>
                      );
                    })}
                    <SelectItem value="new">
                      <span className="text-orange-600 cursor-pointer">
                        Create New Collection
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              );
            }}
          />
          {errors.collectionId && (
            <p className="text-red-500 text-sm">
              {errors.collectionId.message}
            </p>
          )}
        </div>
        <div className="mt-4 flex space-x-2 md:space-x-4">
          {!isEditMode && (
            <Button
              onClick={handleSaveDraft}
              type="button"
              variant={"outline"}
              disabled={savingDraft || !isDirty}
            >
              {savingDraft && <Loader2 className="h-4 w-4 animate-spin" />}
              Save Draft
            </Button>
          )}
          <Button
            className="tracking-tight bg-gradient-to-tr from-orange-400 via-red-400 to-orange-400 text-white hover:from-orange-500 hover:via-red-500 hover:to-orange-500"
            disabled={actionLoading}
          >
            {isEditMode ? "Update Entry" : "Save Entry"}
          </Button>

          <Button
            className="tracking-tight bg-gradient-to-tr from-gray-900 via-gray-700 to-gray-900 text-white hover:from-black hover:via-gray-700 hover:to-black"
            type="button"
            onClick={enhancedWriting}
            disabled={isEnhancing}
          >
            {isEnhancing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <span className="hidden md:block">Enhance with AI</span>
            )}
            {!isEnhancing && <Sparkles className="h-4 w-4" />}
          </Button>

          {isEditMode && (
            <Button
              onClick={(e) => {
                e.preventDefault();
                router.push(`/journal/${existingEntry.id}`);
              }}
              variant={"destructive"}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
      <CollectionForm
        loading={createCollectionLoading}
        onSuccess={handleCreateCollection}
        open={isCollectionModalOpen}
        setOpen={setIsCollectionModalOpen}
      />
    </div>
  );
};

export default WriteNew;
