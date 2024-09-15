import ClientComponent from "../components/client-component";
import style from "./page.module.css";
import ServerComponent from "../components/server-component";

export default function Home() {
  console.log("Home 클라이언트 컴포넌트");
  return (
    <div className={style.page}>
      인덱스 페이지
      <ClientComponent>
        <ServerComponent />
      </ClientComponent>
    </div>
  );
}

//? Next는 이렇게 children으로 전달된 서버컴포넌트는 클라이언트 컴포넌트로 변환시키지 않는다.
//? 왜냐면 ClientComponent는 ServerComponent를 직접 실행할 필요없이
//? ServerComponent의 결과물만 children이라는 프롭스로 전달받도록 구조가 변경되었기 때문이다.
//? 그래서 Client는 ServerComponent를 실행조차 할 필요가 없어지고 그냥 props로만 받아 렌더링만 하면 되기 때문이다.
