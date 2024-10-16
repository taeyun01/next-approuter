import BookItem from "@/components/book-item";
import { BookData, ReviewData } from "@/types";
import style from "@/app/book/[id]/page.module.css";
import { notFound } from "next/navigation";
import ReviewItem from "../review-item";
import Image from "next/image";
import BookForm from "../editBook/BookForm";
import EditButton from "@/app/book/[id]/components/EditButton";
import DeleteButton from "@/app/book/[id]/components/DeleteButton";

//? 각각 파일 만들어서 분리하기

//* 모든 도서 불러오기
export const AllBooks = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    // { cache: "force-cache" } // 현재 도서의  정보는 수정될 일이 없기 때문에 force-cache로 설정하여 캐싱해준다.
    { next: { tags: ["allBooks"] } }
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
//? 쿼리스트링처럼 실시간으로 데이터를 서버로 부터 불러오는 페이지는 풀라우트는 포기해야한다.
//? 조금이라도 빠르게 렌더링하려면 데이터 캐시를 이용하자 (검색 api결과를 캐싱해두고 렌더링 해준다.)
//? 정리: 서치페이지는 쿼리스트링 같은 동적인 페이지로 의존을 하고 있기 때문에 스태틱페이지로 설정할 순 없고 데이터캐시를 최대한 활용하여 최적화를 해준다.
export const SearchBooks = async ({ q }: { q: string }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" } // 이미 한번 검색이 된 데이터도 좀 더 빠르게 렌더링 해준다.
  );

  if (!response.ok) {
    return <div>검색 데이터를 불러오는데 오류가 발생했습니다.</div>;
  }

  const searchBooks: BookData[] = await response.json();

  if (searchBooks.length === 0) return <div>검색 결과가 없습니다.</div>;

  return (
    <div>
      {searchBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
};

//* 특정[id] 도서 불러오기
export const DetailBooks = async ({ bookId }: { bookId: string }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`,
    { next: { tags: [`book-${bookId}`] } }
  );

  if (!response.ok) {
    if (response.status === 404) return notFound(); // 없는 id도서를 불러올 시 notfound페이지 호출
    return <div>검색 데이터를 불러오는데 오류가 발생했습니다.</div>;
  }

  const detailBook = await response.json();
  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    detailBook;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <Image
          src={coverImgUrl}
          alt={`도서: ${title}의 표지 이미지`}
          width={240}
          height={300}
          unoptimized
        />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
      <div style={{ textAlign: "right" }}>
        <EditButton bookId={id} />
        <DeleteButton bookId={id} />
      </div>
    </section>
  );
};

//* 총 도서의 갯수 불러오기
//? 모든 도서를 불러오는 AllBooks()함수도 같은 페이지(index.tsx)에서 같은 api를 호출 하고 있지만
//? 리퀘스트 메모이제이션 때문에 중복된 /book API를 호출해도 하나의 api를 호출한것처럼 자동으로 처리해준다.
export const Footer = async () => {
  // Footer컴포넌트 때문에 index페이지가 다이나믹 페이지가 되어버리니, force-cache로 페이지를 캐싱하여 스택틱페이지로 만들어준다.
  // 추후에 index페이지에 도서를 추가하여 렌더링 해야 된다던가 하면 다이나믹 페이지가 맞다.
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    // { cache: "force-cache" }
    { next: { tags: ["allBooks-length"] } }
  );

  if (!response.ok) {
    return <footer>한마디: 책 좀 읽읍시다.</footer>;
  }

  const books: BookData[] = await response.json();

  return (
    <footer>
      <div>한마디: 책 좀 읽읍시다.</div>
      <div>총 {books.length}개의 도서가 등록되어 있습니다.</div>
    </footer>
  );
};

// 리뷰조회 api호출
export const ReviewList = async ({ bookId }: { bookId: string }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
    { next: { tags: [`review-${bookId}`] } }
  );

  if (!response.ok) {
    throw new Error(
      `리뷰 데이터를 불러오는데 오류가 발생했습니다. : ${response.status}`
    );
  }

  const reviews: ReviewData[] = await response.json();

  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={`review-item${review.id}`} {...review} />
      ))}
    </section>
  );
};

//* 특정[id] 도서 수정 페이지
export const DetailEditBook = async ({ bookId }: { bookId: string }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`,
    { next: { tags: [`book-${bookId}`] } }
  );

  if (!response.ok) {
    if (response.status === 404) return notFound(); // 없는 id도서를 불러올 시 notfound페이지 호출
    return <div>검색 데이터를 불러오는데 오류가 발생했습니다.</div>;
  }

  const detailBook = await response.json();
  // const { id, title, subTitle, description, author, publisher, coverImgUrl } = detailBook;

  return <BookForm {...detailBook} />;
};
