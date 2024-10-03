"use client";

import { useActionState, useEffect, useRef } from "react";
import style from "./review-item.module.css";
import { deleteReviewAction } from "@/actions/delelte-review.action";

export default function ReviewItemDeleteButton({
  reviewId,
  bookId,
}: {
  reviewId: number;
  bookId: number;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null
  );

  const deleteFormSubmit = () => {
    // Submit메서드는 유효성 검사나 이벤트 핸들러 등을 다 무시하고 무조건 강제로 폼을 제출시키는 위험한 메서드
    // requestSubmit() 메서드는 실제로 사용자가 submit버튼을 눌렀을때랑 똑같이 동작을 하기 때문에 비교적 의도한대로 안전하게 동작할 가능성이 훨씬 높다.
    formRef.current?.requestSubmit();
  };

  useEffect(() => {
    // state값이 있고, state.status가 false인 경우
    if (state && !state.status) {
      alert(state.error); // 에러호출
    }
  }, [state]);

  //* 일부러 button 태그 사용안함
  //* 레퍼런스(ref)객체를 활용하여 div태그를 클릭했을 때, form을 제출하도록 하는 방법
  return (
    <form ref={formRef} action={formAction}>
      <input name="reviewId" defaultValue={reviewId} hidden />
      <input name="bookId" defaultValue={bookId} hidden />
      {isPending ? (
        <div>삭제중..</div>
      ) : (
        <div className={style.delete_btn} onClick={deleteFormSubmit}>
          삭제하기
        </div>
      )}
    </form>
  );
}
