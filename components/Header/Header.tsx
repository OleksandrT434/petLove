"use client";

import { useState } from "react";
import { IoHeart } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";

import BurgerMenu from "@/components/BurgerMenu/burgerMenu";
import Navigation from "@/components/Navigation/Navigation";
import AuthActions from "@/components/AuthActions/AuthActions";

import css from "./Header.module.css";


type HeaderProps = {
  variant?: "home" | "default";
};

export default function Header({ variant = "home" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
       <header
          className={`${css.header} ${ variant === "home" ? css.home : css.default}`}>
      <Link href="/" className={css.logo}>
             petl<IoHeart className={css.logoHeart} />ve
      </Link>

      <div className={css.headerNav}>
        <Navigation />
      </div>

      <div className={css.headerRight}>
        <div
          className={`${css.authActions} ${
          variant === "home" ? css.homeAuth : ""}`}
        >
        <AuthActions />
      </div>

        <FaUserCircle className={css.userIcon} />

        <button
          type="button"
          className={css.menuButton}
          onClick={() => setIsMenuOpen(true)}
        >
          <RxHamburgerMenu className={css.menuIcon} />
        </button>
      </div>

      <BurgerMenu
        isMenuOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </header>
  );
}