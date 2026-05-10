import css from "./Navigation.module.css";

export default function Navigation() {
  return (
    <nav className={css.navMenu} aria-label="Main navigation">
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