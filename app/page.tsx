'use client'

import css from "./page.module.css";
import Image from "next/image";
import Header from "@/components/Header/Header";

export default function Home() {

  return (
    <div className={css.pageWrapper}>
      <section className={css.hero}>
        <Header />
        <div className={css.textBlock}>
          <h1 className={css.bannerTitle}>
            Take good <span className={css.accent}>care</span> of your small pets
          </h1>
          <p className={css.bannerSubtitle}>
            Choosing a pet for your home is a choice that is meant to enrich
            your life with immeasurable joy and tenderness.
          </p>
        </div>
      </section>
      <div className={css.pictureCard}>
        <picture>
          <source media="(min-width: 1280px)" srcSet="/dogHome-desktop.jpg" />
          <source media="(min-width: 768px)" srcSet="/dogHome-tablet.jpg" />
          <Image
            src="/dogHome.jpg"
            alt="Woman with dog"
            width={335}
            height={402}
            className={css.dogImage}
            priority
          />
        </picture>
      </div>
    </div>
  );
}