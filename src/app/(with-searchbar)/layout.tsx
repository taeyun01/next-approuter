import { ReactNode, Suspense } from "react";
import Searchbar from "../../components/searchbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* 서치바 컴포넌트는 Suspense로 감싸서 렌더링 해줘야함
        next서버측에서 사전렌더링을 진행할 때 Suspense로 묶여있는 컴포넌트들은 "미완성" 상태로 남겨지게 된다.
        곧 바로 렌더링 하지 않는다는 얘기다.
        대신에 서치바 컴포넌트에 렌더링 결과 대신에 fallback props로 전달한 대체 UI가 Loading... UI로 대신 렌더링이 된다.
        언제까지 미완성 상태로 남아있냐면, 이 Searchbar 컴포넌트의 비동기 작업이 종료가 될때까지 미완성 상태로 남아 있는다.
        Searchbar 컴포넌트에는 어떤 비동기 작업이 있었는지 안으로 들어가보자
        안으로 들어와보면 useSearchParams()가 있는데 얘는 비동기로 동작하는 함수이다. 쿼리스트링을 실제로 불러왔을 때 종료된다.
        Searchbar컴포넌트의 비동기 작업은 언제 종료가 되냐?? 브라우저에서 마운트가 되었을 때 종료가 된다.
        이렿게 작성해주게 되면 서버측 사전렌더링에서는 완전히 제외되게 되고, 그전까지는 Loading... UI를 보여주게 된다.
        그럼 이제 빌드타임 때 에러가 해결된다.
      */}
      <Suspense fallback={null}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
