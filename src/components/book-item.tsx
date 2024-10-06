import type { BookData } from "@/types";
import Link from "next/link";
import style from "./book-item.module.css";
import Image from "next/image";

// 이미지 렌더링 문제점 (아래 문제점은 Next의 Image컴포넌트를 사용하면 전부 해결된다.)
// 1. jpeg 확장자 -> webp 확장자로 변경됨
// 2. 한 페이지내에 이미지를 전부 불러오고 있음 -> 보이는 부분만 렌더링되고 스크롤을 내리면 그때 이미지를 불러옴
// 3. 이미지 크기가 너무 큼 -> width, height 속성을 추가하여 이미지 크기를 조정함
//* 레이지 로딩, 블러 이미지 등등 Image컴포넌트에 대한 속성들이 많으니 공식문서를 참조하자

export default function BookItem({
  id,
  title,
  subTitle,
  description,
  author,
  publisher,
  coverImgUrl,
}: BookData) {
  return (
    <Link href={`/book/${id}`} className={style.container}>
      <Image
        src={coverImgUrl}
        alt={`도서: ${title}의 표지 이미지`}
        width={80}
        height={105}
      />
      <div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <br />
        <div className={style.author}>
          {author} | {publisher}
        </div>
      </div>
    </Link>
  );
}
