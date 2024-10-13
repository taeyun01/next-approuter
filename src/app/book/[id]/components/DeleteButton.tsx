"use client";
import { useActionState, useEffect, useRef } from "react";
import style from "./edit-button.module.css";
import { deleteBookAction } from "@/actions/delete-book-action";
import { useRouter } from "next/navigation";

const DeleteButton = ({ bookId }: { bookId: string }) => {
  const deleteRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(deleteBookAction, null);

  const handleDelete = () => {
    const isDelete = confirm("정말 삭제하시겠습니까?");

    if (isDelete) {
      deleteRef.current?.requestSubmit();
    }
  };

  useEffect(() => {
    // state값이 있고, state.status가 false인 경우
    if (state && !state.status) {
      alert(state.error); // 에러호출
    }

    if (state && state.status === true) {
      console.log("삭제 완료");
      router.replace("/");
    }
  }, [state, bookId, router]);

  return (
    <form ref={deleteRef} action={formAction}>
      <input name="bookId" value={bookId} hidden />
      <button
        type="button"
        className={style.deleteButton}
        onClick={handleDelete}
        disabled={isPending}
      >
        삭제
      </button>
    </form>
  );
};

export default DeleteButton;
