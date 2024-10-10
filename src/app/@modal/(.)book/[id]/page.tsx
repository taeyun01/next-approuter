import BookPage from "@/app/book/[id]/page";
import Modal from "@/components/modal/modal";

const Page = (props: any) => {
  return (
    <Modal>
      <BookPage {...props} parallel={true} />
    </Modal>
  );
};

export default Page;
