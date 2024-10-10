"use client";
import InputField from "@/components/component/Input";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import style from "./book-form.module.css";
import BookPreview from "../addBook/BookPreview";
import { BookData } from "@/types";
import { editBookAction } from "@/actions/edit-book.action";

const BookForm = ({
  id,
  title,
  subTitle,
  author,
  description,
  publisher,
  coverImgUrl,
}: BookData) => {
  const [editTitle, setEditTitle] = useState(title);
  const [editSubTitle, setEditSubTitle] = useState(subTitle);
  const [editAuthor, setEditAuthor] = useState(author);
  const [editDescription, setEditDescription] = useState(description);
  const [editPublisher, setEditPublisher] = useState(publisher);
  const [editCoverImgUrl, setEditCoverImgUrl] = useState(coverImgUrl);
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(editBookAction, null);

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }

    if (state && state.status) {
      router.replace("/");
    }
  }, [state]);

  return (
    <div>
      <form action={formAction}>
        <div className={style.inputContainer}>
          <input name="bookId" value={id} hidden />
          <InputField
            label=""
            id="title"
            name="title"
            placeholder="제목을 입력해주세요."
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            required
            readOnly={false}
          />
          <InputField
            label=""
            id="subTitle"
            name="subTitle"
            placeholder="부제목을 입력해주세요."
            value={editSubTitle}
            onChange={(e) => setEditSubTitle(e.target.value)}
            required
            readOnly={false}
          />
          <InputField
            label=""
            id="author"
            name="author"
            placeholder="저자를 입력해주세요."
            value={editAuthor}
            onChange={(e) => setEditAuthor(e.target.value)}
            required
            readOnly={false}
          />
          <InputField
            label=""
            id="description"
            name="description"
            placeholder="설명을 입력해주세요."
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            required
            readOnly={false}
          />
          <InputField
            label=""
            id="publisher"
            name="publisher"
            placeholder="출판사를 입력해주세요."
            value={editPublisher}
            onChange={(e) => setEditPublisher(e.target.value)}
            required
            readOnly={false}
          />
          <BookPreview
            title={editTitle}
            subTitle={editSubTitle}
            author={editAuthor}
            publisher={editPublisher}
            coverImgUrl={editCoverImgUrl}
          />
          <button disabled={isPending}>
            {isPending ? "수정중..." : "수정하기"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
