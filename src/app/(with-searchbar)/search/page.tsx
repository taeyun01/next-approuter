import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { SearchBooks } from "@/components/fetch-books/fetchBooks";

export default function Page({
  searchParams,
}: {
  searchParams: {
    q?: string;
  };
}) {
  return (
    <div>
      <SearchBooks q={searchParams.q} />
    </div>
  );
}
