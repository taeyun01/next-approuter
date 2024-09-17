import { BookData } from "@/types";
import style from "./page.module.css";
import { DetailBooks } from "@/components/fetch-books/fetchBooks";

export default async function Page({
  params,
}: {
  params: { id: string | string[] };
}) {
  return <DetailBooks paramsId={Number(params.id)} />;
}
