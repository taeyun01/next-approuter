import { DetailBooks, ReviewEditor } from "@/components/fetch-books/fetchBooks";
import style from "@/app/book/[id]/page.module.css";

//? false로 설정 시 아래 정적 파라미터를 설정하지 않은 페이지들은 모두 404페이지로 리다이텍트 시킨다.
// export const dynamicParams = false; // 설정하지 않으면 기본값은 true

//? 정적인 파라미터를 생성하는 함수
//? next가 빌드타임에 이 정적 파라미터를 읽어서 파라미터에 해당하는 book/1, /2, /3 페이지를 빌드타임에 정적으로 만들어준다.
//! 주의: 1. id값은 문자열로만 명시, 2. fetch를 통해 데이터 캐싱 설정을 안하더라도 generateStaticParams()를 쓰면 해당 페이지는 강제로 캐싱이 된다.
export const generateStaticParams = async () => {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
};

//? 해당 book페이지에 어떤한 도서데이터들이 빌드타임에 만들어줘야하는지 알려줘야한다.
export default async function Page({ params }: { params: { id: string } }) {
  return (
    <div className={style.container}>
      <DetailBooks paramsId={params.id} />
      <ReviewEditor paramsId={params.id} />
    </div>
  );
}
