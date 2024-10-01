"use client";

import style from "./review-editor.module.css";
import { createReviewAction } from "@/actions/create-review.action";
import { useActionState, useEffect } from "react";

//* 클라이언트 컴포넌트에서의 서버액션
//* ReviewEditor를 클라이언트 컴포넌트로 전환하여 useActionState()를 활용해 form에 로딩 상태, 중복 제출방지, 에러 핸들링 처리하기
//* from태그를 사용할 경우 되도록이면 클라이언트 컴포넌트로 하고 useActionState()를 적극적으로 활용해라 (from은 중복제출, 로딩 상태, 에러 핸들링이 거의 필수기 때문)
const ReviewEditor = ({ bookId }: { bookId: string }) => {
  // useActionState()의 첫 번째 인수는 핸들링하려는 서버액션 함수, 두 번째는 상태의 초기값
  // state값은 서버액션이 실행되어 성공 했을때나 실패했을때 리턴값으로 담기게 된다.
  const [state, fromAction, isPending] = useActionState(
    createReviewAction,
    null
  );

  // state값이 바뀔 때 에러가 발생했는지 안했는지 검증
  useEffect(() => {
    // state.status가 false면 실행
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <section>
      <form className={style.form_container} action={fromAction}>
        {/* 대부분의 데이터를 서버액션으로 충분히 넘길 수 있으니까 해당 트릭을 잘 이용하면 된다 */}
        <input name="bookId" value={bookId} type="hidden" />
        <textarea
          disabled={isPending}
          required
          name="content"
          placeholder="리뷰내용"
        />
        <div className={style.submit_container}>
          <input
            disabled={isPending}
            required
            name="author"
            placeholder="작성자"
            type="text"
          />
          <button disabled={isPending} type="submit">
            {isPending ? "작성중..." : "작성하기"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ReviewEditor;
