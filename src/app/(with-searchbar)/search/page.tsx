import { SearchBooks } from "@/components/fetch-books/fetchBooks";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { Metadata } from "next";
import { Suspense } from "react";

type Props = {
  searchParams: {
    q?: string;
  };
};

// 동적 메타데이터 생성
export function generateMetadata({ searchParams }: Props): Metadata {
  return {
    title: `검색어 : ${searchParams.q}`,
    description: `${searchParams.q}에 대한 검색 결과입니다.`,
    openGraph: {
      title: `검색어 : ${searchParams.q}`,
      description: `${searchParams.q}에 대한 검색 결과입니다.`,
      images: ["/thumbnail.png"],
    },
  };
}

// 강제로 Static 페이지로 설정("no-store"로 설정 돼있어도 강제로 스태틱 페이지로 바뀌면서 캐싱됨)
// 하지만 부작용이 있음 이렇게 쿼리스트링값을 의존하고 있는 서치페이지는 라우트세그먼트로 강제로 스태틱 페이지로 바꾸게 되면 검색기능이 제대로 동작하지 않음.
// 실행해서 검색해보면 아무런 결과가 나오지 않음. searchParams같은 동적값들은 다 빈값(undefined)로 처리되어 검색이 되지 않음.
// force-static은 부작용을 발생시킬 수 있으니 잘 사용해야한다.
// export const dynamic = "force-static";
// export const dynamic = "error"; // Static페이지로 설정하면 안되는 페이지들이 있으면 -> 빌드 에러 발생과 함께 에러 이유를 출력해줌
// 빌드 오류 : Error: Route /search with `dynamic = "error"` couldn't be rendered statically because it used `searchParams.q`.

export default async function Page({
  searchParams,
}: {
  searchParams: {
    q?: string;
  };
}) {
  return (
    // Suspense컴포넌트를 이용하여 특정 컴포넌트의 스트리밍을 설정할 수 있다.
    // 검색을 다시 한번 했을 때 쿼스트링이 바뀌면서 다시 스트리밍을 해줘야 하는데 Suspense컴포넌트의 key값을 바꿔주면 가능하다.
    // key값을 쿼리스트링만 바뀌어도 Suspense가 동작하게 할 수 있다. 리액트에서 key값이 바뀌면 컴포넌트가 완전히 바뀌었다. 라고 인식해서 새로운 컴포넌트를 그리게 된다. (이렇게 트릭처럼 사용가능)
    <Suspense
      key={searchParams.q || ""}
      fallback={<BookListSkeleton count={4} />}
    >
      <SearchBooks q={searchParams.q || ""} />
    </Suspense>
  );
}
