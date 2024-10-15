"use server";
import { revalidateTag } from "next/cache";

export const deleteBookAction = async (_: any, formData: FormData) => {
  const bookId = formData.get("bookI2d")?.toString();

  if (!bookId) {
    return {
      status: false,
      error: "도서 id가 존재하지 않습니다.",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`,
      {
        method: "DELETE",
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
      error: `도서 삭제에 실패했습니다. ${error}`,
    };
  }
};
