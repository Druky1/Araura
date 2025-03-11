"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { getMoodById, MOODS } from "../data/moods";
import { getPixaBayImage } from "./public";
import { revalidatePath } from "next/cache";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
})

export async function enhanceText(text: string){
  if(!text){
    throw new Error("Provide text to enhance!")
  }

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are a helpful personal journal writing assistant. Improve the user's text by matching their personality while also making it cleaner, fixing grammmar and enhancing the overall style, keeping the original meaning."
        },
        {
          role: "user",
          content: `Enhance this text ${text} fitting my personality while also keeping the context! Don't say anything else.`
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    const enhancedText = response.choices[0].message.content;
    return enhancedText;
  } catch (error : any) {
    console.log(error);
    throw new Error("Failed to enhance text with AI, Please try again!")
  }
}

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
        id: data.id,
        userId: user.id
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
    return { collectionId: updatedEntry.collectionId };

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
    return {success: false, error: "Something went wrong while fetching the draft!"}
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
    return {success: false, error: "Something went wrong while saving draft!"}
  }
}
