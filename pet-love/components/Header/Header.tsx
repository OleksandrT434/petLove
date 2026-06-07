"use client";

import { useState } from "react";
import { IoHeart } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

import BurgerMenu from "@/components/BurgerMenu/burgerMenu";
import Navigation from "@/components/Navigation/Navigation";
import AuthActions from "@/components/AuthActions/AuthActions";
import { FaUserCircle } from "react-icons/fa";
import css from "./Header.module.css";


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={css.header}>
      <div className={css.container}>
        <h1 className={css.title}>
          petl<IoHeart className={css.heart} />ve
        </h1>

        <div className={css.headerNav}>
           <Navigation />
        </div>

        <div className={css.desktopActions}>
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

        <BurgerMenu
           isMenuOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
        />
      </div>
    </header>
  )
}