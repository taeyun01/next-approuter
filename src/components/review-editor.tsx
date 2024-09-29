import style from "./review-editor.module.css";
import { createReviewAction } from "@/actions/create-review.action";

const ReviewEditor = ({ bookId }: { bookId: string }) => {
  return (
    <section>
      <form className={style.form_container} action={createReviewAction}>
        {/* 대부분의 데이터를 서버액션으로 충분히 넘길 수 있으니까 해당 트릭을 잘 이용하면 된다 */}
        <input name="bookId" value={bookId} type="hidden" />
        <textarea required name="content" placeholder="리뷰내용" />
        <div className={style.submit_container}>
          <input required name="author" placeholder="작성자" type="text" />
          <button type="submit">작성하기</button>
        </div>
      </form>
    </section>
  );
};

export default ReviewEditor;
