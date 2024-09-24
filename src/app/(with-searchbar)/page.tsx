import { Suspense } from "react";
import style from "./page.module.css";
import { AllBooks, RecoBooks } from "@/components/fetch-books/fetchBooks";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";

//? 라우트세그먼트는 정말 특별한 상황아니면 권장하지 않는다.
// 특정 페이지의 유형을 강제로 Static 또는 Dynamic 페이지로 설정하는 옵션 (4가지가 있음)
// 1. auto (기본값)
// 2. force-dynamic (강제로 Dynamic 페이지로 바꿔줌)
// 3. force-static (강제로 Static 페이지로 바꿔줌)
// 4. error (강제로 Static 페이지로 바꿔줌, 대신 Static페이지로 설정하면 안되는 페이지들이 있으면 -> 빌드 에러발생과 함께 에러 이유를 출력해줌)
// export const dynamic = "force-dynamic";

// Suspense의 진가를 알아보기 위해 잠시 다이나믹 페이지로 변경하여 랜던 도서와 모든 도서를 서스펜스로 스트리밍 처리해보겠다.
export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense fallback={<BookListSkeleton count={3} />}>
          <RecoBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<BookListSkeleton count={10} />}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
