import BookPage from "@/app/book/[id]/page";
import Modal from "@/components/modal/modal";

const Page = (props: any) => {
  return (
    <div>
      가로채기 성공
      <Modal>
        <BookPage {...props} />
      </Modal>
    </div>
  );
};

export default Page;
