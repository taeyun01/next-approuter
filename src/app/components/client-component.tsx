"use client";

import ServerComponent from "./server-component";

const ClientComponent = ({ children }: { children: React.ReactNode }) => {
  console.log("ClientComponent!");
  return (
    <div style={{ border: "1px solid red" }}>
      {/* <ServerComponent />; */}
      {children}
    </div>
  );
};

export default ClientComponent;

//* 클라이언트 컴포넌트에서 서버컴포넌트를 import해서 사용하면
//* Next가 자동으로 클라이언트 컴포넌트로 변환시켜버린다.

//* 그래서 웬만하면 클라이언트 컴포넌트 자식으로 서버컴포넌트를 배치시키는건 웬만하면 피해라.

//* 왜냐하면 ClientComponent는 JS Bundle에 포함된다.
//* ClientComponent의 갯수가 많아 질수록 브라우저에 전달되는 JS Bundle의 용량도 커지고
//* 하이드레이션 되는 시간도 오래걸린다.
//* 최대한 서버컴포넌트로 사용해서 JS Bundle의 용량을 줄여야 한다.

//? 굳이 사용하고 싶다면?? children으로 받아 사용하면 된다.
