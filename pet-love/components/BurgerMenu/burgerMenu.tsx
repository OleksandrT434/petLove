import css from "./burgerMenu.module.css";
import { IoClose } from "react-icons/io5";

type Props = {
    isMenuOpen?: boolean;
    onClose: () => void;
};

export default function BurgerMenu({onClose, isMenuOpen}: Props)  {
  return (
    <aside
        className={`${css.burgerMenu} ${
         isMenuOpen ? css.open : css.closed
        }`}
      > 
      <button type="button"  className={css.closeButton} aria-label="Close menu" onClick={onClose}>
        <IoClose />
      </button>

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

      <div className={css.actions}>
        <button type="button" className={css.authButton}>
          LOG IN
        </button>
        <button type="button" className={css.regButton}>
          REGISTRATION
        </button>
      </div>
    </aside>
  );
}
