"use client";

import { createPortal } from "react-dom";
import style from "./modal.module.css";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const handleClose = (e: React.MouseEvent<HTMLDialogElement>) => {
    //* 모달의 배경이 클릭된거면 뒤로가기
    if ((e.target as any).nodeName === "DIALOG") {
      router.back();
    }
  };

  useEffect(() => {
    //* dialog태그는 초기값이 off로 설정돼있어 모달창이 안보여서
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal(); //* 강제로 열어준다. (dialog태그는에 open 속성이 붙음)
      dialogRef.current?.scrollTo({
        top: 0,
        // behavior: "smooth",
      });
    }
  }, []);

  return (
    //* 모달은 전체 화면을 뒤덮는 글로벌한 요소들이 될텐데 특정 태그 밑에 들어가 있으면 HTML구조상 많이 어색한 부분이 있기 때문에
    //* createPortal()를 통해서 id가 "modal-root"라는 태그 밑에 고정적으로 모달을 넣어준다.
    //* 최상위 루트레이아웃에 모달을 넣어주면 된다.
    createPortal(
      <dialog
        className={style.modal}
        ref={dialogRef}
        onClick={handleClose}
        onClose={handleClose} //* esc눌렀을때도 뒤로가기
      >
        {children}
      </dialog>,
      document.getElementById("modal-root") as HTMLElement
    )
  );
};

export default Modal;
