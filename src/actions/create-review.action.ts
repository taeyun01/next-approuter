"use server"; // 별도의 파일로 분리했을 때는 함수 안쪽이 아닌 최상단에 작성하는게 일반적임

//? 서버액션을 사용하는 이유는 조금더 간결하고 편리하게 서버측에서 실행되는 어떠한 동작을 정의하는데 있다.
  //* 1. 서버액션을 만들면
 export const createReviewAction = async (formData: FormData) => {
    // "use server";
    //* 2. 자동으로 ⬇️아래 코드를 실행하는 API가 하나 자동으로 생성된다.
    //* 3. 그런 API는 브라우저에서 form태그를 제출했을 때 자동으로 호출이 된다.
    const content = formData.get("content")?.toString(); // 리뷰내용 값 가져옴
    const author = formData.get("author")?.toString(); // 작성자 값 가져옴
    const paramsId = formData.get("paramsId")?.toString(); // 도서 id값

    // 클라이언트랑 서버랑 같이 예외처리 해주는 이유 : 서로 100% 믿을 수 없음
    if (!content || !author || !paramsId) {
      return; // 빈값 입력 시 서버액션 실행 x 
    }

    try{
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
        {
          method: "POST",
          body: JSON.stringify({ paramsId, content, author }), // 몇번 도서에, 무슨내용, 누가 썼는지의 정보를 담은 객체 전달
        }
      );

      console.log(response.status);

    } catch(error){
      console.error(error);
      return;
    }
  };