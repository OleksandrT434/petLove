import css from "./burgerMenu.module.css";
import { IoClose } from "react-icons/io5";
import Navigation from "@/components/Navigation/Navigation";
import AuthActions from "@/components/AuthActions/AuthActions";

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

      <Navigation className={css.burgerNav} />
         <div className={css.actions}>
              <AuthActions />
          </div>
      
    </aside>
  );
}
