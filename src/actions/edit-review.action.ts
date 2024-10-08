"use server";

import { revalidateTag } from "next/cache";

export const editReviewAction = async (_: any, formData: FormData) => {
  const reviewId = formData.get("reviewId");
  const bookId = formData.get("bookId");
  const editContent = formData.get("content");
  // const isDeleteOrEdit = formData.get("isDeleteOrEdit");
  // console.log("에딧 실행!!!!!!!!!!!!!!");
  // console.log("editContent: ", editContent);
  // console.log("bookId: ", bookId);
  // console.log("reviewId: ", reviewId);
  // console.log("isDeleteOrEdit: ", isDeleteOrEdit);

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
        method: "PATCH",
        body: JSON.stringify({ content: editContent }),
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
      error: `리뷰 수정 중 오류가 발생했습니다. : ${error}`,
    };
  }
};
