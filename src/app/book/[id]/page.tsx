import { DetailBooks, ReviewList } from "@/components/fetch-books/fetchBooks";
import style from "@/app/book/[id]/page.module.css";
import ReviewEditor from "@/components/review-editor";
import { Metadata } from "next";
import { BookData } from "@/types";

// 상세페이지 메타데이터 생성
// 인터셉팅에는 적용되지 않을꺼다 근데 크게 상관없다.
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${params.id}`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const book: BookData = await response.json();

  return {
    title: `${book.title} - 책! 책! 책!`,
    description: `${book.description}`,
    openGraph: {
      title: `${book.title} - 책! 책! 책!`,
      description: `${book.description}`,
      images: [book.coverImgUrl],
    },
  };
}

//? false로 설정 시 아래 정적 파라미터를 설정하지 않은 페이지들은 모두 404페이지로 리다이텍트 시킨다.
// export const dynamicParams = false; // 설정하지 않으면 기본값은 true

//? 정적인 파라미터를 생성하는 함수
//? next가 빌드타임에 이 정적 파라미터를 읽어서 파라미터에 해당하는 book/1, /2, /3 페이지를 빌드타임에 정적으로 만들어준다.
//! 주의: 1. id값은 문자열로만 명시, 2. fetch를 통해 데이터 캐싱 설정을 안하더라도 generateStaticParams()를 쓰면 해당 페이지는 강제로 캐싱이 된다.
export const generateStaticParams = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const books: BookData[] = await response.json();

  //* 현재 등록된 모든 책들의 페이지를 전부 정적으로 생성
  return books.map((book) => ({ id: book.id.toString() }));
};

//? 해당 book페이지에 어떤한 도서데이터들이 빌드타임에 만들어줘야하는지 알려줘야한다.
export default async function Page({ params }: { params: { id: string } }) {
  return (
    <div className={style.container}>
      <DetailBooks bookId={params.id} />
      <ReviewEditor bookId={params.id} />
      <ReviewList bookId={params.id} />
    </div>
  );
}
