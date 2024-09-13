"use client";
import { useState } from "react";

const Searchbar = () => {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      진짜 서치바
      <input type="text" value={search} onChange={onChangeSearch} />
      <button>검색</button>
      {search}
    </div>
  );
};

export default Searchbar;
