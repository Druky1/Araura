"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { MOODS } from "../data/moods";
import { getPixaBayImage } from "./public";
import { revalidatePath } from "next/cache";


export async function createJournalEntry(data: any){
  try {
    const {userId} = await auth();
    
    if(!userId) throw new Error("Unauthorized!");

    // Arcjet Rate Limiting
    const user = await db.user.findUnique({
      where: {clerkUserId: userId}
    })
    if(!user) throw new Error("User Not Found!");

    const mood = MOODS[data.mood.toUpperCase()];
    if(!mood) throw new Error("Invalid Mood!");

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
      }
    })

    await db.draft.deleteMany({
      where: {
        userId: user.id
      }
    });

    revalidatePath("/dashboard");
    return entry;
  } catch (error : any) {
    throw new Error(error.message);
  }
} 