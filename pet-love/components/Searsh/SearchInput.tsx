"use client";

import { useState } from "react";
import css from "./SearchInput.module.css";
import { useRouter } from "next/navigation";

export default function SearchInput() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/news?keyword=${keyword}`);
  }

  return (
    <form>
    <input
      type="text"
      className={css.search}
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      placeholder="Search"
    />
    <button onClick={handleSearch} className={css.button}>Search</button>
    </form>
  );
}