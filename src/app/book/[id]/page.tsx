//* 쿼리스트링과 동일하게 props로 부터 꺼내와서 사용할 수 있다.
const Page = ({ params }: { params: { id: string | string[] } }) => {
  return <div>book/[id] 페이지 : book/{params.id}</div>;
};

export default Page;
