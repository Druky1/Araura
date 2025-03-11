"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const createCollection = async (data : any) => {

  try {
  const {userId} = await auth();
  if(!userId) throw new Error("Unauthorized!");

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId
    }
  })
  if(!user) throw new Error("User Not Found!");

  const collection = await db.collection.create({
    data: {
      name: data.name,
      userId: user.id,
      description: data.description || "",
    }
  })

  revalidatePath("/dashboard");
  return collection;
} catch (error : any) {
  throw new Error(error.message);
}

}

export const getCollections = async () => {
  try {
    const {userId} = await auth();
    if(!userId) throw new Error("Unauthorized!");

    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId
      }
    });

    if(!user) throw new Error("User Not Found!");

    const collections = await db.collection.findMany({
      where: {
        userId: user.id
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    
    return collections;
  } catch (error : any) {
    throw new Error(error.message);
  }
}

export const getCollection = async (collectionId : string) => {
  try {
    const {userId} = await auth();
    if(!userId) throw new Error("Unauthorized!");

    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      }
    });

    if(!user) throw new Error("User Not Found!");

    const collections = await db.collection.findUnique({
      where: {
        userId: user.id,
        id: collectionId
      },
    });
    
    return collections;
  } catch (error : any) {
    throw new Error(error.message);
  }
}
export const deleteCollection = async (collectionId : string) => {
  try {
    const {userId} = await auth();
    if(!userId) throw new Error("Unauthorized!");

    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      }
    });

    if(!user) throw new Error("User Not Found!");

    const collection = await db.collection.findFirst({
      where: {
        userId: user.id,
        id: collectionId
      },
    });
    
    if(!collection) throw new Error("Collection not found!");
    
    await db.collection.delete({
      where: {
        id: collectionId
      }
    })

    return true;
  } catch (error : any) {
    throw new Error(error.message);
  }
}