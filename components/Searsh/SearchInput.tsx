"use client";

import { useState } from "react";
import css from "./SearchInput.module.css";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { IoIosSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";

type SearchInputProps = {
  basePath: string;
};

export default function SearchInput({ basePath }: SearchInputProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [keyword, setKeyword] = useState(
    searchParams.get("keyword") ?? ""
  );

  const [isSearched, setIsSearched] = useState(
    Boolean(searchParams.get("keyword"))
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const value = keyword.trim();

    if (!value) return;

    const params = new URLSearchParams(searchParams);

    params.set("keyword", value);
    params.set("page", "1");

    router.push(`${basePath}?${params.toString()}`);
    setIsSearched(true);
  };

  const handleClear = () => {
    const params = new URLSearchParams(searchParams);

    params.delete("keyword");
    params.set("page", "1");

    setKeyword("");
    setIsSearched(false);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        type="text"
        value={keyword}
        className={css.search}
        placeholder="Search"
        onChange={(e) => {
          setKeyword(e.target.value);
          if (isSearched) {
            setIsSearched(false);
          }
        }}
      />

      <button
        type={isSearched ? "button" : "submit"}
        className={css.button}
        onClick={isSearched ? handleClear : undefined}
      >
        {isSearched ? (
          <IoClose className={css.searchIcon} />
        ) : (
          <IoIosSearch className={css.searchIcon} />
        )}
      </button>
    </form>
  );
}