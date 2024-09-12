//* 경로와 함께 명시되는 값들은 페이지 컴포넌트의 props로 전달된다.
const Page = ({ searchParams }: { searchParams: { q?: string } }) => {
  console.log(searchParams.q);
  return <div>검색 결과 : {searchParams.q}</div>;
};

export default Page;
