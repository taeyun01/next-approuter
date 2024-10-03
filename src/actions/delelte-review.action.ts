"use server";

import { revalidateTag } from "next/cache";

export const deleteReviewAction = async (_: any, formData: FormData) => {
  // 삭제할 리뷰id를 formData에서 가져옴
  const reviewId = formData.get("reviewId")?.toString(); // reviewId가 존재할 경우 문자열로 변환
  const bookId = formData.get("bookId")?.toString(); // bookId가 존재할 경우 문자열로 변환

  if (!reviewId) {
    return {
      status: false,
      error: "리뷰 id가 존재하지 않습니다.",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/${reviewId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // 태그가 review-${bookId} 인건만 리렌더링
    revalidateTag(`review-${bookId}`);

    return {
      status: true,
      error: "",
    };
  } catch (error) {
    return {
      status: false,
      error: `리뷰 삭제 중 오류가 발생했습니다. : ${error}`,
    };
  }
};
