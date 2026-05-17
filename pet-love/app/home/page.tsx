'use client'

import { IoHeart } from "react-icons/io5";
import css from "./page.module.css";
import { FaUserCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image";
import BurgerMenu from "@/components/BurgerMenu/burgerMenu";
import  Navigation  from "@/components/Navigation/Navigation";
import AuthActions from "@/components/AuthActions/AuthActions";

import { useState } from "react";



export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <section className={css.homePage}>
        <div className={css.container}>
            <div className={css.header}>
              <h1 className={css.title}>
               petl<IoHeart className={css.heart} />ve
              </h1>
              <div className={css.headerNav}>
              <Navigation />
              </div>
              <div className={css.desktopActions}>
                <AuthActions />
              </div>
              
              <div className={css.userMenu}>
                <FaUserCircle className={css.userIcon} />
                 <button className={css.menuButton} onClick={() => setIsMenuOpen(true)}>
                   <RxHamburgerMenu className={css.menuIcon} />
                 </button>
              </div>
            </div>
            <section className={css.banner}>
                <h1 className={css.bannerTitle}>Take good <span className={css.word}>care</span>  of your small pets</h1>
                <p className={css.bannerSubtitle}>Choosing a pet for your home is a choice that is meant to enrich your life with immeasurable joy and tenderness.</p>
           </section>
           
        </div>
        <picture className={css.pictureWrapper}>
                <source media="(min-width: 1280px)" srcSet="/dogHome-desktop.jpg" />
                <source media="(min-width: 768px)"  srcSet="/dogHome-tablet.jpg" />
                <Image 
                   src="/dogHome.jpg" 
                   alt="PetLove Logo" 
                   width={335}
                   height={402}
                   className={css.dogImage}
                /> 
                </picture>
                  <BurgerMenu
                    isMenuOpen={isMenuOpen}
                    onClose={() => setIsMenuOpen(false)}
                  />
        </section>
    )
}
