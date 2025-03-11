"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { getMoodById, MOODS } from "../data/moods";
import { getPixaBayImage } from "./public";
import { revalidatePath } from "next/cache";

export async function createJournalEntry(data: any) {
  try {
    const { userId } = await auth();

    if (!userId) throw new Error("Unauthorized!");

    // Arcjet Rate Limiting
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });
    if (!user) throw new Error("User Not Found!");

    const mood = MOODS[data.mood.toUpperCase()];
    if (!mood) throw new Error("Invalid Mood!");

    const moodImageUrl = await getPixaBayImage(mood.pixabayQuery);

    const entry = await db.entry.create({
      data: {
        title: data.title,
        content: data.content,
        mood: data.mood,
        moodScore: data.moodScore,
        moodImageUrl,
        userId: user.id,
        collectionId: data.collectionId || null,
      },
    });

    await db.draft.deleteMany({
      where: {
        userId: user.id,
      },
    });

    revalidatePath("/dashboard");
    return entry;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getJournalEntries({
  collectionId,
  orderBy,
}: { collectionId?: string; orderBy?: "asc" | "desc" } = {}) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized!");

    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    const entries = await db.entry.findMany({
      where: {
        userId: user.id,
        ...(collectionId === "unorganized"
          ? { collectionId: null }
          : collectionId
          ? { collectionId }
          : {}),
      },
      include: {
        collection: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: orderBy ?? "desc",
      },
    });

    const entriesWithMoodData = entries.map((entry: any) => ({
      ...entry,
      moodData: getMoodById(entry.mood),
    }));

    return {
      success: true,
      data: {
        entries: entriesWithMoodData,
      },
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getJournalEntry(id: string) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized!");

    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    const entry = await db.entry.findFirst({
      where: {
        id: id,
        userId: user.id,
      },
      include: {
        collection: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!entry) throw new Error("Entry not found! Check again!");
    return entry;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function deleteJournalEntry(id: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    const entryToBeDeleted = await db.entry.findFirst({
      where: {
        userId: user.id,
        id: id,
      },
      select: {
        id: true,
        collectionId: true, 
      },
    });

    if (!entryToBeDeleted) {
      throw new Error("Entry not found!");
    }

    await db.entry.delete({
      where: {
        id,
      },
    });

    revalidatePath("/dashboard");

    return entryToBeDeleted; 
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function updateJournalEntry(data : any) {
  try {
    const {userId} = await auth();
    if(!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId
      }
    });

    if(!user){
      throw new Error("User not found");
    }

    const existingEntry = await db.entry.findFirst({
      where: {
        userId: user.id,
        id: data.id
      }
    });
    if(!existingEntry) throw new Error("Entry not found");

    const mood = MOODS[data.mood.toUpperCase()];
    if (!mood) throw new Error("Invalid Mood!");

    let moodImageUrl = existingEntry.moodImageUrl

    if(existingEntry.mood !== mood.id){
      moodImageUrl = await getPixaBayImage(data.moodQuery)
    }

    const updatedEntry = await db.entry.update({
      where:{
        id: data.id
      },
      data: {
        title: data.title,
        content: data.content,
        mood: data.mood,
        moodScore: data.moodScore,
        moodImageUrl,
        collectionId: data.collectionId || null,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath(`/journal/${data.id}`)
    return updatedEntry;

  } catch (error : any) {
    throw new Error(error.message);
  }
}

export async function getDraft(){
  try {
    const {userId} = await auth();
    if(!userId) throw new Error("Unauthorized");
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId
      }
    })

    if(!user) throw new Error("User not found!");

    const draft = await db.draft.findUnique({
      where: {
        userId: user.id
      }
    })

    return {success: true, data: draft}
  } catch (error : any) {
    return {success: false, error: error.message}
  }
}
export async function saveDraft(data : any){
  try {
    const {userId} = await auth();
    if(!userId) throw new Error("Unauthorized");
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId
      }
    })

    if(!user) throw new Error("User not found!");

    const draft = await db.draft.upsert({
      where: {
        userId: user.id
      },
      create: {
        title: data.title,
        content: data.content,
        mood: data.mood,
        userId: user.id
      },
      update: {
        title: data.title,
        content: data.content,
        mood: data.mood,
      }
    })
    revalidatePath("/dashboard")
    return {success: true, data: draft}
  } catch (error : any) {
    return {success: false, error: error.message}
  }
}