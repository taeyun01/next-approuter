import { ReviewData } from "@/types";
import style from "./review-item.module.css";
import ReviewItemDeleteButton from "./review-item-delelte-button";
import ReviewItemEditButton from "./review-item-edit-button";

const ReviewItem = ({ id, content, author, createdAt, bookId }: ReviewData) => {
  return (
    <div className={style.container}>
      <div className={style.author}>{author}</div>
      <div className={style.content}>{content}</div>
      <div className={style.bottom_container}>
        <div className={style.date}>
          {new Date(createdAt).toLocaleDateString()}
        </div>
        <ReviewItemDeleteButton reviewId={id} bookId={bookId} />
        <ReviewItemEditButton reviewId={id} bookId={bookId} />
      </div>
    </div>
  );
};

export default ReviewItem;
