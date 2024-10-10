import Link from "next/link";
import style from "./edit-button.module.css";

const EditButton = ({ bookId }: { bookId: string }) => {
  return (
    <Link className={style.editButton} href={`/book/${bookId}/edit`}>
      수정
    </Link>
  );
};

export default EditButton;
