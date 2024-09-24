import style from "./page.module.css";
import { AllBooks, RecoBooks } from "@/components/fetch-books/fetchBooks";

//? 라우트세그먼트는 정말 특별한 상황아니면 권장하지 않는다.
// 특정 페이지의 유형을 강제로 Static 또는 Dynamic 페이지로 설정하는 옵션 (4가지가 있음)
// 1. auto (기본값)
// 2. force-dynamic (강제로 Dynamic 페이지로 바꿔줌)
// 3. force-static (강제로 Static 페이지로 바꿔줌)
// 4. error (강제로 Static 페이지로 바꿔줌, 대신 Static페이지로 설정하면 안되는 페이지들이 있으면 -> 빌드 에러발생과 함께 에러 이유를 출력해줌)
// export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <RecoBooks />
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <AllBooks />
      </section>
    </div>
  );
}
