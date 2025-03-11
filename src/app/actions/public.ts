"use server";

import { unstable_cache } from "next/cache";

export async function getPixaBayImage(query : string){
  try {
    const response = await fetch(
      `https://pixabay.com/api/?q=${query}&key=${process.env.PIXABAY_API_KEY}&min_width=1280&min_height=720&image_type=illustration&category=feelings`
    );
    const data = await response.json();
    return data.hits[0]?.largeImageURL || null;

  } catch (error) {
    throw new Error("Failed to fetch image from Pixabay");
  }
}

export const getDailyPrompt = unstable_cache(
  async() => {
    try {
      const response = await fetch("https://api.adviceslip.com/advice", {
        cache: "no-store"
      })
      const data = await response.json();
      return data.slip.advice;
    } catch (error : any) {
      return {
        success: false,
        data: "How was your day today?"
      }
    }
  }, ["daily-prompt"],
  {
    revalidate: 86400,
    tags: ["daily-prompt"]
  }
)