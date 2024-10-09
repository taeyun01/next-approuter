"use client";
import { addBookAction } from "@/actions/add-book.action";
import InputField from "@/components/component/Input";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import style from "./book-form.module.css";
import BookPreview from "./BookPreview";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [publisher, setPublisher] = useState("");
  const [coverImgUrl, setCoverImgUrl] = useState("");
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(addBookAction, null);

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
          <InputField
            label=""
            id="title"
            name="title"
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <InputField
            label=""
            id="subTitle"
            name="subTitle"
            placeholder="부제목을 입력해주세요."
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            required
          />
          <InputField
            label=""
            id="author"
            name="author"
            placeholder="저자를 입력해주세요."
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <InputField
            label=""
            id="description"
            name="description"
            placeholder="설명을 입력해주세요."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <InputField
            label=""
            id="publisher"
            name="publisher"
            placeholder="출판사를 입력해주세요."
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            required
          />
          <InputField
            label=""
            id="coverImgUrl"
            name="coverImgUrl"
            placeholder="이미지 URL을 입력해주세요."
            value={coverImgUrl}
            onChange={(e) => setCoverImgUrl(e.target.value)}
            required
          />
          <span>잘못 된 이미지는 등록할 수 없습니다.</span>
          <BookPreview
            title={title}
            subTitle={subTitle}
            author={author}
            publisher={publisher}
            coverImgUrl={coverImgUrl}
          />
          <button disabled={isPending}>
            {isPending ? "도서 등록중.." : "등록하기"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
