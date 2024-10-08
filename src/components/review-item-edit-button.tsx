"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import style from "./review-item.module.css";
import { editReviewAction } from "@/actions/edit-review.action";

export default function ReviewItemEditButton({
  reviewId,
  bookId,
}: {
  reviewId: number;
  bookId: number;
}) {
  const [state, formAction, isPending] = useActionState(editReviewAction, null);
  // const [isDeleteOrEdit, setIsDeleteOrEdit] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  const onClickEdit = () => {
    const editContent = window.prompt("수정할 내용을 입력해주세요")?.trim();

    //? 삭제 버튼 파일에서 한번에 처리해보기
    if (editContent) {
      editInputRef.current!.value = editContent;
      // setIsDeleteOrEdit("edit");
      formRef.current?.requestSubmit();
    }
    return;
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
      <input
        ref={editInputRef}
        name="content"
        defaultValue={editInputRef.current?.value}
        hidden
      />
      {isPending ? (
        <div>수정중..</div>
      ) : (
        <button type="button" className={style.edit_btn} onClick={onClickEdit}>
          수정하기
        </button>
      )}
    </form>
  );
}
