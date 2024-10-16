"use server";

export const deleteBookAction = async (_: any, formData: FormData) => {
  const bookId = formData.get("bookId")?.toString();

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

    //? revalidate 여기서 하지 않고 useEffect에서 처리
    //? 삭제 처리하면서 revalidate하게 되면 데이터 페칭이 되면서 페이지가 렌더링이 되면서 404페이지가 먼저 실행되는 현상이 발생함
    // revalidateTag("allBooks-length");
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
