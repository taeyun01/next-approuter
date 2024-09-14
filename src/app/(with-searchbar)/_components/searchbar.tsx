"use client";
import { useState } from "react";

//* 상요작용이 존재하는 컴포넌트는 클라이언트 컴포넌트로 따로 만들어 사용
const Searchbar = () => {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <input type="text" value={search} onChange={onChangeSearch} />
      <button>검색</button>
      {search}
    </div>
  );
};

export default Searchbar;
