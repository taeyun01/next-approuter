import { ReviewData } from "@/types";
import style from "./review-item.module.css";
import ReviewItemDeleteButton from "./review-item-delelte-button";

const ReviewItem = ({ id, content, author, createdAt, bookId }: ReviewData) => {
  return (
    <div className={style.container}>
      <div className={style.author}>{author}</div>
      <div className={style.content}>{content}</div>
      <div className={style.bottom_container}>
        <div className={style.date}>
          {new Date(createdAt).toLocaleDateString()} {/* -> 2024. 9. 6. */}
          {/* {new Date(createdAt).toISOString().split('T')[0]} warning 거슬리면 이 코드쓰셈 (서버 날짜랑 동일한 포맷 사용 -> 2024-01-01) */}
        </div>
        <ReviewItemDeleteButton reviewId={id} bookId={bookId} />
      </div>
    </div>
  );
};

export default ReviewItem;
