"use client";

import { useEffect, useRef, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import css from "./CustomSelect.module.css";

type Props = {
  options: string[];
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

export default function CustomSelect({
  options,
  value,
  placeholder,
  onChange,
}: Props) {
    
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={css.wrapper} ref={wrapperRef}>
      <button
        type="button"
        className={css.select}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{value || placeholder}</span>

        <IoChevronDown
          className={`${css.arrow} ${isOpen ? css.arrowOpen : ""}`}
        />
      </button>

      {isOpen && (
        <div className={css.dropdown}>
          {options.map((option) => (
            <button
              type="button"
              key={option}
              className={css.option}
              onClick={() => handleSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}