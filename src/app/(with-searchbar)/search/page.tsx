import BookItem from "@/components/book-item";
import { SearchBooks } from "@/components/fetch-books/fetchBooks";
import { BookData } from "@/types";
import { delay, delay2 } from "@/util/delay";

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
    <div>
      <SearchBooks q={searchParams.q} />
    </div>
  );
}
