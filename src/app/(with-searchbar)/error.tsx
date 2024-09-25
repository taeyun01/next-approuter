"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

//* 에러 페이지는 use client로 작성해야한다.
//* 기본적으로 오류 라는건 서버던지, 클라이언트던지 막론하고 어떤 환경이든 발생할 수 있다.
//* 서버측에서 발생하던, 클라이언트에서 발생하던 모두 함께 다 대응할 수 있도록 클라이언트 컴포넌트로 설정한다.
//* 왜냐하면 클라이언트 컴포넌트는 서버측에서도 실행되고 클라이언트에도 실행이 되기 때문이다.
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div>
      <h3>오류가 발생했습니다.</h3>
      <p>error: {error.message}</p>
      {/* 클리이언트 컴포너트 내부에서 발생한 오류만 리셋이 가능하다. 서버 컴포넌트는 안됨*/}
      <button onClick={() => reset()}>다시 시도</button>
      <button
        onClick={() => {
          // startTransition()는 react18버전에 새로나옴
          startTransition(() => {
            //router.refresh는 비동기 작업이기 때문에 startTransition를 활용하여 일괄적으로 처리하게끔 한다.
            router.refresh(); // * 현재 페이지에 필요한 서버컴포넌트들을 다시 불러옴 (서버컴포넌트 업데이트)
            reset(); //* 에러 상태를 초기화 하고, 컴포넌트들을 다시 렌더링
          });
        }}
      >
        서버측 다시시도
      </button>
    </div>
  );
}

//* error.tsx파일의 위치에 따라서 에러가 어떻게 처리 되는지
//* 동일한 경로에 있는 index페이지 뿐만 아니라 하위 경로에 있는 페이지들 까지 동일하게 적용된다.
//* 지금은 search페이지 까지 error.tsx파일이 적용된다.
//* 하위 경로의 search페이지는 따로 적용하고 싶다면?? search폴더에 error.tsx파일을 만들어주면 된다.
