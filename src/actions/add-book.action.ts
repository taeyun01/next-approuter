"use server";
import { revalidateTag } from "next/cache";

export const addBookAction = async (_: any, formData: FormData) => {
  const title = formData.get("title")?.toString();
  const subTitle = formData.get("subTitle")?.toString();
  const author = formData.get("author")?.toString();
  const description = formData.get("description")?.toString();
  const publisher = formData.get("publisher")?.toString();
  const coverImgUrl = formData.get("coverImgUrl")?.toString();

  // 클라이언트랑 서버랑 같이 예외처리 해주는 이유 : 서로 100% 믿을 수 없음
  if (
    !title ||
    !subTitle ||
    !author ||
    !description ||
    !publisher ||
    !coverImgUrl
  ) {
    return {
      status: false,
      error: "모든 필드를 입력해주세요",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
      {
        method: "POST",
        body: JSON.stringify({
          title,
          subTitle,
          author,
          description,
          publisher,
          coverImgUrl,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    revalidateTag("allBooks"); // 제일 효율적 오직 해당 태그값을 갖는 fetch메서드의 데이터 페칭만 삭제가 된다.
    // 성공시
    return {
      status: true,
      error: "",
    };
  } catch (error) {
    return {
      status: false,
      error: `도서 등록에 실패했습니다. 이미지 형식 오류 ${error}`,
    };
  }
};
