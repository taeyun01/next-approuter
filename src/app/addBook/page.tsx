"use client";
import { addBookAction } from "@/actions/add-book.action";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";

const Page = () => {
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
    <form action={formAction}>
      <h2>도서추가 페이지</h2>
      <label htmlFor="title">제목: </label>
      <input
        id="title"
        type="text"
        name="title"
        defaultValue={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />
      <label htmlFor="subTitle">부제목: </label>
      <input
        id="subTitle"
        type="text"
        name="subTitle"
        defaultValue={subTitle}
        onChange={(e) => setSubTitle(e.target.value)}
        required
      />
      <br />
      <label htmlFor="author">저자: </label>
      <input
        id="author"
        type="text"
        name="author"
        defaultValue={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <br />
      <label htmlFor="description">설명: </label>
      <input
        id="description"
        type="text"
        name="description"
        defaultValue={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <br />
      <label htmlFor="publisher">출판사: </label>
      <input
        id="publisher"
        type="text"
        name="publisher"
        defaultValue={publisher}
        onChange={(e) => setPublisher(e.target.value)}
        required
      />
      <br />
      <label htmlFor="coverImgUrl">이미지 URL: </label>
      <input
        id="coverImgUrl"
        type="text"
        name="coverImgUrl"
        defaultValue={coverImgUrl}
        onChange={(e) => setCoverImgUrl(e.target.value)}
        required
      />
      <br />
      <button disabled={isPending}>
        {isPending ? "도서 등록중.." : "도서추가"}
      </button>
    </form>
  );
};

export default Page;
