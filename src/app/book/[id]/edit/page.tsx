import { DetailEditBook } from "@/components/fetch-books/fetchBooks";

const Page = ({ params }: { params: { id: string } }) => {
  return <DetailEditBook bookId={params.id} />;
};

export default Page;
