"use client";

import { useState } from "react";
import css from "./SearchInput.module.css";
import { useRouter } from "next/navigation";
import { IoIosSearch } from "react-icons/io";

type SearchInputProps = {
    basePath: string;
};


export default function SearchInput({basePath}:SearchInputProps ) {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`${basePath}?keyword=${keyword}`);
  }

  return (
    <form className={css.form} onSubmit={handleSearch}>
       <input
            type="text"
            value={keyword}
            className={css.search}
            placeholder="Search"
            onChange={(e) => setKeyword(e.target.value)}
    />

  <button type="submit" className={css.button}>
    <IoIosSearch className={css.searchIcon} />
  </button>
</form>
  );
}