const ServerComponent = () => {
  console.log("ServerComponent!");
  return <div>ServerComponent</div>;
};

export default ServerComponent;

//* 해당 ServerComponent는
//* ClientComponent에서 import되어 호출되기 때문에
//* ServerComponent는 자동으로 클라이언트 컴포넌트로 변환된다.
