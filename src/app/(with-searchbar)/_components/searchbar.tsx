"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

//* 상요작용이 존재하는 컴포넌트는 클라이언트 컴포넌트로 따로 만들어 사용
const Searchbar = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  //* 프로그래미틱한 페이지 이동 => 예를 들어 검색어를 입력 후 검색 버튼을 클릭 했을 때 이벤트 핸들러를 통해 페이지를 이동하는 기능
  const onSubmit = () => {
    router.push(`/search?q=${search}`);
  };

  return (
    <div>
      <input type="text" value={search} onChange={onChangeSearch} />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
};

export default Searchbar;
