"use server";
import { revalidateTag } from "next/cache";

export async function allBooksLengthRevalidate() {
  revalidateTag("allBooks-length");
}
