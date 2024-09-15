import books from "@/mock/books.json";
import BookItem from "@/components/book-item";

export default function Page({
  searchParams,
}: {
  searchParams: {
    q?: string;
  };
}) {
  return (
    <div>
      {/* 임시로 검색 결과 표시 */}
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
