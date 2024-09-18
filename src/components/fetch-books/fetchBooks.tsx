import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import style from "@/app/book/[id]/page.module.css";

//? 각각 파일 만들어서 분리하기

//* 모든 도서 불러오기
export const AllBooks = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    return <div>모든 도서 데이터를 불러오는데 오류가 발생했습니다.</div>;
  }

  const allBooks: BookData[] = await response.json();
  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
};

//* 랜덤 도서 불러오기
export const RecoBooks = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    // { cache: "force-cache" }
    { next: { revalidate: 3 } }
  );

  if (!response.ok) {
    return <div>랜덤 데이터를 불러오는데 오류가 발생했습니다.</div>;
  }

  const recoBooks: BookData[] = await response.json();
  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
};

//* 검색 시 도서 불러오기
export const SearchBooks = async ({ q }: { q?: string }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`
  );

  if (!response.ok) {
    return <div>검색 데이터를 불러오는데 오류가 발생했습니다.</div>;
  }

  const searchBooks: BookData[] = await response.json();
  return (
    <div>
      {searchBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
};

//* 특정[id] 도서 불러오기
export const DetailBooks = async ({ paramsId }: { paramsId: number }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${paramsId}`
  );

  if (!response.ok) {
    return <div>검색 데이터를 불러오는데 오류가 발생했습니다.</div>;
  }

  const detailBook = await response.json();
  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    detailBook;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
};
