"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

//? AppRouter버전에서는 어쩔 수 없이 귀찮더라도 레이아웃을 살리기 위해서 각각의 경로별로 error.tsx파일을 만들어줘야 하는 경우가 생길 수 있다.
//? 그냥 app폴더에 error.tsx파일을 배치하면 레이아웃을 살리지 못한다.
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
      <button onClick={() => reset()}>다시 시도</button>
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh();
            reset();
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
