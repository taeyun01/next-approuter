import ClientComponent from "../../components/client-component";

//* 경로와 함께 명시되는 값들은 페이지 컴포넌트의 props로 전달된다.
const Page = ({ searchParams }: { searchParams: { q?: string } }) => {
  return (
    <div>
      검색 결과 : {searchParams.q}
      <ClientComponent>
        여기는 클라이언트 컴포넌트
        <div>검색 결과 리스트</div>
      </ClientComponent>
    </div>
  );
};

export default Page;
