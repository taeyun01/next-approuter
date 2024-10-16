import Image from "next/image";
import style from "../../components/book-item.module.css";

type BookPreviewProps = {
  title: string;
  subTitle: string;
  author: string;
  publisher: string;
  coverImgUrl: string;
};

const BookPreview = ({
  title,
  subTitle,
  author,
  publisher,
  coverImgUrl,
}: BookPreviewProps) => {
  return (
    <div className={style.previewContainer}>
      <Image
        src={
          coverImgUrl
            ? coverImgUrl
            : "https://cdn-icons-png.flaticon.com/128/10701/10701484.png"
        }
        alt={`도서: ${title ? title : "제목"}의 표지 이미지`}
        width={80}
        height={105}
        unoptimized // 모든 이미지 도메인 허용 (대신 최적화 안됨)
      />
      <div>
        <div className={style.title}>{title ? title : "제목"}</div>
        <div className={style.subTitle}>{subTitle ? subTitle : "부제목"}</div>
        <br />
        <div className={style.author}>
          {author ? author : "저자"} | {publisher ? publisher : "출판사"}
        </div>
      </div>
    </div>
  );
};

export default BookPreview;
