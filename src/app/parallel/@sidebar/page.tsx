//* 페럴렐 라우트
//* 슬롯이라는 폴더를 우선 만든다. ex) @sidebar (@키워드는 슬롯이라고 부른다.)
//* @(슬롯)이 하는 역할은 대략적으로 "병렬로 렌더링이 될 하나의 페이지 컴포넌트를 보관하는 폴더"
//* 지금 이 Page가 병렬로 렌더링이 될 페이지 컴포넌트이다.
//* 이 Page컴포넌트는 자신을 감싸고 있는 부모 레이아웃 컴포넌트인 layout.tsx에 props로 자동으로 전달된다.
//* 그 props의 이름은 @(슬롯)의 이름 sidebar가 된다.
//* layout페이지에 sidebar를 props로 전달하면 이 페이지는 자동으로 병렬로 렌더링이 된다.
//? 적용을 하고나서 페이지에 반영이 안되거나 404가 뜨면 Next버그니까, 서버 중단 후 .next폴더 삭제 후 재시작
const Page = () => {
  return <div>@sidebar</div>;
};

export default Page;

// 정리하자면 (기본적인 내용)
// Next의 페럴렐 라우트는 하나의 화면에 병렬로 여러개의 페이지 컴포넌트를 렌더링 할 수 있게해주는 기능
// @sidebar에 url주소로 접근은 할 수 없다.
// 약간 슬롯은 {children}과 같은 역할을 수행하는 것과 같다고 봐도 무방하다.
// children도 @children슬롯을 생성하고, page컴포넌트를 렌더링 하는 것과 갘다.
// @(슬롯)의 제한은 없으니 여러개의 슬롯을 만들 수 있다.

// (추가로)
