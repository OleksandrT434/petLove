"use client";

import css from "./Navigation.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavigationProps = {
  className?: string;
  variant?: "home" | "default";
};

export default function Navigation({
  className,
  variant = "default",
}: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav
      className={[css.navMenu, className].filter(Boolean).join(" ")}
      aria-label="Main navigation"
    >
      <Link
        href="/news"
        className={`${css.menuButton} ${
          pathname === "/news" ? css.active : ""
        } ${variant === "home" ? css.homeButton : css.defaultButton}`}
      >
        News
      </Link>

      <Link
        href="/find-pet"
        className={`${css.menuButton} ${
          pathname === "/find-pet" ? css.active : ""
        } ${variant === "home" ? css.homeButton : css.defaultButton}`}
      >
        Find pet
      </Link>

      <Link
        href="/our-friends"
        className={`${css.menuButton} ${
          pathname === "/our-friends" ? css.active : ""
        } ${variant === "home" ? css.homeButton : css.defaultButton}`}
      >
        Our friends
      </Link>
    </nav>
  );
}