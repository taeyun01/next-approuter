"use client";
import { useActionState, useEffect, useRef } from "react";
import style from "./edit-button.module.css";
import { deleteBookAction } from "@/actions/delete-book-action";
import { useRouter } from "next/navigation";
import { allBooksLengthRevalidate } from "@/actions/revalidate";

const DeleteButton = ({ bookId }: { bookId: string }) => {
  const deleteRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(deleteBookAction, null);

  const handleDelete = () => {
    const isDelete = confirm("정말 삭제하시겠습니까?");

    if (isDelete) {
      deleteRef.current?.requestSubmit();
      // router.replace("/");
      //? 삭제 작업 후 바로 홈으로 이동?? 문제점: 이렇게 하면 삭제 실패시에는 useEffect에서 에러호출 안하고 홈으로 바로 이동함
    }
  };

  //* 삭제 후 인덱스 페이지로 이동 구현 하기
  //* 지금 현재 formAction을 처리하고 나서 state.status가 true가 됐는데
  //* index페이지로 이동하지 않는 현상이 발생함.
  //* 추측으로는 삭제하고 나서 해당 도서 페이지가 없어 404페이지가 먼저 실행되서
  //* router.replace는 실행되지 않는걸로 보임
  useEffect(() => {
    // state값이 있고, state.status가 false인 경우
    if (state && !state.status) return alert(state.error); // 에러호출
    if (state && state) {
      //? 서버액션에서 삭제 후 revalidate를 실행하고 홈으로 이동하면, 홈으로 이동안되고 404페이지가 먼저 렌더링됨.
      //? 도서가 삭제되면서 바로 revalidate를 실행되면서 페이지가 렌더링 되므로 404페이지가 먼저 실행되어 서버액션에서 revalidate를 쓰지 않음
      allBooksLengthRevalidate(); //? useEffect에서 status가 true이면 revalidate를 비동기로 수행하고 홈으로 이동하니 정상적으로 작동됨
      return router.replace("/");
    }
    // if (state && state.status === true) {
    //   console.log("삭제 완료");
    //   router.replace("/");
    // }
  }, [state, router]);
  //! 두번째 문제. 삭제후 홈으로 이동까진 처리했는데.
  //! 홈 이동후 특정도서 클릭 시 모달창이 안띄어짐. url은 특정도서로 정상적으로 변경됨

  return (
    <form ref={deleteRef} action={formAction}>
      <input name="bookId" defaultValue={bookId} hidden />
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
