"use client";

import { useState } from "react";
import { IoHeart } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserAlt } from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext/AuthContext";

import BurgerMenu from "@/components/BurgerMenu/burgerMenu";
import Navigation from "@/components/Navigation/Navigation";
import AuthActions from "@/components/AuthActions/AuthActions";
import Image from "next/image";

import css from "./Header.module.css";


type HeaderProps = {
  variant?: "home" | "default";
};

export default function Header({ variant = "home" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, logout } = useAuth();
  return (
       <header
          className={`${css.header} ${ variant === "home" ? css.home : css.default}`}>
      <Link href="/" className={css.logo}>
             petl<IoHeart className={css.logoHeart} />ve
      </Link>

      <div className={css.headerNav}>
           <Navigation variant={variant} />
       </div>

      <div className={css.headerRight}>
        
        <div className={css.authActions}>
         {user ? (
              <button type="button" className={css.logoutButton} onClick={logout} > LOG OUT </button> ) : (
              <AuthActions />
               )}
          </div>
          
          {user && (
           <Link href="/profile" className={css.userLink}>
               {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                     className={css.userAvatar}/>
                    ) : (
                    <FaUserAlt className={css.userIcon} />)}
            </Link>)}
            
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