'use client'

import css from "./page.module.css";
import Image from "next/image";
import Header from "@/components/Header/Header";

   type HeaderProps = {
  theme: "yellow" | "white";
};

export default function Home({theme}: HeaderProps) {

 
    return (
        <section className={css.container}>
             <Header theme="yellow" />
            <div className={css.banner}>
                <h1 className={css.bannerTitle}>Take good <span className={css.word}>care</span>  of your small pets</h1>
                <p className={css.bannerSubtitle}>Choosing a pet for your home is a choice that is meant to enrich your life with immeasurable joy and tenderness.</p>
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

        </section>
    )
}
