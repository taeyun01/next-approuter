"use server";
import { revalidatePath, revalidateTag } from "next/cache";

// 별도의 파일로 분리했을 때는 함수 안쪽이 아닌 최상단에 작성하는게 일반적임

//? 서버액션을 사용하는 이유는 조금더 간결하고 편리하게 서버측에서 실행되는 어떠한 동작을 정의하는데 있다.
//* 1. 서버액션을 만들면
export const createReviewAction = async (formData: FormData) => {
  // "use server";
  //* 2. 자동으로 ⬇️아래 코드를 실행하는 API가 하나 자동으로 생성된다.
  //* 3. 그런 API는 브라우저에서 form태그를 제출했을 때 자동으로 호출이 된다.
  console.log(formData);
  const content = formData.get("content")?.toString(); // 리뷰내용 값 가져옴
  const author = formData.get("author")?.toString(); // 작성자 값 가져옴
  const bookId = formData.get("bookId")?.toString(); // 도서 id값

  // 클라이언트랑 서버랑 같이 예외처리 해주는 이유 : 서로 100% 믿을 수 없음
  if (!content || !author || !bookId) {
    return; // 빈값 입력 시 서버액션 실행 x
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ bookId, content, author }), // 몇번 도서에, 무슨내용, 누가 썼는지의 정보를 담은 객체 전달
      }
    );

    console.log(response.status);
    //* 결론적으로 revalidatePath를 사용해 /book/${bookId} 해당 페이지를 다시 렌더링 해줘서 실시간으로 댓글이 작성되는 걸 볼 수 있다.
    // 1. 특정 주소의 해당하는 페이지만 재검증
    // revalidatePath(`/book/${bookId}`); // book/page.tsx 컴포넌트가 다시 렌더링됨, 자식 컴포넌트도 전부 재렌더링 (DetailBooks, ReviewEditor, ReviewList) 자식 컴포넌트에 있는 컴포넌트 들도 fetch를 통해 데이터를 불러오는데 이것도 다시 실행됨 (서버측에서만 호출할 수 있다. 페이지 전체가 재생성 되지 때문에 캐시 옵션을 줘도 캐시도 무효화(삭제)된다. 풀라우트 캐시까지 삭제됨, 다시 서버측에서 페이지를 생성해 줘서 업데이트함)

    // 2. 특정 경로의 모든 동적 페이지를 재검증 (첫번째 인수는 url주소 경로가 아닌 해당 페이지 컴포넌트가 작성된 폴더 또는 파일의 경로를 적어줌)
    // revalidatePath("/book/[id]", "page");

    // 3. 특정 레이아웃을 갖는 모든 페이지 재검증 ((with-searchbar)에 있는 layout.tsx을 기준으로 재검증 하고 싶을 때 )
    // revalidatePath("(with-searchbar)", "layout");

    // 4. 모든 데이터 재검증 (모든 페이지 재검증) ("/" index경로에 있는 레이아웃인 루트 레이아웃이 전부다 재검증이 이루어짐)
    // revalidatePath("/", "layout");

    // 5. 태그 기준. 데이터 캐시 재검증 (데이터 캐시의 태그란? => next: {tags: [`review-${bookId}]} 해당 태그를 갖는 데이터 패칭만 다시 렌더링된다. )
    revalidateTag(`review-${bookId}`); // 제일 효율적 오직 해당 태그값을 갖는 fetch메서드의 데이터 페칭만 삭제가 된다.
  } catch (error) {
    console.error(error);
    return;
  }
};
