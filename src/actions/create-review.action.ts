"use server";
import { delay } from "@/util/delay";
import { revalidateTag } from "next/cache";

// 별도의 파일로 분리했을 때는 함수 안쪽이 아닌 최상단에 작성하는게 일반적임

//? 서버액션을 사용하는 이유는 조금더 간결하고 편리하게 서버측에서 실행되는 어떠한 동작을 정의하는데 있다.
//* 1. 서버액션을 만들면
export const createReviewAction = async (
  _: any, // 해당 방식으로도 쓴다.
  // state: any,
  formData: FormData
) => {
  // "use server";
  //* 2. 자동으로 ⬇️아래 코드를 실행하는 API가 하나 자동으로 생성된다.
  //* 3. 그런 API는 브라우저에서 form태그를 제출했을 때 자동으로 호출이 된다.
  // console.log(formData);

  const content = formData.get("content")?.toString(); // 리뷰내용 값 가져옴
  const author = formData.get("author")?.toString(); // 작성자 값 가져옴
  const bookId = formData.get("bookId")?.toString(); // 도서 id값

  // 클라이언트랑 서버랑 같이 예외처리 해주는 이유 : 서로 100% 믿을 수 없음
  if (!content || !author || !bookId) {
    //* 해당 리턴값이 ReviewEditor컴포넌트의 useActionState()에 state값으로 들어간다
    return {
      status: false,
      error: "리뷰내용과 작성자를 입력해주세요",
    };
  }

  try {
    await delay(1500);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ bookId, content, author }), // 몇번 도서에, 무슨내용, 누가 썼는지의 정보를 담은 객체 전달
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    revalidateTag(`review-${bookId}`); // 제일 효율적 오직 해당 태그값을 갖는 fetch메서드의 데이터 페칭만 삭제가 된다.
    // 성공시
    return {
      status: true,
      error: "",
    };
  } catch (error) {
    return {
      status: false,
      error: `리뷰 작성에 실패했습니다. ${error}`,
    };
  }
};
