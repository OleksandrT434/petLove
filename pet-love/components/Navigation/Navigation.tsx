import css from "./Navigation.module.css";

type NavigationProps = {
  className?: string;
};

export default function Navigation({ className }: NavigationProps) {
  return (
    <nav className={[css.navMenu, className].filter(Boolean).join(" ")} aria-label="Main navigation">
      <button type="button" className={css.menuButton}>
        News
      </button>
      <button type="button" className={css.menuButton}>
        Find pet
      </button>
      <button type="button" className={css.menuButton}>
        Our friends
      </button>
    </nav>
  );
}