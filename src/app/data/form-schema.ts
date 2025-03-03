import {z} from "zod";


export const journalSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  content: z.string().min(1, "Content is required"),
  mood: z.string().min(1, "Mood is required"),
  collectionId: z.string().optional(),
})

export const collectionSchema = z.object({
  name: z.string().min(1, "Name is required").max(50),
  description: z.string().optional(),

})