//* feed슬롯 안에 setting폴더를 추가하여 하위 페이지를 추가할 수 있다.
//* 별도의 페이지로 따로 렌더링 되는건 아니고 그냥 부모 layout에 있는 feed슬롯 안에서 페이지가 렌더링 된다.

const Page = () => {
  return <div>@feed/setting</div>;
};

export default Page;

//? 하지만 이 feed/setting 페이지에서 새로고침을 하몀ㄴ 404 페이지가 나온다.
//? 새로고침을 하면 이전 슬롯을 참조할 수 없기 때문인데 이런 문제를 해결하기 위해
//? default페이지를 만들어주어 404에러가 나올시 해당 디폴트 페이지로 렌더링 할 수 있게 해준다.
