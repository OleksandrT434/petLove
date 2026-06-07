import css from "./Navigation.module.css";
import Link from "next/link";

type NavigationProps = {
  className?: string;
};

export default function Navigation({ className }: NavigationProps) {
  return (
    <nav className={[css.navMenu, className].filter(Boolean).join(" ")} aria-label="Main navigation">
      <Link href="/news" className={css.menuButton}>
        News
      </Link>
      <Link href="/find-pet" className={css.menuButton}>
        Find pet
      </Link>
      <Link href="/our-friends" className={css.menuButton}>
        Our friends
      </Link>
    </nav>
  );
}